"use server";

import { generateAttendancePlanForHall } from "@/server/attendance";
import { groupData } from "@/server/customizeinputData";
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
  const modifiedStudentData = groupData(studentData);
  console.log(
    "modifiedStudentData",
    modifiedStudentData,
    modifiedStudentData.length
  );

  //sort the hall data bassed in hall no
  hallData.sort((a, b) => {
    return a.hallno.localeCompare(b.hallno);
  });

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
  hallData.sort((a, b) => {
    return a.hallno.localeCompare(b.hallno);
  });
  return generateHallPlanForHall(studentData, hallData);
};

export const generateAttendaceSheet = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<AttendanceSheet[]> => {
  hallData.sort((a, b) => {
    return a.hallno.localeCompare(b.hallno);
  });
  return generateAttendancePlanForHall(studentData, hallData);
};
