"use client"

import React from "react"
import { redirect, usePathname } from "next/navigation"
import { useHallAttendancesState } from "@/store/hooks"

import AttendanceTable from "@/components/tables/hall-attendance-plan"

const Page = () => {
  const { hallAttendancesState } = useHallAttendancesState()
  const pathname = usePathname()
  const id = pathname.split("/").pop()
  const index = Number(id?.charAt(id.length - 1))
  const hallAttendance = hallAttendancesState[index]
  if (!hallAttendance) {
    redirect("/404")
  }
  return <AttendanceTable data={hallAttendance} id={index} />
}

export default Page
