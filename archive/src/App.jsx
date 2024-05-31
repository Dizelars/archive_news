import "./App.css"
import { useState, useEffect } from "react"

import Error from "./components/Error"
import Loader from "./components/Loader"
import Feed from "./components/Feed"

// const url = "https://ictransport.ru/rss-feed-682234369181.xml"
const url = "https://ictransport.ru/rss-feed-827453696181.xml"

function App() {
  const [news, setNews] = useState([])

  const [limited, setlimited] = useState(false)
  const [error, setError] = useState(false)
  const [errorText, seterrorText] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (window.limit) {
      setlimited(true)
    }

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, "application/xml")

        // Получаем массив элементов новостей
        let newsItems = Array.from(xmlDoc.getElementsByTagName("item"))
        newsItems = newsItems.filter((item) => {
          const turboAttribute = item.getAttribute("turbo")
          return turboAttribute === null || turboAttribute === "true"
        })
        newsItems = newsItems.map((el) => {
          let title, link, pubDate, author, image, content
          if (el.querySelector("title"))
            title = el.querySelector("title").textContent
          if (el.querySelector("link"))
            link = el.querySelector("link").textContent
          if (el.querySelector("pubDate"))
            pubDate = el.querySelector("pubDate").textContent
          if (el.querySelector("author"))
            author = el.querySelector("author").textContent
          if (el.querySelector("enclosure"))
            image = el.querySelector("enclosure").attributes.url.textContent
          if (el.getElementsByTagName("turbo:content")) {
            content = el.getElementsByTagName("turbo:content")[0].textContent
          }

          return { title, link, pubDate, author, image, content }
        })

        newsItems.sort((a, b) => {
          const dateA = new Date(a.pubDate)
          const dateB = new Date(b.pubDate)
          return dateB - dateA
        })

        setNews(newsItems)
        setLoading(false)
      })
      .catch((error) => {
        // Обрабатываем ошибку при запросе
        console.log("Запрос не прошел. Ошибка: ", error)

        setError(true)
        seterrorText("Ошибка при получении данных")
      })
  }, [])
  if (error) return <Error errorText={errorText} />
  if (loading) return <Loader />

  // return <MySwiper />

  return <Feed news={news} limited={limited} />
}

export default App
