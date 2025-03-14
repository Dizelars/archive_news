import { useState, useEffect, useCallback } from "react"
import modifyContent from "../utils/modifyContent"
import Filter from "./Filter"
import dayjs from "dayjs"

const Feed = ({ news, limited }) => {
  const [startTime, setstartTime] = useState(
    news[22]
      ? dayjs(+new Date(news[22].pubDate)).date(1)
      : dayjs(+new Date(news[0].pubDate)).date(1)
  )
  const [startMils, setstartMils] = useState(+startTime)
  const [endMils, setEndMils] = useState(
    +startTime.add(1, "month").subtract(1, "day")
  )

  const [selectedNews, setselectedNews] = useState([])

  const [counter, setcounter] = useState(10)

  const filterNews = useCallback(
    (el) => {
      const mils = Date.parse(el.pubDate)
      
      if (news[22] && mils > +new Date(news[22].pubDate)) return false
      if (mils > endMils || mils < startMils) return false
      return true
    },
    
    [endMils, startMils, news]
  )

  useEffect(() => {
    setselectedNews(news.filter(filterNews))
    setcounter(10)
  }, [startTime, filterNews, news])

  return (
    <div className={`wrapper ${limited ? "limited" : ""}`}>
      <nav>
        <a
          className='linkToNews'
          href={`https://gucodd.ru/${
            limited ? "news_vision" : "news"
          }`}>
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
          setEndMils,
          setstartMils,
          setstartTime,
          startTime,
          news: news.slice(22),
          limited,
        }}
      />
      {selectedNews
        .slice(0, counter)
        .map(modifyContent)
        .map((item) => (
          <div className='feed' key={item.pubDate}>
            {item.components.map((particle) => particle)}
          </div>
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
