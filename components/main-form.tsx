"use client"
import ExcelDataForm from "@/components/excel-data-form"
import { Hall, Student } from '@/lib/type';
import React, { useEffect, useState } from 'react'
import DisplayStudentInputData from "./display-student-input";
import HallForm from "./hall-form";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type ExcelData = Student;
const MainForm = () => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalHallCapacity, setTotalHallCapacity] = useState<number>(0);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [excelData, setExcelData] = useState<ExcelData[][]>([]);
  const [mergedData, setMergedData] = useState<ExcelData[][]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  
  const router = useRouter();
  useEffect(() => {
    setFileNames(window.localStorage.getItem("data") ? JSON.parse(window.localStorage.getItem("data")!).fileNames : [])
    setTotalStudents(window.localStorage.getItem("data") ? JSON.parse(window.localStorage.getItem("data")!).totalStudents : 0)
    setTotalHallCapacity(window.localStorage.getItem("data") ? JSON.parse(window.localStorage.getItem("data")!).totalHallCapacity : 0)
    setHalls(window.localStorage.getItem("data") ? JSON.parse(window.localStorage.getItem("data")!).halls : [])
    setExcelData(window.localStorage.getItem("data") ? JSON.parse(window.localStorage.getItem("data")!).excelData : [])
    setMergedData(window.localStorage.getItem("data") ? JSON.parse(window.localStorage.getItem("data")!).mergedData : [])
  }, []);
    
  if (!window || !window.localStorage) {
    return <h1>Local Storage not supported</h1>
  }

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
    // store the data in window.localstorage
    window.localStorage.setItem("data", JSON.stringify({
      totalHallCapacity,
      totalStudents,
      excelData,
      mergedData,
      halls,
      fileNames
    }));
    toast.success("Data saved permanently");
  }
  const handleReset = () => {
    setTotalHallCapacity(0);
    setTotalStudents(0);
    setExcelData([]);
    setMergedData([]);
    setHalls([]);
    setFileNames([]);
    window.localStorage.removeItem("data");
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
      <div className="flex justify-between items-center">
        <div className="flex gap-6 max-md:flex-col">
          <h1 className="text-2xl font-bold">Total Hall Capacity: {totalHallCapacity}</h1>  
          <h1 className="text-2xl font-bold">Total Students: {totalStudents}</h1>
        </div>
        <div className="flex gap-6 max-md:flex-col">
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
        fileNames={fileNames}
        setFileNames={setFileNames}
      />
      <HallForm setTotalHallCapacity={setTotalHallCapacity} halls={halls} setHalls={setHalls} />
      <DisplayStudentInputData data={mergedData} />
    </div>
  )
}

export default MainForm