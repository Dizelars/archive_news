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
        <span className='text_filter_two'>по</span>
        <DatePicker
          value={endTime}
          onChange={(newValue) => {
            setendTime(newValue)
            setEndMils(+newValue)
          }}
        />
      </div>
    </section>
  )
}

export default Filter
