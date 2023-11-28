"use server"

import { generateSeatingPlan } from "@/server/seatplan"
import {
  AttendanceSheet,
  Hall,
  HallArrangementPlan,
  HallPlanPerYear,
  StudentsPerYear,
} from "@/server/type"

export const generateHallPlan = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<HallPlanPerYear[]> => {
  return []
}

export const generateHallArrangement = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<HallArrangementPlan[]> => {
  return generateSeatingPlan(studentData, hallData)
}

export const generateAttendaceSheet = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<AttendanceSheet[]> => {
  return []
}
