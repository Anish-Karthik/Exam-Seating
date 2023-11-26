import { Hall, Student } from "@/server/type"
import { atom } from "recoil"

export const hallState = atom<Hall>({
  key: "hallState",
  default: {
    hallno: "101",
    dept: "CSE",
    studentsPerBench: 1,
    studentsPerHall: 0,
    isSameYearPerBenchAllowed: false,
    isInterchange: false,
    benches: {
      rows: 5,
      cols: 6,
      extra: 0,
    },
  },
})

export const hallsState = atom<Hall[]>({
  key: "hallsState",
  default: [],
})

export const totalStudentsState = atom<number>({
  key: "totalStudentsState",
  default: 0,
})

export const totalHallCapacityState = atom<number>({
  key: "totalHallCapacityState",
  default: 0,
})

export const mergedDataState = atom<Student[][]>({
  key: "mergedDataState",
  default: [],
})

export const excelDataState = atom<Student[][]>({
  key: "excelDataState",
  default: [],
})

export const fileNamesState = atom<string[]>({
  key: "fileNamesState",
  default: [],
})
