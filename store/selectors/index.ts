import { Student, StudentsPerYear } from "@/server/type";
import { selector } from "recoil";

import { excelDataState } from "../atoms/form";

export const studentPerYearState = selector({
  key: "studentPerYearState",
  get: ({ get }) => {
    try {
      const data = [...get(excelDataState)];

      // sort and group students by dept-year
      data.sort((a, b) => a.year - b.year);

      const studentsPerYear: StudentsPerYear[] = [];
      const groups = new Set(
        data.map(
          (studentPerSectionData) =>
            `${studentPerSectionData.dept}-${studentPerSectionData.year}-${studentPerSectionData.semester}`
        )
      );
      const groupedStudent: Map<string, StudentsPerYear[]> = new Map();

      groups.forEach((group) => {
        groupedStudent.set(group, []);
      });

      data.forEach((studentPerSectionData) => {
        const group = `${studentPerSectionData.dept}-${studentPerSectionData.year}-${studentPerSectionData.semester}`;
        const students = groupedStudent.get(group);
        students?.push(studentPerSectionData);
      });

      groupedStudent.forEach((students, key) => {
        const [dept, year, semester] = key.split("-");
        students.sort((a, b) =>
          a.studentData[0].section.localeCompare(b.studentData[0].section)
        );

        // merge the students
        const mergedStudents: Student[] = [];
        students.forEach((student) => {
          mergedStudents.push(...student.studentData);
        });
        studentsPerYear.push({
          dept,
          year: parseInt(year),
          semester: parseInt(semester),
          strength: mergedStudents.length,
          studentData: mergedStudents,
          filename: students[0].filename,
        });
      });
      return studentsPerYear;
    } catch (error) {
      return [];
    }
  },
});
