"use client"

import ExcelDataForm from "@/components/forms/excel-data-form"
import DisplayStudentInputData from "../display/display-student-input"
import SampleData from "../display/sample-data"
import GeneratePlanButton from "../minor-components/generate-plan-button"
import ResetButton from "../minor-components/reset-button"
import TotalHallCapacity from "../minor-components/total-hall-capacity"
import TotalStudents from "../minor-components/total-students"
import HallForm from "./multiples-hall-form"

const MainForm = () => {
  return (
    <div className="form-group container flex flex-col gap-2 max-sm:min-h-screen max-sm:!p-0">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 max-md:flex-col">
          <TotalHallCapacity />
          <TotalStudents />
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <ResetButton />
          <GeneratePlanButton />
        </div>
      </div>
      <SampleData />
      <ExcelDataForm />
      <HallForm />
      <DisplayStudentInputData />
    </div>
  )
}

export default MainForm
