import { DatePicker } from "@mui/x-date-pickers"

import "./Filter.css"

const Filter = ({
  setstartTime,
  setendTime,
  setstartMils,
  setEndMils,
  textFilter,
  startTime,
  endTime,
}) => {
  return (
    <section className='filter'>
      <div className='filter_wrapper'>
        <span className='text_filter_one'>{textFilter}</span>
        <DatePicker
          value={startTime}
          onChange={(newValue) => {
            setstartTime(newValue)
            setstartMils(+newValue)
          }}
        />
        {/* <input
          type='date'
          value={startTime}
          onChange={(el) => {
            setstartTime(el.target.value)
            setstartMils(Date.parse(el.target.value))
          }}
        /> */}
        <span className='text_filter_two'>по</span>
        <DatePicker
          value={endTime}
          onChange={(newValue) => {
            setendTime(newValue)
            setEndMils(+newValue)
          }}
        />
        {/* <input
          type='date'
          value={endTime}
          onChange={(el) => {
            setendTime(el.target.value)
            setEndMils(Date.parse(el.target.value))
          }}
        /> */}
      </div>
    </section>
  )
}

export default Filter
