import { useEffect, useState } from "react"
import { Hall } from "@/server/type"
import { hallsState, totalHallCapacityState } from "@/store/atoms/form"
import { toast } from "react-hot-toast"
import { useRecoilState, useSetRecoilState } from "recoil"

import { Button } from "../ui/button"
import DisplayHall from "./hall-form"

// make this as functional argument
// const [halls, setHalls] = useState<Hall[]>([]);
const HallForm = () => {
  const [halls, setHalls] = useRecoilState(hallsState)
  const setTotalHallCapacity = useSetRecoilState(totalHallCapacityState)
  const [editingArray, setEditingArray] = useState<boolean[]>(
    new Array(halls.length).fill(false)
  )
  console.log(halls)
  useEffect(() => {
    const total = halls.reduce((acc, curr) => acc + curr.studentsPerHall, 0)
    console.log(halls)
    console.log(total)
    setTotalHallCapacity(total)
  }, [halls, setTotalHallCapacity])

  const handleSubmit = () => {
    setEditingArray((prevArray) => [...prevArray, true])
    setHalls((prevHalls) => [
      ...prevHalls,
      {
        hallno: "101",
        dept: "CSE",
        studentsPerBench: 1,
        studentsPerHall: 0,
        isSameYearPerBenchAllowed: false,
        isInterchange: false,
        benches: {
          rows: 5,
          cols: 6,
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
      console.log(newData)
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
