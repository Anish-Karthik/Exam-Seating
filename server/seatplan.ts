import { Hall, StudentsPerYear } from "./type";
import { intialize, mapSemester, mapYear } from "./utils";

export const generateSeatingPlan = (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  // console.log(hallData)
  const totalStudents = studentData.reduce(
    (acc, curr) => acc + curr.strength,
    0
  );
  let check = 0;
  let studentCount = 0;
  let overallStudentCount = 0;
  let studentArrayIndex = 0;
  let hallIndex = 0;
  let seatvalue = "";
  let studentStrength = studentData[studentArrayIndex].strength;
  let hallLength = hallData.length;

  const { hallArrangementPlans, hallArrangementPlansWithSemester } =
    intialize(hallData);

  while (overallStudentCount < totalStudents) {
    let studentCountPerHall = 0;
    if (hallData[hallIndex].isInterchange === true) {
      // Handle interchange logic
    } else if (hallData[hallIndex].studentsPerBench === 2) {
      if (hallData[hallIndex].isSameYearPerBenchAllowed === true) {
        for (let j = 0; j < hallData[hallIndex].benches.cols; j++) {
          for (let ind = 0; ind < 2; ind++) {
            for (let k = 0; k < hallData[hallIndex].benches.rows; k++) {
              if (studentCountPerHall === hallData[hallIndex].studentsPerHall) {
                continue;
              }
              const year = mapYear(studentData[studentArrayIndex].year);
              const semester = mapSemester(
                studentData[studentArrayIndex].semester
              );
              const dept = studentData[studentArrayIndex].dept;
              const regNo =
                studentData[studentArrayIndex].studentData[studentCount].regno;
              const name =
                studentData[studentArrayIndex].studentData[studentCount].name;
              // console.log(studentCount,studentData[studentArrayIndex].studentData[studentCount])
              const currentSection =
                studentData[studentArrayIndex].studentData[studentCount]
                  .section;
              const serielno =
                studentData[studentArrayIndex].studentData[studentCount].rollno;
              seatvalue = year + "-" + currentSection + `(${serielno})`;
              hallArrangementPlans[hallIndex].hallArrangement[k][j][ind] =
                seatvalue;
              hallArrangementPlansWithSemester[hallIndex].hallArrangement[k][j][
                ind
              ] =
                seatvalue +
                "-" +
                semester +
                "-" +
                dept +
                "-" +
                regNo +
                "-" +
                name;
              //console.log(hallArrangementPlans[hallIndex].hallArrangement)
              studentCount++;
              studentCountPerHall++;
              overallStudentCount++;
              console.log(overallStudentCount, totalStudents);
              if (overallStudentCount === totalStudents) {
                return {
                  hallArrangementPlans,
                  hallArrangementPlansWithSemester,
                };
              }
              if (studentCount === studentStrength) {
                studentArrayIndex++;
                studentCount = 0;
                studentStrength = studentData[studentArrayIndex].strength;
              }
            }
          }
        }

        hallIndex++;
        if (hallIndex === hallLength) {
          hallIndex = 0;
        }
      } else {
        // Handle other logic for two students per bench
      }
    } else {
      for (let j = 0; j < hallData[hallIndex].benches.cols; j++) {
        for (let k = 0; k < hallData[hallIndex].benches.rows; k++) {
          if (studentCountPerHall === hallData[hallIndex].studentsPerHall) {
            continue;
          }
          const year = mapYear(studentData[studentArrayIndex].year);
          const semester = mapSemester(studentData[studentArrayIndex].semester);
          const dept = studentData[studentArrayIndex].dept;
          const regNo =
            studentData[studentArrayIndex].studentData[studentCount].regno;
          const name =
            studentData[studentArrayIndex].studentData[studentCount].name;
          const currentSection =
            studentData[studentArrayIndex].studentData[studentCount].section;
          const serielno =
            studentData[studentArrayIndex].studentData[studentCount].rollno;
          seatvalue = year + "-" + currentSection + `(${serielno})`;
          hallArrangementPlans[hallIndex].hallArrangement[k][j][0] = seatvalue;
          hallArrangementPlansWithSemester[hallIndex].hallArrangement[k][j][0] =
            seatvalue + "-" + semester + "-" + dept + "-" + regNo + "-" + name;
          studentCount++;
          overallStudentCount++;
          studentCountPerHall++;
          if (overallStudentCount === totalStudents) {
            return { hallArrangementPlans, hallArrangementPlansWithSemester };
          }
          if (studentCount === studentStrength) {
            studentArrayIndex++;
            studentCount = 0;
            studentStrength = studentData[studentArrayIndex].strength;
          }
        }
      }
      console.log(hallArrangementPlans[hallIndex].hallArrangement);
      hallIndex++;
      if (hallIndex === hallLength) {
        hallIndex = 0;
      }
    }
  }
  return { hallArrangementPlans, hallArrangementPlansWithSemester };
};
// console.log(generateSeatingPlan(studentData, hallData))
