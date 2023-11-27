"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { HallPlansState } from "@/store/atoms"
import { useRecoilValue } from "recoil"

import HallPLanTable from "@/components/tables/hall-plan"

const Page = () => {
  const hallPlans = useRecoilValue(HallPlansState)
  const pathname = usePathname()
  const id = pathname.split("/").pop()
  const index = Number(id?.charAt(id.length - 1))
  return (
    <HallPLanTable data={hallPlans[index] || []} id={`hallplan${index}`} />
  )
}

export default Page
