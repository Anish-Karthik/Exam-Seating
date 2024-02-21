"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import ExcelDataForm from "@/components/forms/excel-data-form";

import GatherData from "../mini-components/gather-data";
import HandleSumbit from "../mini-components/handle-sumbit";
import ResetButton from "../mini-components/reset-button";
import DisplayStudentInputData from "../tables/display-student-input";
import SampleData from "../tables/sample-data";
import CollegeDetails from "./college-details";
import DurationDetails from "./duration-details";
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
    <div className="form-group container flex flex-col gap-2 max-sm:min-h-screen max-sm:!p-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 max-md:flex-col">
          <TotalHallCapacity />
          <TotalStudents />
        </div>
        <div className="flex gap-2 max-md:flex-col max-md:flex-wrap">
          <ResetButton />
          <HandleSumbit />
        </div>
      </div>
      <GatherData />
      <SampleData />
      <CollegeDetails />
      <DurationDetails />
      <ExcelDataForm />
      <HallForm />
      <DisplayStudentInputData />
    </div>
  );
};

export default MainForm;
