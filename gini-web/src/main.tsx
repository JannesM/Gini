import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Chart, CategoryScale, LinearScale, PointElement, LineElement, LineController, BarElement, BarController, Scale, Title, SubTitle, Legend, Tooltip, Filler} from "chart.js"

Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement, BarElement, BarController, Title, SubTitle, Legend, Tooltip, Filler)

Chart.defaults.backgroundColor = "#fff" // points
Chart.defaults.borderColor = "#434343" // grid
Chart.defaults.color = "#fff" // scale

Chart.defaults.layout.padding = 0

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <p className="absolute bottom-0 left-0 m-5 text-gray-500">Copyright © 2023, Jannes Meinders</p>
  </React.StrictMode>,
)
