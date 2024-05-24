import "./reset.css"
import React from "react"
import ReactDOM from "react-dom/client"
import "./fonts/MoscowSans/MoscowSans_Regular.ttf"
import "./index.css"

import App from "./App"
import { register } from "swiper/element/bundle"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import "dayjs/locale/ru"
import { ThemeProvider, createTheme } from "@mui/material"
import { ruRU } from "@mui/x-date-pickers/locales"

register()

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <App />
    </LocalizationProvider>
  </ThemeProvider>
)
