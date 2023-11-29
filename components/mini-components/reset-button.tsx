import React from "react";
import { useRouter } from "next/navigation";
import {
  excelDataState,
  fileNamesState,
  HallArrangementPlansState,
  HallAttendancesState,
  HallPlansState,
  hallsState,
  mergedDataState,
  totalHallCapacityState,
  totalStudentsState,
} from "@/store/atoms";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import { Button } from "../ui/button";

const ResetButton = () => {
  const setTotalHallCapacity = useSetRecoilState(totalHallCapacityState);
  const setTotalStudents = useSetRecoilState(totalStudentsState);
  const setExcelData = useSetRecoilState(excelDataState);
  const setMergedData = useSetRecoilState(mergedDataState);
  const setHalls = useSetRecoilState(hallsState);
  const setFileNames = useSetRecoilState(fileNamesState);
  const setHallPlans = useSetRecoilState(HallPlansState);
  const setHallArrangementPlans = useSetRecoilState(HallArrangementPlansState);
  const setHallAttendances = useSetRecoilState(HallAttendancesState);

  const router = useRouter();
  const handleReset = () => {
    setTotalHallCapacity(0);
    setTotalStudents(0);
    setExcelData([]);
    setMergedData([]);
    setHalls([]);
    setFileNames([]);
    setHallPlans([]);
    setHallArrangementPlans([]);
    setHallAttendances([]);
    // remove data from local storage
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.studentsPerYearData);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.fileNames);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.totalStudents);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.totalHallCapacity);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.excelData);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.mergedData);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.hallsData);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.hallPlans);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.hallArrangementPlans);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.hallAttendances);

    toast.success("Reset successful");
    router.refresh();
  };
  return (
    <Button onClick={handleReset} variant="outline" className="!border-[3px]">
      Reset
    </Button>
  );
};

export default ResetButton;
