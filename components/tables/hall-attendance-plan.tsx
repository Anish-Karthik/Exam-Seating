import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { AttendanceSheet } from "@/server/type";
import { HallArrangementPlansState, HallAttendancesState } from "@/store/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

const AttendanceTable = ({ index }: { index: number }) => {
  const id = `attendance${index}`;
  const router = useRouter();
  const attendances = useRecoilValue(HallAttendancesState);
  const [data, setData] = useState<AttendanceSheet>();
  useEffect(() => {
    const data =
      attendances && attendances.length
        ? attendances
        : JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallAttendances) ||
              "[]"
          );
    console.log(data);
    // @ts-ignore
    setData(data[index]);
  }, [attendances, index]);

  if (!data) return <>Not found</>;
  return (
    <div className="table-responsive">
      <table className="table-bordered mx-auto table" id={id}>
        <thead>
          <tr>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              S.No
            </th>
            <th rowSpan={1} className="border px-4 py-2 text-center">
              Hall No {data.hallno}
            </th>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              Name
            </th>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              Section
            </th>
            {/* Can display all exams date */}
          </tr>
          <tr>
            <th rowSpan={1} className="border px-4 py-2 text-center">
              Register No
            </th>
            {/* Can display all exams session */}
          </tr>
        </thead>
        <tbody>
          {data.studentData.map((student, ind) => (
            <tr key={`${data.hallno}-${ind}`}>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.sno}
              </td>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.regno}
              </td>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.name}
              </td>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.section}
              </td>
              {/* Can display all empty cells to allow manual signature */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
