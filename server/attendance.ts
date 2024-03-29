import { extractDataFromRollno } from "./hallplan";
import { generateSeatingPlan } from "./seatplan";
import { AttendanceSheet, Hall, Student, StudentsPerYear } from "./type";

export const generateAttendancePlanForHall = (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  const { hallArrangementPlansWithSemester: seatPlan } = generateSeatingPlan(
    studentData,
    hallData
  );

  let attendancePlan: AttendanceSheet[] = [];

  for (let hallCount = 0; hallCount < seatPlan.length; hallCount++) {
    const { hallArrangement: hall, hallStrength, hallno } = seatPlan[hallCount];
    const [row, col] = [hall.length, hall[0].length];
    const isTwoPerBench = hallData[hallCount].studentsPerBench === 2;
    const studentData: Student[] = [];
    let sno = 0;

    if (!isTwoPerBench) {
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (hall[j][i][0]) {
            const { name, section, regNo, vertical } = extractDataFromRollno(
              hall[j][i][0]
            );
            sno++;
            studentData.push({
              sno: sno,
              name: name,
              section: section,
              regno: regNo,
              rollno: hall[j][i][0],
              vertical: vertical,
            });
          }
        }
      }
      attendancePlan.push({ hallno: hallno, studentData: studentData });
    } else {
      for (let j = 0; j < col; j++) {
        for (let ind = 0; ind < 2; ind++) {
          for (let k = 0; k < row; k++) {
            if (hall[k][j][ind]) {
              const { name, section, regNo, vertical } = extractDataFromRollno(
                hall[k][j][ind]
              );
              sno++;
              studentData.push({
                sno: sno,
                name: name,
                section: section,
                regno: regNo,
                rollno: hall[k][j][ind],
                vertical: vertical,
              });
            }
          }
        }
      }
      attendancePlan.push({ hallno: hallno, studentData: studentData });
    }
  }
  return attendancePlan;
};
