"use client"

import React, { useEffect } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Trash } from "lucide-react"
import toast from "react-hot-toast/headless"

import { Student } from "@/lib/type"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ReadFromExcel from "@/components/forms/read-from-excel"

type ExcelData = Student
const ExcelDataForm = ({
  excelData,
  fileNames,
  setTotalStudents,
  setExcelData,
  setMergedData,
  setFileNames,
}: {
  excelData: ExcelData[][]
  fileNames: string[]
  setTotalStudents: React.Dispatch<React.SetStateAction<number>>
  setExcelData: React.Dispatch<React.SetStateAction<ExcelData[][]>>
  setMergedData: React.Dispatch<React.SetStateAction<ExcelData[][]>>
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const handleAddData = () => {
    setExcelData((prevData) => [...prevData, []])
    setFileNames((prevData) => [...prevData, ""])
  }

  const handleDeleteData = (index: number) => {
    setFileNames((prevData) => {
      const newData = [...prevData]
      newData.splice(index, 1)
      return newData
    })
    setExcelData((prevData) => {
      const newData = [...prevData]
      newData.splice(index, 1)
      return newData
    })
    toast.success("Deleted")
  }

  const handleExcelData = (
    fileName: string,
    data: ExcelData[],
    index: number
  ) => {
    setFileNames((prevData) => {
      const newData = [...prevData]
      newData[index] = fileName
      return newData
    })
    setExcelData((prevData) => {
      const newData = [...prevData]
      newData[index] = data
      return newData
    })
  }

  useEffect(() => {
    const total = excelData.reduce((acc, curr) => acc + curr.length, 0)
    setTotalStudents(total)
    console.log(excelData)
    const lastData = excelData[excelData.length - 1]
    if (!(lastData && lastData.length > 0) || excelData.length === 1) {
      setMergedData(excelData)
      return
    }
    const newData = [...excelData]

    const repeatedRollNoPrefix = excelData.findIndex((data, index) => {
      if (index === excelData.length - 1) {
        return false
      }
      return data.some((d) => {
        return lastData.some((ld) => {
          return (
            d.rollno.toString().slice(0, 3) === ld.rollno.toString().slice(0, 3)
          )
        })
      })
    })
    if (repeatedRollNoPrefix === -1) {
      setMergedData(excelData)
      return
    }
    newData[repeatedRollNoPrefix] =
      newData[repeatedRollNoPrefix][0].section <
      newData[excelData.length - 1][0].section
        ? [...newData[repeatedRollNoPrefix], ...newData[excelData.length - 1]]
        : [...newData[excelData.length - 1], ...newData[repeatedRollNoPrefix]]
    newData.pop()
    console.log(newData)
    setMergedData(newData)
  }, [excelData])

  return (
    <div className="form-group container !ml-0 !p-2">
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
              <div className="flex ">
                <ReadFromExcel
                  setData={(data, fileName) =>
                    handleExcelData(fileName, data, index)
                  }
                  defaultFileName={fileNames[index]}
                />
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={"outline"}
                      className="rounded-full border-red-800 px-3 text-xl text-red-800"
                    >
                      <div className="lg:hidden">Delete</div>
                      <Trash className="h-6 w-6 max-lg:hidden" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                      <div className="flex justify-end gap-2">
                        <DialogPrimitive.Close>
                          <Button variant={"outline"}>Cancel</Button>
                        </DialogPrimitive.Close>
                        <DialogPrimitive.Close>
                          <Button
                            variant={"destructive"}
                            onClick={() => handleDeleteData(index)}
                          >
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
