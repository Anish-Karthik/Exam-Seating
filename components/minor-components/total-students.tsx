import React, { useEffect, useState } from "react"
import { useTotalStudentsState } from "@/store/hooks"

const TotalStudents = () => {
  const totalStudents = useTotalStudentsState(
    (state) => state.totalStudentsState
  )
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;
  return <h1 className="text-2xl font-bold">Total Students: {totalStudents}</h1>
}

export default TotalStudents
