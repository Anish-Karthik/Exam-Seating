import { useEffect } from "react";
import { totalStudentsState } from "@/store/atoms";
import { useRecoilState } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

const TotalStudents = () => {
  const [totalStudents, setTotalStudents] = useRecoilState(totalStudentsState);
  useEffect(() => {
    if (totalStudents === 0) {
      setTotalStudents(
        window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalStudents)
          ? JSON.parse(
              window.localStorage.getItem(LOCAL_STORAGE_KEYS.totalStudents)!
            )
          : 0
      );
    }
  }, [setTotalStudents, totalStudents]);
  return (
    <h1 className="text-lg font-bold md:text-2xl">
      Total Students: {totalStudents}
    </h1>
  );
};

export default TotalStudents;
