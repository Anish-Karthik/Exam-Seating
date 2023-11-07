"use client"

import ExcelDataForm from "@/components/excel-data-form"
import { Student } from '@/lib/type';
import React, { useState } from 'react'
import DisplayStudentInputData from "./display-student-input";
import HallForm from "./hall-form";

type ExcelData = Student;
const MainForm = () => {
  const [excelData, setExcelData] = useState<ExcelData[][]>([]);
  const [mergedData, setMergedData] = useState<ExcelData[][]>([]);
  return (
    <div className="container">
      <ExcelDataForm
        excelData={excelData}
        setExcelData={setExcelData}
        setMergedData={setMergedData}
      />
      <HallForm />
      <DisplayStudentInputData data={mergedData} />
    </div>
  )
}

export default MainForm