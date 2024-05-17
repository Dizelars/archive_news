import { useState, useEffect } from "react"
import modifyContent from "../utils/modifyContent"
import Filter from "./Filter"
import dayjs from "dayjs"

const Feed = ({ news }) => {
  const [textFilter, settextFilter] = useState(null)
  const [startTime, setstartTime] = useState(
    dayjs(new Date(news[news.length - 1].pubDate).toISOString())
  )
  const [endTime, setendTime] = useState(
    news[12]
      ? dayjs(new Date(news[12].pubDate).toISOString())
      : dayjs(new Date(news[0].pubDate).toISOString())
  )
  const [startMils, setstartMils] = useState(
    +new Date(news[news.length - 1].pubDate)
  )
  const [endMils, setEndMils] = useState(
    news[12] ? +new Date(news[12].pubDate) : +new Date(news[0].pubDate)
  )

  const [selectedNews, setselectedNews] = useState([])

  const [counter, setcounter] = useState(10)

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
    setselectedNews(news.filter(filterNews))

    window.addEventListener("resize", setTextFilterOnResize)

    return function () {
      window.removeEventListener("resize", setTextFilterOnResize)
    }
  }, [])

  useEffect(() => {
    setselectedNews(news.filter(filterNews))
    setcounter(10)
  }, [startTime, endTime])

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
      {selectedNews
        .slice(0, counter)
        .map(modifyContent)
        .map((item) => (
          <div
            className='feed'
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
            key={item.pubDate}></div>
        ))}
      {counter < selectedNews.length && (
        <button
          onClick={() => setcounter((c) => c + 10)}
          className='showMoreButton'>
          Больше новостей
        </button>
      )}
    </div>
  )
}

export default Feed
