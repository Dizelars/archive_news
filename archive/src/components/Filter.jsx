import { DatePicker } from "@mui/x-date-pickers"
import { useState, useEffect } from "react"
import "./Filter.css"
import dayjs from "dayjs"

const Filter = ({
  setstartTime,
  setstartMils,
  setEndMils,
  startTime,
  news,
  limited,
}) => {
  const [textFilter, settextFilter] = useState(null)

  const setTextFilterOnResize = () => {
    if (window.innerWidth >= 840) return settextFilter("Показывать новости за")
      
    // if (window.innerWidth < 840 && window.innerWidth > 540)
    //   return settextFilter("Показывать  новости за")

    return settextFilter("Новости за")
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
            views={["month"]}
            onChange={(newValue) => {
              const end = newValue.add(1, "month").subtract(1, "day")
              setstartTime(newValue)
              setstartMils(+newValue)
              setEndMils(+end)
            }}
          />
        ) : (
          <input
            min={dayjs(
              new Date(news[news.length - 1].pubDate).toISOString()
            ).format("YYYY-MM")}
            max={dayjs(new Date(news[12].pubDate).toISOString()).format(
              "YYYY-MM"
            )}
            type='month'
            value={startTime.format("YYYY-MM")}
            onChange={(e) => {
              const start = dayjs(e.target.value)
              const end = start.add(1, "month").subtract(1, "day")
              setstartTime(start)
              setstartMils(+start)
              setEndMils(+end)
            }}
          />
        )}
        {/* <span className='text_filter_two'>по</span> */}

        {/* {!limited ? (
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
        )} */}
      </div>
    </section>
  )
}

export default Filter
