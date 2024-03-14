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
    //intialize map,,mm,

    if (!istwoperbench) {
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (hall[j][i][0] === "") {
            continue;
          }
          const { year, dept } = extractDataFromRollno(hall[j][i][0]);
          const key = year + dept;
          if (!mapPlanPerYear.has(key)) {
            mapPlanPerYear.set(key, []);
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
            const { year, dept } = extractDataFromRollno(hall[k][j][ind]);
            const key = year + dept;
            if (!mapPlanPerYear.has(key)) {
              mapPlanPerYear.set(key, []);
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
  // grouped the data based on year,dept,section,hallno
  const { hallArrangementPlansWithSemester: seatPlan } = generateSeatingPlan(
    studentData,
    hallData
  );
  let hallPlan: HallPlanPerYear[] = [];
  const { mapPlanPerYear } = intializeHallplan(seatPlan);
  for (let hallCount = 0; hallCount < seatPlan.length; hallCount++) {
    const { hallArrangement: hall, hallStrength, hallno } = seatPlan[hallCount];
    const [row, col] = [hall.length, hall[0].length];
    const istwoperbench = hallData[hallCount].studentsPerBench === 2;
    const mapPlanPerYeardept = new Map<string, (string | number)[]>();

    if (!istwoperbench) {
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (hall[j][i][0] === "") {
            continue;
          }
          const { year, dept, section, rollNo, semester } =
            extractDataFromRollno(hall[j][i][0]);
          const key = year + dept + section + hallno;
          if (!mapPlanPerYeardept.has(key)) {
            mapPlanPerYeardept.set(key, [rollNo, rollNo, semester]);
          } else {
            let v = mapPlanPerYeardept.get(key);
            if (v) mapPlanPerYeardept.set(key, [v[0], rollNo, semester]);
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
            const { year, dept, section, rollNo, semester } =
              extractDataFromRollno(hall[k][j][ind]);
            const key = year + dept + section + hallno;
            if (!mapPlanPerYeardept.has(key)) {
              mapPlanPerYeardept.set(key, [rollNo, rollNo, semester]);
            } else {
              let v = mapPlanPerYeardept.get(key);
              if (v) mapPlanPerYeardept.set(key, [v[0], rollNo, semester]);
            }
          }
        }
      }
      mapPlanPerYeardept.forEach((value, key) => {
        if (value.length > 0) {
          //extract data from key
          console.log("key", key);
          const year = key.slice(0, 1);
          const dept = key.slice(1, 2);
          const section = key.slice(2, 3);
          const hallno = key.slice(3, 4);
          const totalStrength = value.length;
          const rollNo = {
            from: value[0],
            to: value[1],
          };
          const semester = value[2];
          mapPlanPerYear.get(year + dept)?.push({
            section: section,
            hallno: hallno.toString(),
            totalStrength: hallStrength,
            rollNo: {
              from: rollNo.from.toString(),
              to: rollNo.to.toString(),
            },
            year: year,
            semester: mapSemester(Number(semester))!,
            dept: dept!,
          });
        }
      });
    }
  }
  const hallPlanArray: HallPlanPerYear[] = [];
  const mapPlanPerYearArray = Array.from(mapPlanPerYear);
  for (const [key, value] of mapPlanPerYearArray) {
    if (value.length > 0) {
      hallPlanArray.push(value);
    }
  }
  return hallPlanArray;
};
