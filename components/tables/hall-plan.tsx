import { useEffect, useState } from "react";
import { HallPlan } from "@/server/type";
import { HallPlansState } from "@/store/atoms";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import DateOfExamModal from "../mini-components/date-of-exam-modal";
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
            <div className="overflow-auto">
              {data[0].year} YEAR / {data[0].semester} SEM
            </div>
            <DateOfExamModal />
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
                  className="max-w-[100px] whitespace-normal border px-4 py-2 text-center md:max-w-[200px] md:text-base"
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
                  className="max-w-[100px] whitespace-normal border px-4 py-2 text-center md:max-w-[200px] md:text-base"
                >
                  Hall No. & Total Strength
                </th>

                <th
                  rowSpan={2}
                  className="max-w-[100px] whitespace-normal border px-4 py-2 text-center md:max-w-[200px] md:text-base"
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
      {show && (
        <div className="mt-1">
          <div className="font-bold">Exam Timings:</div>
          <div className="table-responsive">
            <table
              className="table-bordered mx-auto table"
              cellPadding={2}
              border={1}
            >
              <thead>
                <tr className="bg-gaey-500 bg">
                  <th className="border bg-gray-300">Year & Semester</th>
                  <th className="border bg-gray-300">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td align="center" className="border">
                    {data[0].year} / {data[0].semester}
                  </td>
                  <td className="border">
                    {" "}
                    <div>09.00 AM - 10.30PM (FN)</div>
                    <div>02.30 PM - 04.00 PM (AN)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-1 mt-20 flex w-full justify-between">
            <div className="font-bold">Exam Cell In-charge</div>
            <div className="text-right font-bold">HOD-{data[0].dept}</div>
          </div>
          {/* <div className="flex justify-between ">
            <div>
              {data[0].year} YEAR / {data[0].semester} SEM
            </div>
            <div>09.00 AM - 10.30PM (FN)</div>
            <div>02.30 PM - 04.00 PM (AN)</div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default HallPLanTable;
