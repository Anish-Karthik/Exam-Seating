import { waitForAllSettled } from "recoil";

import { groupData } from "./customizeinputData";
import { hallData, mapSemester, mapYear, studentData } from "./data";
import { Hall, HallArrangementPlan, Seat, StudentsPerYear } from "./type";
import { intialize } from "./utils";

export const generateSeatingPlan = (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  const totalStudents = studentData.reduce(
    (acc, curr) => acc + curr.strength,
    0
  );

  const groupedData = groupData(studentData);

  if (groupedData.length == 1) {
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
                if (
                  studentCountPerHall === hallData[hallIndex].studentsPerHall
                ) {
                  continue;
                }
                const year = mapYear(studentData[studentArrayIndex].year);
                const semester = mapSemester(
                  studentData[studentArrayIndex].semester
                );
                const dept = studentData[studentArrayIndex].dept;
                const regNo =
                  studentData[studentArrayIndex].studentData[studentCount]
                    .regno;
                const name =
                  studentData[studentArrayIndex].studentData[studentCount].name;
                // console.log(studentCount,studentData[studentArrayIndex].studentData[studentCount])
                const currentSection =
                  studentData[studentArrayIndex].studentData[studentCount]
                    .section;
                const serielno =
                  studentData[studentArrayIndex].studentData[studentCount].sno;
                seatvalue = year + "-" + currentSection + `(${serielno})`;
                hallArrangementPlans[hallIndex].hallArrangement[k][j][ind] =
                  seatvalue;
                hallArrangementPlansWithSemester[hallIndex].hallArrangement[k][
                  j
                ][ind] =
                  seatvalue +
                  "-" +
                  semester +
                  "-" +
                  dept +
                  "-" +
                  regNo +
                  "-" +
                  name;
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
            const semester = mapSemester(
              studentData[studentArrayIndex].semester
            );
            const dept = studentData[studentArrayIndex].dept;
            const regNo =
              studentData[studentArrayIndex].studentData[studentCount].regno;
            const name =
              studentData[studentArrayIndex].studentData[studentCount].name;
            const currentSection =
              studentData[studentArrayIndex].studentData[studentCount].section;
            const serielno =
              studentData[studentArrayIndex].studentData[studentCount].sno;
            seatvalue = year + "-" + currentSection + `(${serielno})`;
            hallArrangementPlans[hallIndex].hallArrangement[k][j][0] =
              seatvalue;
            hallArrangementPlansWithSemester[hallIndex].hallArrangement[k][
              j
            ][0] =
              seatvalue +
              "-" +
              semester +
              "-" +
              dept +
              "-" +
              regNo +
              "-" +
              name;
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
  } else {
    let studentCount = 0;
    let overallStudentCount = 0;
    let studentFirstArrayIndex = 0;
    let studentSecondArrayIndex = 1;
    let studentFirstCount = 0;
    let studentSecondCount = 0;
    let hallIndex = 0;
    let seatvalue = "";
    let studentFirstStrength = groupedData[0][0].studentData.length;
    let studentSecondStrength = groupedData[0][0].studentData.length;
    let hallLength = hallData.length;

    const { hallArrangementPlans, hallArrangementPlansWithSemester } =
      intialize(hallData);
    let toggleIndex = 0;
    // let studentIterateIndex=0
    while (overallStudentCount < totalStudents) {
      let studentCountPerHall = 0;
      if (hallData[hallIndex].isInterchange === true) {
        // Handle interchange logic
      } else if (hallData[hallIndex].studentsPerBench === 2) {
        if (hallData[hallIndex].isSameYearPerBenchAllowed === true || false) {
          for (let j = 0; j < hallData[hallIndex].benches.cols; j++) {
            for (let ind = 0; ind < 2; ind++) {
              for (let k = 0; k < hallData[hallIndex].benches.rows; k++) {
                if (
                  studentCountPerHall === hallData[hallIndex].studentsPerHall
                ) {
                  continue;
                }
                toggleIndex =
                  ind % 2 ? studentSecondArrayIndex : studentFirstArrayIndex;
                let studentIterateIndex =
                  ind % 2 ? studentSecondCount : studentFirstCount;
                let studentCountIndex =
                  ind % 2 ? "studentSecondCount" : "studentFirstCount";
                const year = mapYear(groupedData[toggleIndex][0].year);
                const semester = mapSemester(
                  groupedData[toggleIndex][0].semester
                );
                const dept = groupedData[toggleIndex][0].dept;
                const regNo =
                  groupedData[toggleIndex][0].studentData[studentIterateIndex]
                    .regno;
                const name =
                  groupedData[toggleIndex][0].studentData[studentIterateIndex]
                    .name;
                const currentSection =
                  groupedData[toggleIndex][0].studentData[studentIterateIndex]
                    .section;
                const serielno =
                  groupedData[toggleIndex][0].studentData[studentIterateIndex]
                    .sno;
                seatvalue = year + "-" + currentSection + `(${serielno})`;
                hallArrangementPlans[hallIndex].hallArrangement[k][j][ind] =
                  seatvalue;
                hallArrangementPlansWithSemester[hallIndex].hallArrangement[k][
                  j
                ][ind] =
                  seatvalue +
                  "-" +
                  semester +
                  "-" +
                  dept +
                  "-" +
                  regNo +
                  "-" +
                  name;

                studentCount++;
                studentCountIndex == "studentSecondCount"
                  ? studentSecondCount++
                  : studentFirstCount++;
                studentCountPerHall++;
                overallStudentCount++;
                // console.log(overallStudentCount, totalStudents);

                if (overallStudentCount === totalStudents) {
                  return {
                    hallArrangementPlans,
                    hallArrangementPlansWithSemester,
                  };
                }

                if (studentFirstCount === studentFirstStrength) {
                  if (toggleIndex + 2 < groupedData.length) {
                    toggleIndex += 2;
                  } else {
                    toggleIndex += 1;
                  }
                  studentFirstCount = 0;
                  studentFirstStrength = groupedData[toggleIndex][0].strength;
                }

                if (studentSecondCount === studentSecondStrength) {
                  if (toggleIndex + 2 < groupedData.length) {
                    toggleIndex += 2;
                  } else {
                    toggleIndex -= 1;
                  }
                  studentSecondCount = 0;
                  studentSecondStrength = groupedData[toggleIndex][0].strength;
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
            const year = mapYear(groupedData[studentFirstArrayIndex][0].year);
            const semester = mapSemester(
              groupedData[studentFirstArrayIndex][0].semester
            );

            const dept = groupedData[studentFirstArrayIndex][0].dept;
            const regNo =
              groupedData[studentFirstArrayIndex][0].studentData[
                studentFirstCount
              ].regno;
            const name =
              groupedData[studentFirstArrayIndex][0].studentData[
                studentFirstCount
              ].name;
            const currentSection =
              groupedData[studentFirstArrayIndex][0].studentData[
                studentFirstCount
              ].section;
            const serielno =
              groupedData[studentFirstArrayIndex][0].studentData[
                studentFirstCount
              ].sno;
            seatvalue = year + "-" + currentSection + `(${serielno})`;
            hallArrangementPlans[hallIndex].hallArrangement[k][j][0] =
              seatvalue;
            hallArrangementPlansWithSemester[hallIndex].hallArrangement[k][
              j
            ][0] =
              seatvalue +
              "-" +
              semester +
              "-" +
              dept +
              "-" +
              regNo +
              "-" +
              name;
            studentCount++;
            overallStudentCount++;
            studentCountPerHall++;
            if (overallStudentCount === totalStudents) {
              return { hallArrangementPlans, hallArrangementPlansWithSemester };
            }
            if (studentCount === studentFirstStrength) {
              studentFirstArrayIndex++;
              studentCount = 0;
              studentFirstStrength =
                groupedData[studentFirstArrayIndex][0].strength;
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
  }
};
