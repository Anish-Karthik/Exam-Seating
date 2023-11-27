import {
  AttendanceSheet,
  HallArrangementPlan,
  HallPlan,
  HallPlanPerYear,
} from "@/server/type"
import { atom } from "recoil"

export const HallPlansState = atom<HallPlanPerYear[]>({
  key: "HallPlansState",
  default: [],
})

export const HallArrangementPlansState = atom<HallArrangementPlan[]>({
  key: "HallArrangementPlansState",
  default: [],
})

export const HallAttendancesState = atom<AttendanceSheet[]>({
  key: "HallAttendancesState",
  default: [],
})
