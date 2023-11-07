"use client";

import HallForm from '@/components/hall-form';
import ReadFromExcel from '@/components/read-from-excel';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

type ExcelData = {
  id: number;
  firstName: string;
  lastName: string;
}

const Page = () => {
  const [excelData, setExcelData] = useState<ExcelData[][]>([]);

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
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((data, index) => (
              data.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.firstName}</td>
                  <td>{d.lastName}</td>
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

