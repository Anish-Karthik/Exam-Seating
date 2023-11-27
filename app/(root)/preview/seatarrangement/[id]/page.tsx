"use client"

import React from "react"
import { redirect, usePathname } from "next/navigation"
import { useHallArrangementsState } from "@/store/hooks"

import HallArrangementTable from "@/components/tables/hall-arrangement-plan"

const Page = () => {
  const { hallArrangementsState } = useHallArrangementsState()
  const pathname = usePathname()
  const id = pathname.split("/").pop()
  const index = Number(id?.charAt(id.length - 1))
  const hallArrangement = hallArrangementsState[index]
  if (!hallArrangement) {
    redirect("/404")
  }
  return <HallArrangementTable data={hallArrangement} id={index} />
}

export default Page
