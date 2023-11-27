"use client"

import Link from "next/link"
import { useTotalHallCapacityState, useTotalStudentsState } from "@/store/hooks"
import {
  sampleArrangementPlans,
  sampleAttendancePlans,
  sampleHallPlans,
} from "@/test/sample-data"
import { ArrowLeft } from "lucide-react"

import {
  generateAttendaceSheet,
  generateHallArrangement,
  generateHallPlan,
} from "@/lib/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "../ui/button"
import DisplayPlan from "./display-plans"
import { useEffect, useState } from "react"

const DisplayPage = () => {
  const totalHallCapacity = useTotalHallCapacityState(
    (state) => state.totalHallCapacityState
  )
  const totalStudents = useTotalStudentsState(
    (state) => state.totalStudentsState
  )

  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;
  // const [tab, setTab] = useState<"plan" | "arrangement" | "attendance">("plan");
  return (
    <div className="form-group container flex flex-col gap-2 max-sm:min-h-screen max-sm:!p-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 max-md:flex-col">
          <Link href="/">
            <Button>
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            Total Hall Capacity: {totalHallCapacity}
          </h1>
          <h1 className="text-2xl font-bold">
            Total Students: {totalStudents}
          </h1>
        </div>
        {/* <div className="flex gap-6 max-md:flex-col">
          <Button onClick={() => setTab("plan")}>Hall Plan</Button>
          <Button onClick={() => setTab("arrangement")}>
            Hall Arrangement
          </Button>
          <Button onClick={() => setTab("attendance")}>Attendance</Button>
        </div> */}
      </div>
      <Tabs defaultValue="plan">
        <TabsList className="w-full">
          <TabsTrigger value="plan" className="w-full">
            Hall Plan
          </TabsTrigger>
          <TabsTrigger value="arrangement" className="w-full">
            Hall Arrangement
          </TabsTrigger>
          <TabsTrigger value="attendance" className="w-full">
            Attendance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          <DisplayPlan
            name="hallplan"
            generatePlan={generateHallPlan}
            sampledata={sampleHallPlans}
          />
        </TabsContent>
        <TabsContent value="arrangement">
          <DisplayPlan
            name="seatarrangement"
            generatePlan={generateHallArrangement}
            sampledata={sampleArrangementPlans}
          />
        </TabsContent>
        <TabsContent value="attendance">
          <DisplayPlan
            name="attendance"
            generatePlan={generateAttendaceSheet}
            sampledata={sampleAttendancePlans}
          />
        </TabsContent>
      </Tabs>

      {/* {tab === "plan" && <DisplayHallplan />}
      {tab === "arrangement" && <DisplayHallArrangement />}
      {tab === "attendance" && <DisplayHallAttendance />} */}
    </div>
  )
}

export default DisplayPage
