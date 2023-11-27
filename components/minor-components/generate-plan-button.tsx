import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useTotalHallCapacityState, useTotalStudentsState } from "@/store/hooks"

import { Button } from "../ui/button"

const GeneratePlanButton = () => {
  const totalStudents = useTotalStudentsState(
    (state) => state.totalStudentsState
  )
  const totalHallCapacity = useTotalHallCapacityState(
    (state) => state.totalHallCapacityState
  )
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;
  const isValid = () => {
    return !(
      totalHallCapacity === 0 ||
      totalStudents === 0 ||
      totalStudents > totalHallCapacity
    )
  }
  return (
    <Link href={"/display"}>
      <Button disabled={!isValid()}>Generate Plan</Button>
    </Link>
  )
}

export default GeneratePlanButton
