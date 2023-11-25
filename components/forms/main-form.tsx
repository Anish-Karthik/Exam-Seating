"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  excelDataState,
  fileNamesState,
  hallsState,
  mergedDataState,
  totalHallCapacityState,
  totalStudentsState,
} from "@/store/atoms/form"
import { toast } from "react-hot-toast"
import { useRecoilState } from "recoil"

import ExcelDataForm from "@/components/forms/excel-data-form"

import DisplayStudentInputData from "../display/display-student-input"
import SampleData from "../display/sample-data"
import { Button } from "../ui/button"
import HallForm from "./multiples-hall-form"

const MainForm = () => {
  const [fileNames, setFileNames] = useRecoilState(fileNamesState)
  const [totalStudents, setTotalStudents] = useRecoilState(totalStudentsState)
  const [totalHallCapacity, setTotalHallCapacity] = useRecoilState(
    totalHallCapacityState
  )
  const [halls, setHalls] = useRecoilState(hallsState)
  const [excelData, setExcelData] = useRecoilState(excelDataState)
  const [mergedData, setMergedData] = useRecoilState(mergedDataState)

  const router = useRouter()
  useEffect(() => {
    setFileNames(
      window.localStorage.getItem("data")
        ? JSON.parse(window.localStorage.getItem("data")!).fileNames
        : []
    )
    setTotalStudents(
      window.localStorage.getItem("data")
        ? JSON.parse(window.localStorage.getItem("data")!).totalStudents
        : 0
    )
    setTotalHallCapacity(
      window.localStorage.getItem("data")
        ? JSON.parse(window.localStorage.getItem("data")!).totalHallCapacity
        : 0
    )
    setHalls(
      window.localStorage.getItem("data")
        ? JSON.parse(window.localStorage.getItem("data")!).halls
        : []
    )
    setExcelData(
      window.localStorage.getItem("data")
        ? JSON.parse(window.localStorage.getItem("data")!).excelData
        : []
    )
    setMergedData(
      window.localStorage.getItem("data")
        ? JSON.parse(window.localStorage.getItem("data")!).mergedData
        : []
    )
  }, [])

  if (!window || !window.localStorage) {
    return <h1>Local Storage not supported</h1>
  }

  const handleSubmit = () => {
    if (totalHallCapacity === 0) {
      toast.error("Total Hall Capacity is 0")
      return
    }
    if (totalStudents === 0) {
      toast.error("Total Students is 0")
      return
    }
    if (totalStudents > totalHallCapacity) {
      toast.error("Total Students are greater than Total Hall Capacity")
      return
    }
    // store the data in window.localstorage
    window.localStorage.setItem(
      "data",
      JSON.stringify({
        totalHallCapacity,
        totalStudents,
        excelData,
        mergedData,
        halls,
        fileNames,
      })
    )
    toast.success("Data saved permanently")
  }
  const handleReset = () => {
    setTotalHallCapacity(0)
    setTotalStudents(0)
    setExcelData([])
    setMergedData([])
    setHalls([])
    setFileNames([])
    window.localStorage.removeItem("data")
    router.refresh()
  }
  const isValid = () => {
    if (totalHallCapacity === 0) {
      return false
    }
    if (totalStudents === 0) {
      return false
    }
    if (totalStudents > totalHallCapacity) {
      return false
    }
    return true
  }

  return (
    <div className="form-group container flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 max-md:flex-col">
          <h1 className="text-2xl font-bold">
            Total Hall Capacity: {totalHallCapacity}
          </h1>
          <h1 className="text-2xl font-bold">
            Total Students: {totalStudents}
          </h1>
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <Button
            onClick={handleReset}
            variant="outline"
            className="!border-[3px]"
          >
            Reset
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid()}>
            Save
          </Button>
          {
            <Link href={"/display"}>
              <Button>Generate Plan</Button>
            </Link>
          }
        </div>
      </div>
      <SampleData />
      <ExcelDataForm />
      <HallForm />
      <DisplayStudentInputData />
    </div>
  )
}

export default MainForm
