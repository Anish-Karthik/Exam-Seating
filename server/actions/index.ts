"use server";

import path from "path";

import { writeFile } from "../../lib/fs";
import { generateAttendancePlanForHall } from "../attendance";
import { generateHallPlanForHall } from "../hallplan";
import { generateSeatingPlan } from "../seatplan";
import {
  AttendanceSheet,
  Hall,
  HallArrangementPlan,
  StudentsPerYear,
} from "../type";

const num = 3;
const localPath = path.join(process.cwd(), `test/data/data${num}`);

export const generateHallArrangement = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<HallArrangementPlan[]> => {
  const { hallArrangementPlans } = generateSeatingPlan(studentData, hallData);
  console.log(hallArrangementPlans);
  // Convert the array to JSON string
  const data = `export const hallArrangementPlans = ${JSON.stringify(
    hallArrangementPlans,
    null,
    2
  )};`;

  const inputData = `
import { Hall, StudentsPerYear } from "@/server/type";
export const studentData: StudentsPerYear[] = ${JSON.stringify(
    studentData,
    null,
    2
  )};
export const hallData: Hall[] = ${JSON.stringify(hallData, null, 2)};
  `;
  const indexData = `
import { studentData, hallData } from "./input";
import { hallArrangementPlans } from "./hall-arrangement";
import { hallPlans } from "./hall-plan";
import { attendanceSheet } from "./attendance-sheet"

export {
  studentData as studentData${num},
  hallData as hallData${num},
  hallArrangementPlans as hallArrangementPlans${num},
  hallPlans as hallPlans${num},
  attendanceSheet as attendanceSheet${num},
}
`;
  // await writeFile(path.join(localPath, "/index.ts"), indexData);
  // await writeFile(path.join(localPath, `/input.ts`), inputData);
  // await writeFile(path.join(localPath, `/hall-arrangement.ts`), data);

  return hallArrangementPlans;
};

export const generateHallPlan = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  const res = generateHallPlanForHall(studentData, hallData);
  const data = `export const hallPlans = ${JSON.stringify(res, null, 2)}`;
  // await writeFile(path.join(localPath, `/hall-plan.ts`), data);
  console.log(res);
  return res;
};

export const generateAttendaceSheet = async (
  studentData: StudentsPerYear[],
  hallData: Hall[]
): Promise<AttendanceSheet[]> => {
  const res = generateAttendancePlanForHall(studentData, hallData);
  const data = `export const attendanceSheet=${JSON.stringify(res, null, 2)}`;
  // await writeFile(path.join(localPath, `/attendance-sheet.ts`), data);
  console.log(res);
  return res;
};
