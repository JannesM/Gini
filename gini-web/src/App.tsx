import { useEffect, useMemo, useState } from 'react'
import CalculateGini from './Core'
import GiniChart from "./GiniChart"
import { BsStack, BsTrash } from "react-icons/bs"


type View = "edit" | "graph"

type DataPoint = {
  name: string
  value: number
}

export default function App() {
  const [data, setData] = useState<DataPoint[]>([])
  const [view, setView] = useState<View>(data.length === 0 ? "edit" : "graph")
  const gini = useMemo(() => CalculateGini(data.map(e => e.value).sort((a, b) => a - b)), [data])

  // useEffect(() => console.log(gini), [data])

  const [name, setName] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleAdd = () => {
    if (isNaN(Number.parseInt(value))) {
      setError("Bitte gebe ein gültiges Einkommen an!")
      return
    }

    const d = [...data]
    d.push({ name, value: Number.parseInt(value) })
    setData(d)

    setName("")
    setValue("")
    setError("")
  }

  const handleDelete = (index: number) => {
    const d = [...data]
    d.splice(index, 1)
    setData(d)
  }

  const handleDuplicate = (index: number) => {
    const item = data[index]

    const newItem = {
      name: item.name,
      value: item.value
    }

    const d = [...data]
    d.push(newItem)
    setData(d)
  }

  return (
    <div className="flex flex-col gap-5 mx-52 justify-center h-screen">


      <div className="grid grid-cols-3 gap-5 text-white">

        <div className="bg-menu flex flex-col text-center py-3 rounded-lg">
          <h1>{gini.gini}%</h1>
          <p className="text-[#979292]">Gini-Koeffizient</p>
        </div>
        <div className="bg-menu flex flex-col text-center py-3 rounded-lg">
          <h1>{(gini.total ?? 0).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</h1>
          <p className="text-[#979292]">Gesamteinkommen</p>
        </div>
        <div className="bg-menu flex flex-col text-center py-3 rounded-lg">
          <h1>{gini.input.length}</h1>
          <p className="text-[#979292]">statistische Gruppen</p>
        </div>

      </div>

      {/* chart container */}
      <div className="bg-menu p-3 rounded-lg min-h-[543px]">
        {
          view === "edit" ?
            <>
              <p className="text-accent-red mx-6 my-3">{error}</p>
              <div className="grid grid-cols-12 gap-5 mx-5 mb-5">
                <input placeholder="Name der Gruppe" type="text" className="col-span-5 rounded-lg px-5" onChange={(e: any) => setName(e.target.value)} value={name} />
                <input placeholder="Einkommen" type="text" className="col-span-5 rounded-lg px-5" onChange={(e: any) => setValue(e.target.value)} value={value} />
                <button className="col-span-2" onClick={handleAdd}>Hinzufügen</button>

                {/* <h2 className="text-lg w-[300px] underline col-span-5">statistische Gruppe</h2>
                <h2 className="text-lg w-[300px] underline col-span-5">Einkommen</h2>
                <div className="col-span-2"></div> */}

                {
                  data.length === 0 ?
                    <div className="grid grid-cols-12 col-span-12 gap-5">
                      <h2 className="text-lg w-[300px] ml-5 col-span-5">Keine Einträge vorhanden.</h2>
                      <h2 className="text-lg w-[300px] ml-5 col-span-5"></h2>
                    </div>
                    :
                    data.map((e, i) => {
                      return <div key={i} className="grid grid-cols-12 col-span-12 gap-5">
                        <h2 className="text-lg w-[300px] ml-5 col-span-5">{e.name}</h2>
                        <h2 className="text-lg w-[300px] ml-5 col-span-5">{e.value.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</h2>
                        <div className="flex justify-between col-span-2">
                          <button onClick={() => handleDelete(i)}>{<BsTrash />}</button>
                          <button onClick={() => handleDuplicate(i)}>{<BsStack />}</button>
                        </div>
                      </div>
                    })
                }
              </div>
            </>
            :
            <GiniChart gini={gini} />
        }
      </div>

      <button className="" onClick={() => setView(view === "edit" ? "graph" : "edit")}>{view === "graph" ? "Datensatz bearbeiten" : "Daten visualisieren"}</button>

    </div>

  )
}
