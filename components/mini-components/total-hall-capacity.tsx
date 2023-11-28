import React, { useEffect } from "react";
import { totalHallCapacityState } from "@/store/atoms";
import { useRecoilState } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

const TotalHallCapacity = () => {
  const [totalHallCapacity, setTotalHallCapacity] = useRecoilState(
    totalHallCapacityState
  );
  console.log(totalHallCapacity);
  useEffect(() => {
    if (totalHallCapacity === 0) {
      setTotalHallCapacity(
        window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalHallCapacity)
          ? JSON.parse(
              window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalHallCapacity)!
            )
          : 0
      );
    }
  }, [setTotalHallCapacity, totalHallCapacity]);
  return (
    <h1 className="text-2xl font-bold">
      Total Hall Capacity: {totalHallCapacity}
    </h1>
  );
};

export default TotalHallCapacity;
