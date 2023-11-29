import { HallPlan } from "@/server/type";
import { HallPlansState } from "@/store/atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const HallPLanTable = ({ index }: { index: number }) => {
  const router = useRouter();
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

  return (
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
                <td className="border px-4 py-2 text-center">{hall.year}</td>
                <td className="border px-4 py-2 text-center">{hall.section}</td>
                <td className="border px-4 py-2 text-center">
                  {hall.rollNo.from}
                </td>
                <td className="border px-4 py-2 text-center">
                  {hall.rollNo.to}
                </td>
                <td className="border px-4 py-2 text-center">{hall.hallno}</td>
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
  );
};

export default HallPLanTable;
