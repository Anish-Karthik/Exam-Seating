import { useEffect, useState } from "react"
import { Hall } from "@/server/type"
import { useHallsState, useTotalHallCapacityState } from "@/store/hooks"
import { toast } from "react-hot-toast"

import { Button } from "../ui/button"
import DisplayHall from "./hall-form"

// make this as functional argument
// const [halls, setHalls] = useState<Hall[]>([]);
const HallForm = () => {
  const { hallsState: halls, addHall, deleteHall, editHall } = useHallsState()
  const setTotalHallCapacity = useTotalHallCapacityState(
    (state) => state.setTotalHallCapacityState
  )
  // TODO
  const [editingArray, setEditingArray] = useState<boolean[]>(
    new Array(halls.length).fill(false)
  )
  useEffect(() => {
    const total = halls.reduce((acc, curr) => acc + curr.studentsPerHall, 0)
    console.log(halls)
    console.log(total)
    setTotalHallCapacity(total)
  }, [halls, setTotalHallCapacity])
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;

  const handleSubmit = () => {
    setEditingArray((prevArray) => [...prevArray, true])
    addHall({
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
    })
  }
  const handleDeleteData = (index: number) => {
    deleteHall(index)
    toast.success("Deleted hall data")
  }
  const handleEditData = (index: number, hallData: Hall) => {
    editHall(index, hallData)
    toast.success("Saved Hall data")
  }
  return (
    <div className="form-group container max-sm:min-h-screen max-sm:!p-0 md:!p-2">
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
