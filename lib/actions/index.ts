"use server";

import { generateAttendancePlanForHall } from "@/server/attendance";
import { generateHallPlanForHall } from "@/server/hallplan";
import { generateSeatingPlan } from "@/server/seatplan";
import {
  AttendanceSheet,
  Hall,
  HallArrangementPlan,
  HallPlanPerYear,
  StudentsPerYear,
} from "@/server/type";

export const generateHallArrangement = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<HallArrangementPlan[]> => {
  const { hallArrangementPlans, hallArrangementPlansWithSemester } =
    generateSeatingPlan(studentData, hallData);
  console.log("check", hallArrangementPlans);
  console.log("check", hallArrangementPlansWithSemester);
  return hallArrangementPlans;
};
export const generateHallPlan = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<HallPlanPerYear[]> => {
  return generateHallPlanForHall(studentData, hallData);
};

export const generateAttendaceSheet = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<AttendanceSheet[]> => {
  return generateAttendancePlanForHall(studentData, hallData);
};
