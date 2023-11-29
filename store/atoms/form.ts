import { Hall, Student, StudentsPerYear } from "@/server/type";
import { atom } from "recoil";

export const hallsState = atom<Hall[]>({
  key: "hallsState",
  default: [],
});

export const totalStudentsState = atom<number>({
  key: "totalStudentsState",
  default: 0,
});

export const totalHallCapacityState = atom<number>({
  key: "totalHallCapacityState",
  default: 0,
});

export const mergedDataState = atom<StudentsPerYear[]>({
  key: "mergedDataState",
  default: [],
});

export const excelDataState = atom<StudentsPerYear[]>({
  key: "excelDataState",
  default: [],
});

export const fileNamesState = atom<string[]>({
  key: "fileNamesState",
  default: [],
});
