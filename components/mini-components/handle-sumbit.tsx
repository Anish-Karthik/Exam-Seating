import Link from "next/link";
import {
  excelDataState,
  fileNamesState,
  hallsState,
  mergedDataState,
  totalHallCapacityState,
  totalStudentsState,
} from "@/store/atoms/form";
import { studentPerYearState } from "@/store/selectors";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import { Button } from "../ui/button";

const HandleSumbit = () => {
  const fileNames = useRecoilValue(fileNamesState);
  const totalStudents = useRecoilValue(totalStudentsState);
  const totalHallCapacity = useRecoilValue(totalHallCapacityState);
  const halls = useRecoilValue(hallsState);
  const excelData = useRecoilValue(excelDataState);
  const mergedData = useRecoilValue(mergedDataState);
  const studentsPerYearData = useRecoilValue(studentPerYearState);

  const isValid = () => {
    if (totalHallCapacity === 0) {
      return false;
    }
    if (totalStudents === 0) {
      return false;
    }
    if (totalStudents > totalHallCapacity) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (totalHallCapacity === 0) {
      toast.error("Total Hall Capacity is 0");
      return;
    }
    if (totalStudents === 0) {
      toast.error("Total Students is 0");
      return;
    }
    if (totalStudents > totalHallCapacity) {
      toast.error("Total Students are greater than Total Hall Capacity");
      return;
    }
    // store the data in window.localstorage

    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.studentsPerYearData,
      JSON.stringify(studentsPerYearData)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.hallsData,
      JSON.stringify(halls)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.fileNames,
      JSON.stringify(fileNames)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.totalStudents,
      JSON.stringify(totalStudents)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.totalHallCapacity,
      JSON.stringify(totalHallCapacity)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.mergedData,
      JSON.stringify(mergedData)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.excelData,
      JSON.stringify(excelData)
    );

    toast.success("Data saved permanently");
  };
  return (
    <div className="flex items-center gap-4">
      <Button onClick={handleSubmit} disabled={!isValid()}>
        Save
      </Button>
      <Link href={"/display"}>
        <Button>Generate Plan</Button>
      </Link>
    </div>
  );
};

export default HandleSumbit;
