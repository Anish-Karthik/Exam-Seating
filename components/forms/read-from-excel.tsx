import React, { useEffect, useState } from "react"
import { Student } from "@/server/type"
import * as XLSX from "xlsx"

import { dataWrangleTheExcelData } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const ReadFromExcel = ({
  defaultFileName,
  setData,
}: {
  defaultFileName: string
  setData: (data: Student[], fileNameArr: string) => void
}) => {
  // Fix Hydration Error
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])
  if (!isMounted) return null;
  const readExcel = (file: File | null) => {
    if (!file) {
      return
    }

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e: any) => {
        if (!e && !e.target && !e.target.result) {
          throw new Error("File not found")
        }
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, { type: "buffer" })

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    promise.then((d) => {
      const data = dataWrangleTheExcelData(d)
      setData(data, file.name)
      console.log(data)
    })
  }
  return (
    <div className="flex gap-2">
      <Input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e?.target?.files![0]
          readExcel(file)
        }}
      />
      <Input
        type="text"
        placeholder="File Name"
        defaultValue={defaultFileName}
        disabled
        readOnly
      />
    </div>
  )
}

export default ReadFromExcel
