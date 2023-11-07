"use client"

import ExcelDataForm from "@/components/excel-data-form"
import { Hall, Student } from '@/lib/type';
import React, { useState } from 'react'
import DisplayStudentInputData from "./display-student-input";
import HallForm from "./hall-form";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type ExcelData = Student;
const MainForm = () => {
  const [totalStudents, setTotalStudents] = useState<number>(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!).totalStudents : 0);
  const [totalHallCapacity, setTotalHallCapacity] = useState<number>(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!).totalHallCapacity : 0);
  const [halls, setHalls] = useState<Hall[]>(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!).halls : []);
  const [excelData, setExcelData] = useState<ExcelData[][]>(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!).excelData : []);
  const [mergedData, setMergedData] = useState<ExcelData[][]>(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!).mergedData : []);

  const router = useRouter();
  const handleSubmit = () => {
    if (totalHallCapacity === 0) {
      toast.error("Total Hall Capacity is 0");
      return;
    }
    if (totalStudents === 0) {
      toast.error("Total Students is 0");
      return;
    }
    if (totalStudents > totalHallCapacity) {
      toast.error("Total Students are greater than Total Hall Capacity");
      return;
    }
    // store the data in localstorage
    localStorage.setItem("data", JSON.stringify({
      totalHallCapacity,
      totalStudents,
      excelData,
      mergedData,
      halls
    }));
    toast.success("Data saved permanently");
  }
  const handleReset = () => {
    setTotalHallCapacity(0);
    setTotalStudents(0);
    setExcelData([]);
    setMergedData([]);
    setHalls([]);
    localStorage.removeItem("data");
    router.refresh();
  }
  const isValid = () => {
    if (totalHallCapacity === 0) {
      return false;
    }
    if (totalStudents === 0) {
      return false;
    }
    if (totalStudents > totalHallCapacity) {
      return false;
    }
    return true;
  }
  return (
    <div className="container flex flex-col gap-2 form-group">
      <div className="flex justify-between items-center ">
        <div className="flex gap-6">
          <h1 className="text-2xl font-bold">Total Hall Capacity: {totalHallCapacity}</h1>  
          <h1 className="text-2xl font-bold">Total Students: {totalStudents}</h1>
        </div>
        <div className="flex gap-6">
          <Button onClick={handleReset} variant="outline" className="!border-[3px]">
            Reset
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid()}>
            Submit
          </Button>
        </div>
      </div>
      <ExcelDataForm
        setTotalStudents={setTotalStudents}
        excelData={excelData}
        setExcelData={setExcelData}
        setMergedData={setMergedData}
      />
      <HallForm setTotalHallCapacity={setTotalHallCapacity} halls={halls} setHalls={setHalls} />
      <DisplayStudentInputData data={mergedData} />
    </div>
  )
}

export default MainForm