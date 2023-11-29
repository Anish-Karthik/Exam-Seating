import React, { useEffect } from "react";
import {
  excelDataState,
  fileNamesState,
  hallsState,
  mergedDataState,
  totalHallCapacityState,
  totalStudentsState,
} from "@/store/atoms/form";
import { useSetRecoilState } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

const GatherData = () => {
  const setFileNames = useSetRecoilState(fileNamesState);
  const setTotalStudents = useSetRecoilState(totalStudentsState);
  const setTotalHallCapacity = useSetRecoilState(totalHallCapacityState);
  const setHalls = useSetRecoilState(hallsState);
  const setExcelData = useSetRecoilState(excelDataState);
  const setMergedData = useSetRecoilState(mergedDataState);
  useEffect(() => {
    setFileNames(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.fileNames)
        ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.fileNames)!)
        : []
    );
    setTotalStudents(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalStudents)
        ? JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalStudents)!
          )
        : 0
    );
    setTotalHallCapacity(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalHallCapacity)
        ? JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalHallCapacity)!
          )
        : 0
    );
    setHalls(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallsData)
        ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallsData)!)
        : []
    );
    setExcelData(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.excelData)
        ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.excelData)!)
        : []
    );
    setMergedData(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.mergedData)
        ? JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.mergedData)!
          )
        : []
    );
  }, [
    setExcelData,
    setFileNames,
    setHalls,
    setMergedData,
    setTotalHallCapacity,
    setTotalStudents,
  ]);

  return <></>;
};

export default GatherData;
