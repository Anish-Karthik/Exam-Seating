import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

import { Hall } from "@/lib/type"

import { Button } from "../ui/button"
import DisplayHall from "./hall-form"

// make this as functional argument
// const [halls, setHalls] = useState<Hall[]>([]);
const HallForm = ({
  halls,
  setHalls,
  setTotalHallCapacity,
}: {
  halls: Hall[]
  setHalls: React.Dispatch<React.SetStateAction<Hall[]>>
  setTotalHallCapacity: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [editingArray, setEditingArray] = useState<boolean[]>(
    new Array(halls.length).fill(false)
  )

  useEffect(() => {
    const total = halls.reduce((acc, curr) => acc + curr.studentsPerHall, 0)
    setTotalHallCapacity(total)
  }, [halls])

  const handleSubmit = () => {
    setEditingArray((prevArray) => [...prevArray, true])
    setHalls((prevHalls) => [
      ...prevHalls,
      {
        hallno: "0",
        dept: "CSE",
        studentsPerBench: 1,
        studentsPerHall: 0,
        isSameYearPerBenchAllowed: false,
        isInterchange: false,
        benches: {
          rows: 0,
          cols: 0,
          extra: 0,
        },
      },
    ])
  }
  const handleDeleteData = (index: number) => {
    setHalls((prevData) => {
      const newData = [...prevData]
      newData.splice(index, 1)
      return newData
    })
    toast.success("Deleted hall data")
  }
  const handleEditData = (index: number, hallData: Hall) => {
    setHalls((prevData) => {
      const newData = [...prevData]
      newData[index] = hallData
      return newData
    })
    toast.success("Saved Hall data")
  }
  return (
    <div className="form-group container !p-2">
      <Button
        variant={"outline"}
        className="mb-2 rounded-full border-blue-800 px-3 text-xl text-blue-800"
        onClick={handleSubmit}
      >
        Add Hall
      </Button>
      <div className="flex flex-col-reverse gap-2">
        {halls.map((hall, index) => (
          <div className="flex" key={index}>
            <DisplayHall
              hall={hall}
              onDelete={handleDeleteData}
              index={index}
              onEdit={handleEditData}
              setEditingIndex={setEditingArray}
              defaultIsEdit={editingArray[index]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HallForm
