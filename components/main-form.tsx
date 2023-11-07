"use client"

import ExcelDataForm from "@/components/excel-data-form"
import { Student } from '@/lib/type';
import React, { useState } from 'react'
import DisplayStudentInputData from "./display-student-input";
import HallForm from "./hall-form";

type ExcelData = Student;
const MainForm = () => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalHallCapacity, setTotalHallCapacity] = useState<number>(0);
  const [excelData, setExcelData] = useState<ExcelData[][]>([]);
  const [mergedData, setMergedData] = useState<ExcelData[][]>([]);
  return (
    <div className="container flex flex-col gap-2 form-group">
      <div className="flex justify-between items-center ">
        <div className="flex gap-6">
          <h1 className="text-2xl font-bold">Total Hall Capacity: {totalHallCapacity}</h1>  
          <h1 className="text-2xl font-bold">Total Students: {totalStudents}</h1>
        </div>
        <div>
          Submit
        </div>
      </div>
      <ExcelDataForm
        setTotalStudents={setTotalStudents}
        excelData={excelData}
        setExcelData={setExcelData}
        setMergedData={setMergedData}
      />
      <HallForm setTotalHallCapacity={setTotalHallCapacity} />
      <DisplayStudentInputData data={mergedData} />
    </div>
  )
}

export default MainForm