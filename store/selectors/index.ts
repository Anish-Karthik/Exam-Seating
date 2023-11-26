import { Student, StudentsPerYear } from "@/server/type"
import { selector } from "recoil"

import { extractRollNo } from "@/lib/utils"

import { mergedDataState } from "../atoms/form"

export const studentPerYearState = selector({
  key: "studentPerYearState",
  get: ({ get }) => {
    const data = get(mergedDataState)
    // convert student[][] to studentPerYear[]
    return data.map((studentPerYear: Student[]): StudentsPerYear => {
      const { year, dept } = extractRollNo(studentPerYear[0].rollno)
      return {
        year,
        semester: NaN,
        dept,
        strength: studentPerYear.length,
        studentData: studentPerYear,
      }
    })
  },
})
