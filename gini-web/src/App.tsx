import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CalculateGini from './Core'

function App() {
  const [data, setData] = useState([2, 4, 5, 5, 20])
  const gini = useMemo(() => CalculateGini(data), [data])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Gini-Koeffizient: {gini.gini}%</p>
        <p>Summen: {gini.partialSums.join(", ")}</p>
        <p>Einkommen: {gini.incomeDist.join(", ")}</p>
        <p>Gruppen: {gini.groupDist.join(", ")}</p>
      </div>
    </div>
  )
}

export default App
