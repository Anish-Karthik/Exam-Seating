import {
  AttendanceSheet,
  HallArrangementPlan,
  HallPlan,
  HallPlanPerYear,
} from "@/server/type"
import { create, StoreApi, UseBoundStore } from "zustand"
import { combine, devtools, persist } from "zustand/middleware"

interface HallPlansState {
  hallPlansState: HallPlanPerYear[]
  setHallPlansState: (hallPlans: HallPlanPerYear[]) => void
}
interface HallArrangementsState {
  hallArrangementsState: HallArrangementPlan[]
  setHallArrangementsState: (hallArrangements: HallArrangementPlan[]) => void
}

interface HallAttendancesState {
  hallAttendancesState: AttendanceSheet[]
  setHallAttendancesState: (hallAttendances: AttendanceSheet[]) => void
}

export const useHallPlansState = create<HallPlansState>()(
  devtools(
    persist(
      (set) => ({
        hallPlansState: [],
        setHallPlansState: (hallPlans: HallPlanPerYear[]) =>
          set({ hallPlansState: hallPlans }),
      }),
      { name: "hallPlansState" }
    )
  )
)

export const useHallArrangementsState = create<HallArrangementsState>()(
  devtools(
    persist(
      (set) => ({
        hallArrangementsState: [],
        setHallArrangementsState: (hallArrangements: HallArrangementPlan[]) =>
          set({ hallArrangementsState: hallArrangements }),
      }),
      { name: "hallArrangementsState" }
    )
  )
)

export const useHallAttendancesState = create<HallAttendancesState>()(
  devtools(
    persist(
      (set) => ({
        hallAttendancesState: [],
        setHallAttendancesState: (hallAttendances: AttendanceSheet[]) =>
          set({ hallAttendancesState: hallAttendances }),
      }),
      { name: "hallAttendancesState" }
    )
  )
)
