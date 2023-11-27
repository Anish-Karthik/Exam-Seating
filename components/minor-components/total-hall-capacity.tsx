import React, { useEffect, useState } from "react"
import { useTotalHallCapacityState } from "@/store/hooks"

const TotalHallCapacity = () => {
  const totalHallCapacity = useTotalHallCapacityState(
    (state) => state.totalHallCapacityState
  )
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;
  return (
    <h1 className="text-2xl font-bold">
      Total Hall Capacity: {totalHallCapacity}
    </h1>
  )
}

export default TotalHallCapacity
