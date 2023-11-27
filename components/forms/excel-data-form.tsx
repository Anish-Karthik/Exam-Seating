"use client"

import { useEffect, useState } from "react"
import { Student } from "@/server/type"
import {
  useExcelDataState,
  useFileNamesState,
  useMergedDataState,
  useTotalStudentsState,
} from "@/store/hooks"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Trash } from "lucide-react"
import toast from "react-hot-toast/headless"

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
const ExcelDataForm = () => {
  const {
    excelDataState: excelData,
    addStudentArr,
    deleteStudentArr,
    editStudentArr,
  } = useExcelDataState()
  const {
    fileNamesState: fileNames,
    addFileName,
    deleteFileName,
    editFileName,
  } = useFileNamesState()
  const setTotalStudents = useTotalStudentsState(
    (state) => state.setTotalStudentsState
  )
  const setMergedData = useMergedDataState((state) => state.setMergedDataState)

  const handleAddData = () => {
    addStudentArr([])
    addFileName("")
  }

  const handleDeleteData = (index: number) => {
    deleteStudentArr(index)
    deleteFileName(index)
    toast.success("Deleted")
  }

  const handleExcelData = (
    fileName: string,
    data: ExcelData[],
    index: number
  ) => {
    editStudentArr(index, data)
    editFileName(index, fileName)
    toast.success("Saved")
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
  }, [excelData, setMergedData, setTotalStudents])
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;

  return (
    <div className="form-group container !ml-0 max-sm:min-h-screen max-sm:!p-0 md:p-2">
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
