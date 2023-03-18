import { useMemo, useState } from 'react'
import { BsStack, BsTrash } from "react-icons/bs"
import CalculateGini, { DataPoint } from './Core'
import GiniChart from "./GiniChart"


type View = "edit" | "graph"


export default function App() {
  const [data, setData] = useState<DataPoint[]>([
    {
      name: "Azubi",
      value: 2,
    },
    {
      name: "Azubi 2",
      value: 4,
    },
    {
      name: "Mitarbeiter",
      value: 5,
    },
    {
      name: "Chef",
      value: 20,
    },
  ])
  // const [view, setView] = useState<View>(data.length === 0 ? "edit" : "graph")
  const [view, setView] = useState<View>("edit")
  const gini = useMemo(() => CalculateGini(data), [data])

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
    d.push({ name, value: Number.parseInt(value)})
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

    const newItem: DataPoint = {
      name: item.name,
      value: item.value,
    }

    const d = [...data]
    d.push(newItem)
    setData(d)
  }

  return (
    <div className="flex flex-col gap-5 mx-52 justify-center h-screen">


      <div className="flex h-[105px]">
        <div className="grid grid-cols-3 gap-5 text-white w-full">
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
        {/* {
          view === "edit" ?
            <AllocationChart gini={gini} />
            :

        } */}
      </div>

      {/* chart container */}
      <div className="bg-menu p-3 rounded-lg h-[543px]">
        {
          view === "edit" ?
            <>
              <p className="text-accent-red mx-6 my-3">{error}</p>
              <div className="flex flex-col gap-5 mx-5">

                <div className="grid grid-cols-3 gap-5">
                  <input placeholder="Name der Gruppe" type="text" className="rounded-lg px-5" onChange={(e: any) => setName(e.target.value)} value={name} />
                  <input placeholder="Einkommen (in €)" type="text" className="rounded-lg px-5" onChange={(e: any) => setValue(e.target.value)} value={value} />
                  <button className="col-span-1" onClick={handleAdd}>Hinzufügen</button>
                </div>



                {
                  data.length === 0 ?
                    <div className="grid grid-cols-3 gap-5">
                      <h2 className="text-lg ml-5">Keine Einträge vorhanden.</h2>
                      <h2 className="text-lg ml-5"></h2>
                      <h2 className="text-lg ml-5"></h2>
                    </div>
                    :
                    data.map((e, i) => {
                      return <div key={i} className="grid grid-cols-3 gap-5">
                        <h2 className="text-lg ml-5">{e.name}</h2>
                        <h2 className="text-lg ml-5">{e.value.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</h2>
                        <div className="grid grid-cols-2 gap-5">
                          <button className="flex justify-center" onClick={() => handleDelete(i)}>{<BsTrash />}</button>
                          <button className="flex justify-center" onClick={() => handleDuplicate(i)}>{<BsStack />}</button>
                        </div>
                      </div>
                    })
                }
              </div>
            </>
            :
            <div className="h-full flex justify-center">
              <GiniChart gini={gini} />
            </div>
        }
      </div>

      <button className="" onClick={() => setView(view === "edit" ? "graph" : "edit")}>{view === "graph" ? "Datensatz bearbeiten" : "Daten visualisieren"}</button>

    </div>

  )
}
