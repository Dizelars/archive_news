import { useState, useEffect, useCallback } from "react"
import modifyContent from "../utils/modifyContent"
import Filter from "./Filter"
import dayjs from "dayjs"

const Feed = ({ news, limited }) => {
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

  const filterNews = useCallback(
    (el) => {
      const mils = Date.parse(el.pubDate)

      if (mils > endMils || mils < startMils) return false
      return true
    },
    [endMils, startMils]
  )

  useEffect(() => {
    setselectedNews(news.filter(filterNews))
    setcounter(10)
  }, [startTime, endTime, filterNews, news])

  return (
    <div className={`wrapper ${limited ? "limited" : ""}`}>
      <nav>
        <a className='linkToNews' href={`https://gucodd.ru/${limited ? "auto_news_vision" : "auto_news"}`}>
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M11.25 14.625L5.625 9L11.25 3.375'
              stroke='#62A744'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <p>К новостям</p>
        </a>
      </nav>
      <Filter
        {...{
          setendTime,
          setEndMils,
          setstartMils,
          setstartTime,
          startTime,
          endTime,
          news,
          limited,
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
          className={`showMoreButton ${limited ? "limited" : ""}`}>
          Больше новостей
        </button>
      )}
    </div>
  )
}

export default Feed
