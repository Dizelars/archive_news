import { useState, useEffect } from "react"
import modifyContent from "../utils/modifyContent"
import Filter from "./Filter"
import dayjs from "dayjs"

const Feed = ({ news }) => {
  const [textFilter, settextFilter] = useState(null)
  const [startTime, setstartTime] = useState(
    news[16]
      ? dayjs(new Date(news[16].pubDate).toISOString())
      : dayjs(new Date(news[news.length - 1].pubDate).toISOString())
  )
  const [endTime, setendTime] = useState(
    news[12]
      ? dayjs(new Date(news[12].pubDate).toISOString())
      : dayjs(new Date(news[0].pubDate).toISOString())
  )
  const [startMils, setstartMils] = useState(
    news[16]
      ? +new Date(news[16].pubDate)
      : +new Date(news[news.length - 1].pubDate)
  )
  const [endMils, setEndMils] = useState(
    news[12] ? +new Date(news[12].pubDate) : +new Date(news[0].pubDate)
  )

  const filterNews = (el) => {
    const mils = Date.parse(el.pubDate)

    if (mils > endMils || mils < startMils) return false
    return true
  }

  const setTextFilterOnResize = () => {
    if (window.innerWidth >= 840)
      return settextFilter("Показывать  новости вышедшие с")

    if (window.innerWidth < 840 && window.innerWidth > 540)
      return settextFilter("Показывать  новости с")

    return settextFilter("Новости с")
  }

  useEffect(() => {
    setTextFilterOnResize()

    window.addEventListener("resize", setTextFilterOnResize)

    return function () {
      window.removeEventListener("resize", setTextFilterOnResize)
    }
  }, [])

  return (
    <div className='wrapper'>
      <nav>
        <a href='/'>
          <img
            src='https://coddmac.store/codd_news/arrow-left.svg'
            alt='left arrow'
          />
        </a>
        <a href='google.com'>
          <p>К новостям</p>
        </a>
      </nav>
      <Filter
        {...{
          setendTime,
          setEndMils,
          setstartMils,
          setstartTime,
          textFilter,
          startTime,
          endTime,
        }}
      />
      {news
        .filter(filterNews)
        .map(modifyContent)
        .map((item) => (
          <div
            className='feed'
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
            key={item.pubDate}></div>
        ))}
    </div>
  )
}

export default Feed
