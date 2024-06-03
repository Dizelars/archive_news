import Header from "../components/particles/Header"
import Image from "../components/particles/Image"
import RedactorText from "../components/particles/RedactorText"
import Blockquote from "../components/particles/Blockquote"
import Separator from "../components/particles/Separator"
import Swiper from "../components/particles/Swiper"
import Video from "../components/particles/Video"

const modifyContent = (item, i) => {
  let components = []

  const parser = new DOMParser()
  let content = item.content
  content = content.replaceAll("#nbsp", "&nbsp")
  content = parser.parseFromString(content, "text/html")

  const dateElement = document.createElement("p")
  const pubDate = new Date(item.pubDate)
  const day = pubDate.getDate().toString().padStart(2, "0")
  const month = (pubDate.getMonth() + 1).toString().padStart(2, "0")
  const year = pubDate.getFullYear()

  dateElement.innerHTML = `${day}.${month}.${year}`
  dateElement.classList.add("news_date")
  content.querySelector("header").appendChild(dateElement)

  const linkElement = document.createElement("a")
  linkElement.innerHTML = "Источник"
  linkElement.classList.add("news_source")
  linkElement.href = item.link
  content.querySelector("header").appendChild(linkElement)

  const galleries = content.querySelectorAll("[data-block=gallery]")
  galleries.forEach((gallery) => {
    let inner = ""
    const images = gallery.querySelectorAll("img")

    images.forEach((img) => {
      inner += `<swiper-slide><img src="${img.src}"/></swiper-slide>`
    })
    // navigation="true"
    // grab-cursor="true"
    gallery.innerHTML = `
    <swiper-container
      pagination="true"
      pagination-clickable="true"
      auto-height="true"
      grab-cursor="true"
      loop="true">
          ${inner}
    </swiper-container>`
  })

  // Получаем все ссылки
  const links = content.querySelectorAll("a")
  // Добавляем атрибут target="_blank"
  links.forEach((link) => {
    link.setAttribute("target", "_blank")
  })

  const figures = content.querySelectorAll("figure")
  figures.forEach((figure) => {
    const imgInside = figure.querySelector("img")

    if (!imgInside) return

    const newImg = document.createElement("img")
    newImg.src = imgInside.src

    figure.replaceWith(newImg)
  })

  const images = content.querySelectorAll("img")
  images.forEach((image) => {
    if (image.src === item.image) image.remove()
  })

  //заменяем iframe на video
  const iframes = content.querySelectorAll("iframe")
  iframes.forEach((iframe) => {
    const videoSrc = iframe.getAttribute("src")
    const video = document.createElement("video")
    video.poster = "https://coddmac.store/codd_news/codd_video_poster.png"
    video.src = videoSrc
    video.setAttribute("controls", "")
    video.setAttribute("playsinline", "")

    const videoWrapper = document.createElement("div")
    videoWrapper.classList.add("video_wrapper")
    videoWrapper.appendChild(video)

    iframe.replaceWith(videoWrapper)
  })

  //замена strong на p с классом bold
  const strongs = content.querySelectorAll("strong")
  strongs.forEach((strong) => {
    const text = strong.textContent
    const p = document.createElement("p")
    p.classList.add("bold")
    p.textContent = text

    // Проверяем, есть ли у элемента атрибут style и не пустой ли он
    if (strong.hasAttribute("style") && strong.getAttribute("style").trim() !== "") {
        p.setAttribute("style", strong.getAttribute("style"));
    }

    strong.replaceWith(p);
  })

  const ems = content.querySelectorAll("em")
  ems.forEach((em) => {
    const text = em.textContent
    const p = document.createElement("p")
    p.classList.add("italic")
    p.textContent = text

    // Проверяем, есть ли у элемента атрибут style и не пустой ли он
    if (em.hasAttribute("style") && em.getAttribute("style").trim() !== "") {
        p.setAttribute("style", em.getAttribute("style"));
    }

    em.replaceWith(p)
  })

  const redactor_texts = content.querySelectorAll(".t-redactor__text")

  redactor_texts.forEach((redText) => {
    const insideUl = redText.querySelector("ul")
    if (insideUl) return

    const insideP = redText.querySelector("p")

    if (!insideP) {
      const inner = redText.innerHTML
      const p = document.createElement("p")
      p.innerHTML = inner
      p.classList.add("t-redactor__text")
      redText.replaceWith(p)
      return
    }

    const newRedText = document.createElement("div")
    newRedText.classList.add("t-redactor__text")

    redText.childNodes.forEach((el) => {
      if (el.nodeName === "#text") {
        const p = document.createElement("p")
        p.textContent = el.textContent
        newRedText.appendChild(p)
      } else {
        const copy = el.cloneNode(true)
        newRedText.appendChild(copy)
      }
    })
    redText.replaceWith(newRedText)
  })

  const titleImg = document.createElement("img")
  titleImg.src = item.image
  titleImg.alt = "title image"
  content.querySelector("header").appendChild(titleImg)

  // const separator = document.createElement("div")
  // separator.classList.add("separator")
  // content.body.appendChild(separator)

  //удаление картинок и видео для версии для слабовидящих
  if (!!window.limit) {
    const objects = content.querySelectorAll("video, img, figure")
    objects.forEach((node) => node.remove())
  }

  let foundSwiper = null
  let foundZoom = null
  let foundVideo = null

  content.body.childNodes.forEach((child) => {
    const tagName = child.localName
    const key = item.pubDate + components.length

    switch (tagName) {
      case "header":
        components.push(<Header innerHTML={child.innerHTML} key={key} />)
        break
      case "img":
        const zoomable = child.nextSibling.localName === "hr"
        if (zoomable) {
          foundZoom = <Image src={child.src} alt='' key={key} zoomable={zoomable} />
        } else {
          components.push(
            <Image src={child.src} alt='' key={key}/>
          )
        }
        break
      case "div":
        if (child.classList.contains("t-redactor__text")) {
          components.push(
            <RedactorText innerHTML={child.innerHTML} key={key} />
          )
          break
        } else if (child.classList.contains("video_wrapper")) {
          const video = child.querySelector("video")
          foundVideo = <Video src={video.src} poster={video.poster} key={key} />
          // components.push(
          //   <Video src={video.src} poster={video.poster} key={key} />
          // )
          break
        } else if (child.dataset.block === "gallery") {
          const imgs = [...child.querySelectorAll("img")]
          const srcs = imgs
            .map((img) => img.src)
            .filter((src) => src !== item.image)

          foundSwiper = <Swiper images={srcs} key={+Date.now()} />

          // components.push(<Swiper images={srcs} key={key} />)
          break
        }
        console.log("MISSED DIIIIIIIIIV")
        console.log(child)
        components.push(
          <div
            dangerouslySetInnerHTML={{ __html: child.innerHTML }}
            key={key}></div>
        )

        break
      case "p":
        if (child.classList.contains("t-redactor__text")) {
          components.push(
            <RedactorText
              innerHTML={child.innerHTML}
              paragraph={true}
              key={key}
            />
          )
          break
        }
        components.push(
          <p
            dangerouslySetInnerHTML={{ __html: child.innerHTML }}
            key={key}></p>
        )
        break
      case "blockquote":
        if (child.classList.contains("t-redactor__quote")) {
          components.push(
            <Blockquote
              innerHTML={child.innerHTML}
              key={key}
            />
          )
          break
        }
        break
      default:
        if (child.nodeName !== "#text" && child.localName !== "hr") {
          console.log(content.body.childNodes)
          console.log(content.body)
          console.log("WE MISS SOMETHING ALERT!!!")
          console.log(child)
        }
        break
    }
  })

  if (foundSwiper) components.push(foundSwiper)
  if (foundZoom) components.push(foundZoom)
  if (foundVideo) components.push(foundVideo)
  components.push(<Separator key={item.pubDate + components.length} />)

  return { ...item, content: content.body.innerHTML, components }
}

export default modifyContent
