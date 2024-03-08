import { useCallback, useEffect, useMemo } from "react";
import { extractDataFromRollno } from "@/server/hallplan";
import { HallAttendancesState } from "@/store/atoms";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const VerticalCountTable = () => {
  console.log("Vertical Count Table");
  const attendances = useRecoilValue(HallAttendancesState);
  useEffect(() => {
    const data =
      attendances && attendances.length
        ? attendances
        : JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallAttendances) ||
              "[]"
          );
    console.log(data);
  }, [attendances]);
  console.log(attendances);

  const getAllStudentsPerHallByVerticalCount = useCallback(() => {
    const data: {
      hall: string;
      vertical: [string, number][];
    }[] = new Array(attendances.length);

    const verticalNamesSet = new Set<string>();

    for (let i = 0; i < attendances.length; i++) {
      const verticalMap = new Map<string, number>();
      attendances[i].studentData.forEach((student) => {
        const { vertical } = extractDataFromRollno(student.rollno);
        verticalNamesSet.add(vertical);
        if (verticalMap.has(vertical)) {
          verticalMap.set(vertical, verticalMap.get(vertical)! + 1);
        } else {
          verticalMap.set(vertical, 1);
        }
      });

      data[i] = {
        hall: attendances[i].hallno,
        vertical: Array.from(verticalMap.entries()),
      };
      console.log(data[i]);
    }
    const verticalNames = Array.from(verticalNamesSet);
    console.log(data, verticalNames);
    return { data, verticalNames };
  }, [attendances]);

  const { data, verticalNames } = useMemo(
    () => getAllStudentsPerHallByVerticalCount(),
    [getAllStudentsPerHallByVerticalCount]
  );

  return (
    <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:w-screen max-sm:border max-sm:px-2">
      <div className="table-responsive">
        <table className="table-bordered mx-auto table">
          <thead>
            <tr>
              <th className="max-w-[100px] whitespace-normal border px-4 py-2 text-center md:max-w-[200px] md:text-base">
                Hall No.
              </th>
              {verticalNames.map((verticalName) => (
                <th className="max-w-[100px] whitespace-normal border px-4 py-2 text-center md:max-w-[200px] md:text-base">
                  {verticalName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr>
                <td className="border px-4 py-2 text-center">{d.hall}</td>
                {d.vertical.map((v) => (
                  <td className="border px-4 py-2 text-center">{v[1]}</td>
                ))}
                {verticalNames.map(
                  (_, index) =>
                    index >= d.vertical.length && (
                      <td className="border px-4 py-2 text-center">0</td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default VerticalCountTable;
