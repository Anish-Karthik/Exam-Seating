"use client";

import HallForm from '@/components/hall-form';
import ReadFromExcel from '@/components/read-from-excel';
import { Button } from '@/components/ui/button';
import { Student } from '@/lib/type';
import React, { useEffect, useState } from 'react'

type ExcelData = Student;
const Page = () => {
  const [excelData, setExcelData] = useState<ExcelData[][]>([]);
  const [mergedData, setMergedData] = useState<ExcelData[][]>([]);
  const handleAddData = () => {
    setExcelData(prevData => [...prevData, []]);
  }

  const handleDeleteData = (index: number) => {
    setExcelData(prevData => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  }

  const handleExcelData = (data: ExcelData[], index: number) => {
    setExcelData(prevData => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  }

  useEffect(() => {

    console.log(excelData);
    const lastData = excelData[excelData.length - 1];
    if (!(lastData && lastData.length > 0) || excelData.length === 1) {
      setMergedData(excelData);
      return;
    }
    const newData = [...excelData];
    
    const repeatedRollNoPrefix = excelData.findIndex((data, index) => {
      if (index === excelData.length - 1) {
        return false;
      }
      return data.some((d) => {
        return lastData.some((ld) => {
          return d.rollno.toString().slice(0,3) === ld.rollno.toString().slice(0,3);
        });
      });
    })
    if (repeatedRollNoPrefix === -1) {
      setMergedData(excelData);
      return;
    }
    newData[repeatedRollNoPrefix] = newData[repeatedRollNoPrefix][0].section < newData[excelData.length - 1][0].section ?[...newData[repeatedRollNoPrefix], ...newData[excelData.length - 1]]: [...newData[excelData.length - 1], ...newData[repeatedRollNoPrefix]];
    newData.pop();
    console.log(newData);
    setMergedData(newData);
  }, [excelData]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Read from Excel</h1>
        </div>
      </div>
      <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 ml-2 text-xl px-3'
        onClick={handleAddData}
      >
        Add Student Data
      </Button>
      <div className='flex flex-col-reverse'>
        {excelData.length > 0  && excelData.map((data, index) => (
          <div key={index} className="row">
            <div className="flex ">
              <ReadFromExcel setData={(data) => handleExcelData(data, index)} />
              <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3'
                onClick={() => handleDeleteData(index)}
              >
                -
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <HallForm />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="px-4 py-2">Roll No</th>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Section</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.map((data, index) => (
              data.map((d, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{d.rollno}</td>
                  <td className="border px-4 py-2">{d.regno}</td>
                  <td className="border px-4 py-2">{d.name}</td>
                  <td className="border px-4 py-2">{d.section}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page

