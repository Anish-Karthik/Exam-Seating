import { hallData, mapSemester, mapYear, studentData } from "./data";
import { generateSeatingPlan } from "./seatplan";
import {
  Hall,
  HallArrangementPlan,
  HallPlanPerYear,
  StudentsPerYear,
} from "./type";
import { intialize } from "./utils";

const totalStudents = studentData.reduce((acc, curr) => acc + curr.strength, 0);

export const extractDataFromRollno = (data: string) => {
  if (!data)
    return {
      year: "",
      section: "",
      rollNo: 0,
      semester: "",
      dept: "",
      regNo: 0,
      name: "",
    };
  const dataExtract = data.split("-");
  const year = dataExtract[0];
  const section = dataExtract[1].split("(")[0];
  const rollNo = Number(dataExtract[1].split("(")[1].split(")")[0]);
  const semester = dataExtract[dataExtract.length - 4];
  const dept = dataExtract[dataExtract.length - 3];
  const regNo = Number(dataExtract[dataExtract.length - 2]);
  const name = dataExtract[dataExtract.length - 1];

  return { year, section, rollNo, semester, dept, regNo, name };
};

function intializeHallplan(seatPlan: HallArrangementPlan[]) {
  const mapPlanPerYear = new Map<string, HallPlanPerYear>();
  for (let hallCount = 0; hallCount < seatPlan.length; hallCount++) {
    const { hallArrangement: hall } = seatPlan[hallCount];
    const [row, col] = [hall.length, hall[0].length];
    const istwoperbench = hallData[hallCount].studentsPerBench === 2;
    //intialize map

    if (!istwoperbench) {
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (hall[j][i][0] === "") {
            continue;
          }
          const { year } = extractDataFromRollno(hall[j][i][0]);
          if (!mapPlanPerYear.has(year)) {
            mapPlanPerYear.set(year, []);
          }
        }
      }
    } else {
      for (let j = 0; j < col; j++) {
        for (let ind = 0; ind < 2; ind++) {
          for (let k = 0; k < row; k++) {
            if (hall[k][j][ind] === "") {
              continue;
            }
            const { year } = extractDataFromRollno(hall[k][j][ind]);
            if (!mapPlanPerYear.has(year)) {
              mapPlanPerYear.set(year, []);
            }
          }
        }
      }
    }
  }
  return { mapPlanPerYear };
}

export const generateHallPlanForHall = (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  const { hallArrangementPlansWithSemester: seatPlan } = generateSeatingPlan(
    studentData,
    hallData
  );
  // create a map for year y traversing a section

  let hallPlan: HallPlanPerYear[] = [];

  const { mapPlanPerYear } = intializeHallplan(seatPlan);

  console.log(mapPlanPerYear);
  for (let hallCount = 0; hallCount < seatPlan.length; hallCount++) {
    const { hallArrangement: hall, hallStrength, hallno } = seatPlan[hallCount];
    const [row, col] = [hall.length, hall[0].length];
    let {
      rollNo: startRollNo,
      section: prevSec,
      year: prevYear,
    } = extractDataFromRollno(hall[0][0][0]);
    // const endRollno='0'

    const istwoperbench = hallData[hallCount].studentsPerBench === 2;

    if (!istwoperbench) {
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          const { year, section, rollNo, semester, dept } =
            extractDataFromRollno(hall[j][i][0]);
          let { rollNo: endRollno } = extractDataFromRollno(hall[j][i][0]);
          if (j != 0 || i != 0) {
            if (j == 0) {
              endRollno = extractDataFromRollno(hall[j][i - 1][0]).rollNo;
            } else {
              endRollno = extractDataFromRollno(hall[j - 1][i][0]).rollNo;
            }
          }
          if (prevSec != section || prevYear != year) {
            mapPlanPerYear.get(prevYear)?.push({
              section: prevSec,
              hallno: hallno.toString(),
              totalStrength: hallStrength,
              rollNo: {
                from: startRollNo.toString(),
                to: endRollno.toString(),
              },
              year: prevYear,
              semester: mapSemester(Number(semester))!,
              dept: dept!,
            });
            startRollNo = rollNo;
            prevSec = section;
            prevYear = year;
          } else {
            if (hall[j][i][0]!) {
              endRollno = extractDataFromRollno(hall[j][i][0]).rollNo;
            }
            if (i == col - 1 && j == row - 1 && hall[j][i][0] !== "") {
              mapPlanPerYear.get(prevYear)?.push({
                section: prevSec,
                hallno: hallno.toString(),
                totalStrength: hallStrength,
                rollNo: {
                  from: startRollNo.toString(),
                  to: endRollno.toString(),
                },
                year: prevYear,
                semester: mapSemester(Number(semester))!,
                dept: dept!,
              });
            }
          }
        }
      }
    } else {
      for (let j = 0; j < col; j++) {
        for (let ind = 0; ind < 2; ind++) {
          for (let k = 0; k < row; k++) {
            const { year, section, rollNo, semester, dept } =
              extractDataFromRollno(hall[k][j][ind]);
            let { rollNo: endRollno } = extractDataFromRollno(hall[k][j][ind]);
            if (k != 0 || j != 0) {
              let c = ind === 0 ? 1 : 0;
              let cj = ind === 1 ? j : j - 1;
              if (k == 0) {
                endRollno = extractDataFromRollno(hall[row - 1][cj][c]).rollNo;
              } else {
                endRollno = extractDataFromRollno(hall[k - 1][j][ind]).rollNo;
              }
            }

            if (prevSec != section || prevYear != year) {
              console.log("check", prevSec, section, prevYear, year);
              mapPlanPerYear.get(prevYear)?.push({
                section: prevSec,
                hallno: hallno.toString(),
                totalStrength: hallStrength,
                rollNo: {
                  from: startRollNo.toString(),
                  to: endRollno.toString(),
                  // to: (rollNo - 1).toString(),
                },
                year: prevYear,
                semester: mapSemester(Number(semester))!,
                dept: dept,
              });
              startRollNo = rollNo;
              prevSec = section;
              prevYear = year;
            } else {
              if (hall[k][j][ind]) {
                endRollno = extractDataFromRollno(hall[k][j][ind]).rollNo;
              }
              if (
                j == col - 1 &&
                k == row - 1 &&
                ind == 1 &&
                hall[k][j][ind] !== ""
              ) {
                mapPlanPerYear.get(prevYear)?.push({
                  section: prevSec,
                  hallno: hallno.toString(),
                  totalStrength: hallStrength,
                  rollNo: {
                    from: startRollNo.toString(),
                    to: endRollno.toString(),
                  },
                  year: prevYear,
                  semester: mapSemester(Number(semester))!,
                  dept: dept,
                });
              }
            }
          }
        }
      }
    }
  }
  const hallPlanArray: HallPlanPerYear[] = [];

  mapPlanPerYear.forEach((value, key) => {
    if (value.length > 0) {
      hallPlanArray.push(value);
    }
  });

  return hallPlanArray;
};
