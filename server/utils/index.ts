import { Hall, HallArrangementPlan, Seat } from "../type";

export function intialize(hallData: Hall[]) {
  const hallArrangementPlans: HallArrangementPlan[] = [];
  const hallArrangementPlansWithSemester: HallArrangementPlan[] = [];
  for (let index = 0; index < hallData.length; index++) {
    const table: Seat[][] = [];
    for (let j = 0; j < hallData[index].benches.rows; j++) {
      const row: Seat[] = [];
      for (let k = 0; k < hallData[index].benches.cols; k++) {
        row.push(hallData[index].studentsPerBench === 1 ? [""] : ["", ""]);
      }
      table.push(row);
    }
    // console.log(table)
    hallArrangementPlans.push({
      hallArrangement: table,
      hallStrength: hallData[index].studentsPerHall,
      hallno: hallData[index].hallno.toString(),
    });
    hallArrangementPlansWithSemester.push({
      hallArrangement: table.map((row) => row.map((seat) => [...seat])),
      hallStrength: hallData[index].studentsPerHall,
      hallno: hallData[index].hallno.toString(),
    });
  }
  return { hallArrangementPlans, hallArrangementPlansWithSemester };
}

export const mapYear = (year: number) => {
  switch (year) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    default:
      return "I";
  }
};

export const mapSemester = (semester: number) => {
  switch (semester) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    case 6:
      return "VI";
    case 7:
      return "VII";
    case 8:
      return "VIII";
    default:
      return "I";
  }
};
