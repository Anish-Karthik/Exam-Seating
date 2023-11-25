"use server"

import {
  AttendanceSheet,
  Hall,
  HallArrangementPlan,
  HallPlanPerYear,
  StudentsPerYear,
} from "../type"

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
  return []
}

export const generateAttendaceSheet = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<AttendanceSheet[]> => {
  return []
}
