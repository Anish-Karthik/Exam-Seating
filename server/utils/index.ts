import { Hall, HallArrangementPlan, Seat } from "../type"

export function intialize(hallData: Hall[]) {
  const hallArrangementPlans: HallArrangementPlan[] = []
  const hallArrangementPlansWithSemester: HallArrangementPlan[] = []
  for (let index = 0; index < hallData.length; index++) {
    const table: Seat[][] = []
    for (let j = 0; j < hallData[index].benches.rows; j++) {
      const row: Seat[] = []
      for (let k = 0; k < hallData[index].benches.cols; k++) {
        row.push(hallData[index].studentsPerBench === 1 ? [""] : ["", ""])
      }
      table.push(row)
    }
    // console.log(table)
    hallArrangementPlans.push({
      hallArrangement: table,
      hallStrength: hallData[index].studentsPerHall,
      hallno: hallData[index].hallno.toString(),
    })
    hallArrangementPlansWithSemester.push({
      hallArrangement: table.map((row) => row.map((seat) => [...seat])) ,
      hallStrength: hallData[index].studentsPerHall,
      hallno: hallData[index].hallno.toString(),
    })
  }
  return { hallArrangementPlans, hallArrangementPlansWithSemester }
}
