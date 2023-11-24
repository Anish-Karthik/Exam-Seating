import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Student } from "./type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dataWrangleTheExcelData(data: any) {
  console.log(data)
  try {
    // format it into student data, remove the data that does fit under that category
    // input data is an array of objects containing the data from the excel sheet
    // remove the rows that don't match the format slno, regno, name, rollno, section
    const studentData: Student[] = []
    const invalidRows: any[] = []
    let i = 1
    data.forEach((row: any, index: number) => {
      console.log(row)

      if (
        row.__EMPTY &&
        row.__EMPTY_1 &&
        row.__EMPTY_2 &&
        row.__EMPTY_3 &&
        !isNaN(parseInt(row.__EMPTY_1))
      ) {
        try {
          const student: Student = {
            sno: i++,
            name: row.__EMPTY_2,
            regno: row.__EMPTY_1,
            rollno: row.__EMPTY,
            section: row.__EMPTY_3,
          }
          studentData.push(student)
        } catch (error) {
          invalidRows.push(row)
        }
      }
    })
    console.log(studentData)
    return studentData
  } catch (error) {
    console.log(error)
    return []
  }
}
