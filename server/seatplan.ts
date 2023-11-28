import { hallData, mapYear, studentData } from "./data"
import { Hall, HallArrangementPlan, Seat, StudentsPerYear } from "./type"

export const generateSeatingPlan = (
  studentData: StudentsPerYear[],
  hallData: Hall[]
) => {
  // console.log(studentData)
  // console.log(hallData)
  const totalStudents = studentData.reduce(
    (acc, curr) => acc + curr.strength,
    0
  )
  let check = 0
  let studentCount = 0
  let overallStudentCount = 0
  let studentArrayIndex = 0
  let hallIndex = 0
  let seatvalue = ""
  let studentStrength = studentData[studentArrayIndex].strength
  for (let i = 0; i < studentStrength; i++) {
    // console.log(studentData[studentArrayIndex].studentData[i])
  }
  let res: any[][][] = []
  let hallLength = hallData.length
  let i = 0
  let hallArrangementPlans: HallArrangementPlan[] = []

  for (let index = 0; index < hallLength; index++) {
    let table: Seat[][] = []
    for (let j = 0; j < hallData[index].benches.rows; j++) {
      let row: Seat[] = []
      for (let k = 0; k < hallData[index].benches.cols; k++) {
        row.push(hallData[index].studentsPerBench === 1 ? [""] : ["", ""])
      }
      table.push(row)
    }
    // console.log(table)
    res.push(table)
    hallArrangementPlans.push({
      hallArrangement: table,
      hallStrength: hallData[index].studentsPerHall,
      hallno: hallData[index].hallno.toString(),
    })
  }

  while (overallStudentCount < totalStudents) {
    if (hallData[hallIndex].isInterchange === true) {
      // Handle interchange logic
    } else if (hallData[hallIndex].studentsPerBench === 2) {
      if (hallData[hallIndex].isSameYearPerBenchAllowed === true) {
        for (let j = 0; j < hallData[hallIndex].benches.cols; j++) {
          for (let ind = 0; ind < 2; ind++) {
            for (let k = 0; k < hallData[hallIndex].benches.rows; k++) {
              const year = mapYear(studentData[studentArrayIndex].year)
              console.log(studentCount)
              if (hallIndex > 0) {
                console.log(studentCount, hallIndex)
              }
              // console.log(studentCount,studentData[studentArrayIndex].studentData[studentCount])
              const currentSection =
                studentData[studentArrayIndex].studentData[studentCount].section
              const serielno =
                studentData[studentArrayIndex].studentData[studentCount].sno
              seatvalue = year + "-" + currentSection + `(${serielno})`
              hallArrangementPlans[hallIndex].hallArrangement[k][j][ind] =
                seatvalue
              //console.log(hallArrangementPlans[hallIndex].hallArrangement)
              studentCount++
              overallStudentCount++
              console.log(overallStudentCount, totalStudents)
              if (overallStudentCount === totalStudents) {
                return hallArrangementPlans
              }
              if (studentCount === studentStrength) {
                studentArrayIndex++
                studentCount = 0
                studentStrength = studentData[studentArrayIndex].strength
              }
            }
          }
        }
        console.log(studentCount, hallIndex)
        console.log(hallArrangementPlans[hallIndex].hallArrangement)
        hallIndex++
        if (hallIndex === hallLength) {
          hallIndex = 0
        }
      } else {
        // Handle other logic for two students per bench
      }
    } else {
      for (let j = 0; j < hallData[hallIndex].benches.cols; j++) {
        for (let k = 0; k < hallData[hallIndex].benches.rows; k++) {
          const year = mapYear(studentData[studentArrayIndex].year)
          const currentSection =
            studentData[studentArrayIndex].studentData[studentCount].section
          const serielno =
            studentData[studentArrayIndex].studentData[studentCount].sno
          seatvalue = year + "-" + currentSection + `(${serielno})`
          hallArrangementPlans[hallIndex].hallArrangement[k][j][0] = seatvalue
          studentCount++
          overallStudentCount++
          if (overallStudentCount === totalStudents) {
            return hallArrangementPlans
          }
          if (studentCount === studentStrength) {
            studentArrayIndex++
            studentCount = 0
            studentStrength = studentData[studentArrayIndex].strength
          }
        }
      }
      console.log(hallArrangementPlans[hallIndex].hallArrangement)
      hallIndex++
      if (hallIndex === hallLength) {
        hallIndex = 0
      }
    }
  }
  return hallArrangementPlans
}
// console.log(generateSeatingPlan(studentData, hallData))
