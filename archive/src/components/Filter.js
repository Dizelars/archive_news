import { DatePicker } from "@mui/x-date-pickers"
import { useState, useEffect } from "react"
import "./Filter.css"
import dayjs from "dayjs"

const Filter = ({
  setstartTime,
  setendTime,
  setstartMils,
  setEndMils,
  startTime,
  endTime,
  news,
  limited,
}) => {
  const [textFilter, settextFilter] = useState(null)

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
    <section className='filter'>
      <div className='filter_wrapper'>
        <span className='text_filter_one'>{textFilter}</span>
        {!limited ? (
          <DatePicker
            minDate={dayjs(
              new Date(news[news.length - 1].pubDate).toISOString()
            )}
            maxDate={dayjs(new Date(news[12].pubDate).toISOString())}
            value={startTime}
            onChange={(newValue) => {
              setstartTime(newValue)
              setstartMils(+newValue)
            }}
          />
        ) : (
          <input
            min={dayjs(
              new Date(news[news.length - 1].pubDate).toISOString()
            ).format("YYYY-MM-DD")}
            max={dayjs(new Date(news[12].pubDate).toISOString()).format(
              "YYYY-MM-DD"
            )}
            type='date'
            value={startTime.format("YYYY-MM-DD")}
            onChange={(e) => {
              setstartTime(dayjs(e.target.value))
              setstartMils(+dayjs(e.target.value))
            }}
          />
        )}

        <span className='text_filter_two'>по</span>

        {!limited ? (
          <DatePicker
            minDate={dayjs(
              new Date(news[news.length - 1].pubDate).toISOString()
            )}
            maxDate={dayjs(new Date(news[12].pubDate).toISOString())}
            value={endTime}
            onChange={(newValue) => {
              setendTime(newValue)
              setEndMils(+newValue)
            }}
          />
        ) : (
          <input
            min={dayjs(
              new Date(news[news.length - 1].pubDate).toISOString()
            ).format("YYYY-MM-DD")}
            max={dayjs(new Date(news[12].pubDate).toISOString()).format(
              "YYYY-MM-DD"
            )}
            type='date'
            value={endTime.format("YYYY-MM-DD")}
            onChange={(e) => {
              setendTime(dayjs(e.target.value))
              setEndMils(+dayjs(e.target.value))
            }}
          />
        )}
      </div>
    </section>
  )
}

export default Filter
