import { hallData, mapSemester, mapYear, studentData } from "./data";
import { generateSeatingPlan } from "./seatplan";
import { Hall, HallPlanPerYear, StudentsPerYear, HallArrangementPlan, AttendanceSheet, AttendanceStudent } from "./type";
import { extractDataFromRollno } from "./hallplan";

export const generateAttendancePlanForHall = (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  const { hallArrangementPlansWithSemester: seatPlan } = generateSeatingPlan(studentData, hallData);

  let attendancePlan: AttendanceSheet[] = [];

  for (let hallCount = 0; hallCount < seatPlan.length; hallCount++) {
    const { hallArrangement: hall, hallStrength, hallno } = seatPlan[hallCount];
    const [row, col] = [hall.length, hall[0].length];
    const isTwoPerBench = hallData[hallCount].studentsPerBench === 2;
    const studentData: AttendanceStudent[] = [];
    let sno = 0;

    if (!isTwoPerBench) {
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (hall[j][i][0]) {
            const { name, section, regNo } = extractDataFromRollno(hall[j][i][0]);
            sno++;
            studentData.push({ sno: sno, name: name, section: section, regno: regNo });
          }
        }
      }
      attendancePlan.push({ hallno: hallno,  studentData: studentData });
    } else {
      for (let j = 0; j < col; j++) {
        for (let ind = 0; ind < 2; ind++) {
          for (let k = 0; k < row; k++) {
            if (hall[k][j][ind]) {
            const { name, section, regNo } = extractDataFromRollno(hall[k][j][ind]);
            sno++;
            studentData.push({ sno: sno, name: name, section: section, regno: regNo });
          }
          }
        }
      }
      attendancePlan.push({ hallno: hallno,  studentData: studentData });
    }
  }
  return attendancePlan;
};
