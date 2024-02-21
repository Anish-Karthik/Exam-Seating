import { StudentsPerYear } from "./type";

export const groupData = (studentData: StudentsPerYear[]) => {
  //group data based on the key (year and dept)

  const groupData = studentData.reduce(
    (acc, curr) => {
      const key = `${curr.year}-${curr.dept}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    },
    {} as { [key: string]: StudentsPerYear[] }
  );

  // store the grouped data in an array of arrays(same keys are grouped together)

  const modifiedStudentData = Object.values(groupData);

  console.log("modifiedStudentData", modifiedStudentData);

  return modifiedStudentData;
};
