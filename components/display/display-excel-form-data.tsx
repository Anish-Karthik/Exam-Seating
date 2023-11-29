import React from "react";
import { StudentsPerYear } from "@/server/type";

import { intToRoman } from "@/lib/utils";

const DisplayExcelFormData = ({
  excelData,
}: {
  excelData: StudentsPerYear;
}) => {
  console.log(excelData);
  return (
    <div className="flex flex-col flex-wrap items-center gap-2 lg:flex-row xl:flex-nowrap">
      <div className="form-group max-lg:w-full">
        <div className="flex flex-col items-center gap-2">
          <p>File</p>
          <p className="sm:text-md text-sm md:text-xl">{excelData.filename}</p>
        </div>
      </div>
      <div className="form-group max-lg:w-full">
        <div className="flex flex-col items-center gap-2">
          <p>Department</p>
          <p className="text-xl">{excelData.dept}</p>
        </div>
      </div>
      <div className="form-group max-lg:w-full">
        <div className="flex flex-col items-center gap-2">
          <p>Year</p>
          <p className="text-xl">{intToRoman(excelData.year)}</p>
        </div>
      </div>
      <div className="form-group max-lg:w-full">
        <div className="flex flex-col items-center gap-2">
          <p>Semester</p>
          <p className="text-xl">{intToRoman(excelData.semester)}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayExcelFormData;
