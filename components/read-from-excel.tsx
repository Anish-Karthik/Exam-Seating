
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { Input } from '@/components/ui/input';

const ReadFromExcel = ({
  setData
}: {
  setData: (data: any) => void
}) => {
  const readExcel = (file: File | null) => {
    if (!file) {
      return;
    }

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        if (!e && !e.target && !e.target.result) {
          throw new Error("File not found");
        }
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setData(d);
      console.log(d);
    });
  }
  return (
    <div>
      <Input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e?.target?.files![0];
          readExcel(file);
        }}
      />
    </div>
  )
}

export default ReadFromExcel