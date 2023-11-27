"use client"

import React from "react"
import { redirect, usePathname } from "next/navigation"
import { useHallPlansState } from "@/store/hooks"

import HallPLanTable from "@/components/tables/hall-plan"

const Page = () => {
  const { hallPlansState } = useHallPlansState()
  const pathname = usePathname()
  const id = pathname.split("/").pop()
  const index = Number(id?.charAt(id.length - 1))
  const hallPlan = hallPlansState[index]
  if (!hallPlan) {
    redirect("/404")
  }
  return <HallPLanTable data={[]} id={index} />
}

export default Page
