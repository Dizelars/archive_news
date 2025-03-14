import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "./Filter.css";

const Filter = ({
  setstartTime,
  setstartMils,
  setEndMils,
  startTime,
  news,
}) => {
  const [textFilter, settextFilter] = useState(null);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const setTextFilterOnResize = () => {
    settextFilter(
      window.innerWidth >= 840 ? "Показывать новости за" : "Новости за"
    );
  };

  useEffect(() => {
    setTextFilterOnResize();
    window.addEventListener("resize", setTextFilterOnResize);
    return () => window.removeEventListener("resize", setTextFilterOnResize);
  }, []);

  useEffect(() => {
    // Получаем все доступные месяцы и годы из обрезанного массива новостей
    const dates = news.map((item) => dayjs(item.pubDate));
    const uniqueYears = [...new Set(dates.map((date) => date.year()))].sort(
      (a, b) => b - a
    );

    setAvailableYears(uniqueYears);

    // Формируем объект { год: [массив доступных месяцев] }
    const monthsByYear = uniqueYears.reduce((acc, year) => {
      acc[year] = [
        ...new Set(
          dates
            .filter((date) => date.year() === year)
            .map((date) => date.month())
        ),
      ];
      return acc;
    }, {});

    setAvailableMonths(monthsByYear);
  }, [news]);

  return (
    <section className="filter">
      <div className="filter_wrapper">
        <span className="text_filter_one">{textFilter}</span>

        {/* Фильтр по году */}
        <DatePicker
          views={["year"]}
          value={startTime}
          minDate={dayjs(news[news.length - 1].pubDate)} // Минимальная дата: самая старая новость
          maxDate={dayjs(news[0].pubDate)} // Максимальная дата: самая новая новость
          onChange={(newValue) => {
            if (!newValue) return;
            const end = newValue.endOf("year");
            setstartTime(newValue);
            setstartMils(+newValue);
            setEndMils(+end);
          }}
          shouldDisableYear={(year) => !availableYears.includes(year.year())}
          renderInput={(props) => <TextField {...props} label="Выберите год" />}
        />
        
        {/* Фильтр по месяцу */}
        {startTime && (
          <DatePicker
            views={["month"]}
            value={startTime}
            minDate={dayjs(startTime).startOf("year")} // Месяца только для выбранного года
            maxDate={dayjs(startTime).endOf("year")}
            onChange={(newValue) => {
              if (!newValue) return;
              const end = newValue.endOf("month");
              setstartTime(newValue);
              setstartMils(+newValue);
              setEndMils(+end);
            }}
            shouldDisableMonth={(month) =>
              !(
                availableMonths[startTime.year()] &&
                availableMonths[startTime.year()].includes(month.month())
              )
            }
            renderInput={(props) => (
              <TextField {...props} label="Выберите месяц" />
            )}
          />
        )}
      </div>
    </section>
  );
};

export default Filter;
