"use client";

import { useEffect, useState } from "react";
import { StudentsPerYear } from "@/server/type";
import {
  excelDataState,
  mergedDataState,
  totalStudentsState,
} from "@/store/atoms/form";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Button } from "@/components/ui/button";
import ReadFromExcel from "@/components/forms/read-from-excel";

const ExcelDataForm = () => {
  const [excelData, setExcelData] = useRecoilState(excelDataState);
  const [editingArray, setEditingArray] = useState<boolean[]>(
    new Array(excelData.length).fill(false)
  );
  // const [fileNames, setFileNames] = useRecoilState(fileNamesState);
  const setTotalStudents = useSetRecoilState(totalStudentsState);
  const setMergedData = useSetRecoilState(mergedDataState);
  console.log(excelData);
  const handleAddData = () => {
    setExcelData((prevData) => [
      ...prevData,
      {
        dept: "CSE",
        semester: 1,
        strength: 0,
        studentData: [],
        year: 1,
        filename: "",
      },
    ]);
    setEditingArray((prevArray) => [...prevArray, true]);
  };

  useEffect(() => {
    const total = excelData.reduce(
      (acc, curr) => acc + curr.studentData.length,
      0
    );
    setTotalStudents(total);
    console.log(excelData);
    const mergeStudentsWithRepeatedRollNoPrefix = (): StudentsPerYear[] => {
      const mergedData: StudentsPerYear[] = [];
      // maynot be needed
      return mergedData;
    };
  }, [excelData, setTotalStudents]);

  return (
    <div className="form-group container !ml-0 max-sm:!border-none max-sm:!p-2 md:p-2">
      <Button
        variant={"outline"}
        className="mb-2 rounded-full border-blue-800 px-3 text-xl text-blue-800"
        onClick={handleAddData}
      >
        Add Student Data
      </Button>
      <div className="flex flex-col-reverse gap-2">
        {excelData.length > 0 &&
          excelData.map((data, index) => (
            <div key={index} className="row">
              <ReadFromExcel
                index={index}
                excelData={excelData[index]}
                setEditingIndex={setEditingArray}
                defaultIsEdit={editingArray[index]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExcelDataForm;
