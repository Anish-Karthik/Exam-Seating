import { HallPlan } from "@/server/type";
import { HallPlansState } from "@/store/atoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { useDurationDetails } from "@/hooks/use-duration-details";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const HallPLanTable = ({
  index,
  show = false,
}: {
  index: number;
  show?: boolean;
}) => {
  const hallPlans = useRecoilValue(HallPlansState);
  const [data, setData] = useState<HallPlan[]>();
  const id = `seatarrangement${index}}`;
  const { getStartDate, getEndDate } = useDurationDetails();
  useEffect(() => {
    const data =
      hallPlans && hallPlans.length
        ? hallPlans
        : JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallPlans) || "[]"
          );
    console.log(data);
    setData(data[index]);
  }, [hallPlans, index]);

  if (!data) return <>Not found</>;
  // IV YEAR / VII SEM          Date: 11-9-23 to 14-9-23
  return (
    <div>
      {show && (
        <div className="font-semibold">
          <div className="flex justify-between ">
            <div>
              {data[0].year} YEAR / {data[0].semester} SEM
            </div>
            <div>
              Date of Exam: {format(getStartDate(), "dd-MM-yy")}
              {getStartDate() === getEndDate() ? null : " - " + format(getEndDate(), "dd-MM-yy")}
            </div>
          </div>
        </div>
      )}
      <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:w-screen max-sm:border max-sm:px-2">
        <div className="table-responsive">
          <table className="table-bordered mx-auto table" id={id}>
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  className="max-w-[100px] border px-4 py-2 text-center md:max-w-[200px]"
                >
                  Year / Semester
                </th>
                <th
                  rowSpan={2}
                  className="border px-4 py-2 text-center md:min-w-[140px]"
                >
                  Section
                </th>
                <th
                  colSpan={2}
                  rowSpan={1}
                  className="border px-4 py-2 text-center md:min-w-[160px]"
                >
                  Roll No
                </th>
                <th
                  rowSpan={2}
                  className="max-w-[100px] border px-4 py-2 text-center md:max-w-[200px]"
                >
                  Hall No. & Total Strength
                </th>
                <th
                  rowSpan={2}
                  className="max-w-[100px] border px-4 py-2 text-center md:max-w-[200px]"
                >
                  Block / Floor
                </th>
              </tr>
              <tr>
                <th className="min-w-[70px] border px-4 py-2 md:min-w-[80px]">
                  From
                </th>
                <th className="min-w-[70px] border px-4 py-2 md:min-w-[80px]">
                  To
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((hall, ind) => (
                <tr>
                  {ind == 0 && (
                    <td
                      className={`border px-4 py-2 text-center`}
                      rowSpan={data.length}
                    >
                      {hall.year} / {hall.semester}
                    </td>
                  )}
                  <td className="border px-4 py-2 text-center">
                    {hall.section}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {hall.rollNo.from}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {hall.rollNo.to}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {hall.hallno}
                  </td>
                  {ind == 0 && (
                    <td
                      rowSpan={data.length}
                      className="border px-4 py-2 text-center"
                    >
                      {hall.dept}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default HallPLanTable;
