"use client";

import ReadFromExcel from '@/components/read-from-excel';
import { Button } from '@/components/ui/button';
import { Student } from '@/lib/type';
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Trash } from "lucide-react";
import toast from 'react-hot-toast/headless';

type ExcelData = Student;
const ExcelDataForm = ({
  excelData,
  setTotalStudents,
  setExcelData,
  setMergedData
}: {
  excelData: ExcelData[][],
  setTotalStudents: React.Dispatch<React.SetStateAction<number>>,
  setExcelData: React.Dispatch<React.SetStateAction<ExcelData[][]>>,
  setMergedData: React.Dispatch<React.SetStateAction<ExcelData[][]>>
}) => {
  const handleAddData = () => {
    setExcelData(prevData => [...prevData, []]);
  }

  const handleDeleteData = (index: number) => {
    setExcelData(prevData => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
    toast.success("Deleted");
  }

  const handleExcelData = (data: ExcelData[], index: number) => {
    setExcelData(prevData => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  }

  useEffect(() => {
    const total = excelData.reduce((acc, curr) => acc + curr.length, 0);
    setTotalStudents(total);
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
    <div className='container  !ml-0 form-group !p-2'>
      <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 text-xl px-3 mb-2'
        onClick={handleAddData}
      >
        Add Student Data
      </Button>
      <div className='flex flex-col-reverse gap-2'>
        {excelData.length > 0  && excelData.map((data, index) => (
          <div key={index} className="row">
            <div className="flex ">
              <ReadFromExcel setData={(data) => handleExcelData(data, index)} />
              <Dialog>
                <DialogTrigger>
                  <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3' >
                    <div className="lg:hidden">
                      Delete
                    </div>
                    <Trash className="w-6 h-6 max-lg:hidden" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                    <div className='flex justify-end gap-2'>
                      <DialogPrimitive.Close>
                        <Button variant={"outline"}>
                          Cancel
                        </Button>
                      </DialogPrimitive.Close> 
                      <DialogPrimitive.Close>
                        <Button variant={"destructive"} onClick={() => handleDeleteData(index)}>
                          Delete
                        </Button>
                      </DialogPrimitive.Close> 
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExcelDataForm