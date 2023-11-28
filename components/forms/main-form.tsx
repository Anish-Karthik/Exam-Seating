"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import ExcelDataForm from "@/components/forms/excel-data-form";

import DisplayStudentInputData from "../display/display-student-input";
import SampleData from "../display/sample-data";
import GatherData from "../mini-components/gather-data";
import HandleSumbit from "../mini-components/handle-sumbit";
import ResetButton from "../mini-components/reset-button";
import HallForm from "./multiples-hall-form";

const TotalHallCapacity = dynamic(
  () => import("@/components/mini-components/total-hall-capacity"),
  {
    ssr: false,
  }
);
const TotalStudents = dynamic(
  () => import("@/components/mini-components/total-students"),
  {
    ssr: false,
  }
);

const MainForm = () => {
  const router = useRouter();

  return (
    <div className="form-group container flex flex-col gap-2 max-sm:min-h-screen max-sm:!p-0">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 max-md:flex-col">
          <TotalHallCapacity />
          <TotalStudents />
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <ResetButton />
          <HandleSumbit />
        </div>
      </div>
      <GatherData />
      <SampleData />
      <ExcelDataForm />
      <HallForm />
      <DisplayStudentInputData />
    </div>
  );
};

export default MainForm;
