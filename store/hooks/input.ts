import { Hall, Student, StudentsPerYear } from "@/server/type"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { extractRollNo } from "@/lib/utils"

interface HallsState {
  hallsState: Hall[]
  setHallsState: (halls: Hall[]) => void
  addHall: (hall: Hall) => void
  deleteHall: (ind: number) => void
  editHall: (ind: number, hall: Hall) => void
  getHallByIndex: (ind: number) => Hall
}

interface TotalStudentsState {
  totalStudentsState: number
  setTotalStudentsState: (totalStudents: number) => void
}

interface TotalHallCapacityState {
  totalHallCapacityState: number
  setTotalHallCapacityState: (totalHallCapacity: number) => void
}

interface MergedDataState {
  mergedDataState: Student[][]
  setMergedDataState: (mergedData: Student[][]) => void
  getMergedDataByIndex: (index: number) => Student[]
  getStudentsPerYear: () => StudentsPerYear[]
  addStudentArr: (student: Student[]) => void
  deleteStudentArr: (ind: number) => void
  editStudentArr: (ind: number, student: Student[]) => void
}

type ExcelDataState = {
  excelDataState: Student[][]
  setExcelDataState: (excelData: Student[][]) => void
  getExcelDataByIndex: (index: number) => Student[]
  addStudentArr: (student: Student[]) => void
  deleteStudentArr: (ind: number) => void
  editStudentArr: (ind: number, student: Student[]) => void
}

interface FileNamesState {
  fileNamesState: string[]
  setFileNamesState: (fileNames: string[]) => void
  getFileNameByIndex: (index: number) => string
  addFileName: (fileName: string) => void
  deleteFileName: (ind: number) => void
  editFileName: (ind: number, fileName: string) => void
}

export const useHallsState = create<HallsState>()(
  devtools(
    persist(
      (set, get) => ({
        hallsState: [],
        setHallsState: (halls: Hall[]) => set({ hallsState: halls }),
        addHall: (hall: Hall) =>
          set({ hallsState: [...get().hallsState, hall] }),
        deleteHall: (ind: number) =>
          set({ hallsState: get().hallsState.filter((_, i) => i !== ind) }),
        editHall: (ind: number, hall: Hall) => {
          const halls = get().hallsState
          halls[ind] = hall
          set({ hallsState: halls })
        },
        getHallByIndex: (ind: number) => get().hallsState[ind],
      }),
      { name: "hallsState" }
    )
  )
)

export const useTotalStudentsState = create<TotalStudentsState>()(
  devtools(
    persist(
      (set, get) => ({
        totalStudentsState: 0,
        setTotalStudentsState: (totalStudents: number) =>
          set({ totalStudentsState: totalStudents }),
        getTotalStudentsState: () => get().totalStudentsState,
      }),
      { name: "totalStudentsState" }
    )
  )
)

export const useTotalHallCapacityState = create<TotalHallCapacityState>()(
  devtools(
    persist(
      (set, get) => ({
        totalHallCapacityState: 0,
        setTotalHallCapacityState: (totalHallCapacity: number) =>
          set({ totalHallCapacityState: totalHallCapacity }),
        getTotalHallCapacityState: () => get().totalHallCapacityState,
      }),
      { name: "totalHallCapacityState" }
    )
  )
)

export const useMergedDataState = create<MergedDataState>()(
  devtools(
    persist(
      (set, get) => ({
        mergedDataState: [],
        setMergedDataState: (mergedData: Student[][]) =>
          set({ mergedDataState: mergedData }),
        addStudentArr: (student: Student[]) =>
          set({
            mergedDataState: [...get().mergedDataState, student],
          }),
        deleteStudentArr: (ind: number) =>
          set({
            mergedDataState: get().mergedDataState.filter((_, i) => i !== ind),
          }),
        editStudentArr: (ind: number, student: Student[]) => {
          const mergedData = get().mergedDataState
          mergedData[ind] = student
          set({ mergedDataState: mergedData })
        },
        getMergedDataByIndex: (index: number) => get().mergedDataState[index],
        getStudentsPerYear: () =>
          get()?.mergedDataState.map(
            (studentPerYear: Student[]): StudentsPerYear => {
              const { year, dept } = extractRollNo(studentPerYear[0].rollno)
              return {
                year: year as 1 | 2 | 3 | 4,
                semester: NaN,
                dept,
                strength: studentPerYear.length,
                studentData: studentPerYear,
              }
            }
          ) || [],
      }),
      { name: "mergedDataState" }
    )
  )
)

export const useExcelDataState = create<ExcelDataState>()(
  devtools(
    persist(
      (set, get) => ({
        excelDataState: [],
        setExcelDataState: (excelData: Student[][]) =>
          set({ excelDataState: excelData }),
        addStudentArr: (student: Student[]) =>
          set({
            excelDataState: [...get().excelDataState, student],
          }),
        deleteStudentArr: (ind: number) =>
          set({
            excelDataState: get().excelDataState.filter((_, i) => i !== ind),
          }),
        editStudentArr: (ind: number, student: Student[]) => {
          const excelData = get().excelDataState
          excelData[ind] = student
          set({ excelDataState: excelData })
        },
        getExcelDataByIndex: (index: number) => get().excelDataState[index],
      }),
      { name: "excelDataState" }
    )
  )
)

export const useFileNamesState = create<FileNamesState>()(
  devtools(
    persist(
      (set, get) => ({
        fileNamesState: [],
        setFileNamesState: (fileNames: string[]) =>
          set({ fileNamesState: fileNames }),
        addFileName: (fileName: string) =>
          set({ fileNamesState: [...get().fileNamesState, fileName] }),
        deleteFileName: (ind: number) =>
          set({
            fileNamesState: get().fileNamesState.filter((_, i) => i !== ind),
          }),
        editFileName: (ind: number, fileName: string) => {
          const fileNames = get().fileNamesState
          fileNames[ind] = fileName
          set({ fileNamesState: fileNames })
        },
        getFileNameByIndex: (index: number) => get().fileNamesState[index],
      }),
      { name: "fileNamesState" }
    )
  )
)
