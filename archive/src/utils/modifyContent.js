const modifyContent = (item, i) => {
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

    gallery.innerHTML = `
    <swiper-container
      navigation="true"
      pagination="true"
      loop>
          ${inner}
    </swiper-container>`
  })

  // Получаем все ссылки
  const links = content.querySelectorAll("a")
  // Добавляем атрибут target="_blank"
  links.forEach((link) => {
    link.setAttribute("target", "_blank")
  })

  //заменяем iframe на video
  const iframes = content.querySelectorAll("iframe")
  iframes.forEach((iframe) => {
    const videoSrc = iframe.getAttribute("src")
    const video = document.createElement("video")
    video.poster = "https://coddmac.store/codd_news/codd_video_poster.png"
    video.src = videoSrc
    video.setAttribute("controls", "")
    iframe.replaceWith(video)
  })

  //замена strong на p с классом bold
  const strongs = content.querySelectorAll("strong")
  strongs.forEach((strong) => {
    const text = strong.textContent
    const p = document.createElement("p")
    p.classList.add("bold")
    p.textContent = text
    strong.replaceWith(p)
  })

  const ems = content.querySelectorAll("em")
  ems.forEach((em) => {
    const text = em.textContent
    const p = document.createElement("p")
    p.classList.add("italic")
    p.textContent = text
    em.replaceWith(p)
  })

  const redactor_texts = content.querySelectorAll(".t-redactor__text")
  redactor_texts.forEach((redText) => {
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

  const separator = document.createElement("div")
  separator.classList.add("separator")
  content.body.appendChild(separator)

  //удаление картинок и видео для версии для слабовидящих
  if (!!window.limit) {
    const objects = content.querySelectorAll("video, img, figure")
    objects.forEach((node) => node.remove())
  }

  return { ...item, content: content.body.innerHTML }
}

export default modifyContent
