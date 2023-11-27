"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  useExcelDataState,
  useFileNamesState,
  useHallArrangementsState,
  useHallAttendancesState,
  useHallPlansState,
  useHallsState,
  useMergedDataState,
  useTotalHallCapacityState,
  useTotalStudentsState,
} from "@/store/hooks"
import toast from "react-hot-toast"

import { Button } from "../ui/button"

const ResetButton = () => {
  const { setHallPlansState } = useHallPlansState()
  const { setHallArrangementsState } = useHallArrangementsState()
  const { setHallAttendancesState } = useHallAttendancesState()
  const { setHallsState } = useHallsState()
  const { setMergedDataState } = useMergedDataState()
  const { setExcelDataState } = useExcelDataState()
  const { setFileNamesState } = useFileNamesState()
  const { setTotalHallCapacityState } = useTotalHallCapacityState()
  const { setTotalStudentsState } = useTotalStudentsState()
  const router = useRouter()
  
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;
  
  const handleReset = () => {
    setHallPlansState([])
    setHallArrangementsState([])
    setHallAttendancesState([])
    setHallsState([])
    setMergedDataState([])
    setExcelDataState([])
    setFileNamesState([])
    setTotalHallCapacityState(0)
    setTotalStudentsState(0)
    toast.success("Cleared all data")
    router.refresh()
  }
  return (
    <Button onClick={handleReset} variant="outline" className="!border-[3px]">
      Reset
    </Button>
  )
}

export default ResetButton
