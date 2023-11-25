import { atom } from "recoil"

import { AttendanceSheet, HallPlan, HallPlanPerYear } from "@/lib/type"

export const HallPlansState = atom<HallPlanPerYear[]>({
  key: "HallPlansState",
  default: [],
})

export const HallPlanState = atom<HallPlan>({
  key: "HallPlanState",
  default: {
    section: "",
    hallno: "",
    totalStrength: 0,
    rollNo: {
      from: "",
      to: "",
    },
    year: "",
    semester: "",
    dept: "",
  },
})

export const HallArrangementPlansState = atom<HallPlanPerYear[]>({
  key: "HallArrangementPlansState",
  default: [],
})

export const HallArrangementState = atom<string[][]>({
  key: "HallArrangementState",
  default: [],
})

export const HallAttendancesState = atom<AttendanceSheet[]>({
  key: "HallAttendancesState",
  default: [],
})

export const HallAttendanceState = atom<string[][]>({
  key: "HallAttendanceState",
  default: [],
})
