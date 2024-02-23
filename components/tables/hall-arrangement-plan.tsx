import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HallArrangementPlan } from "@/server/type";
import { HallArrangementPlansState } from "@/store/atoms";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import { useDurationDetails } from "@/hooks/use-duration-details";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const HallArrangementTable = ({
  index,
  show = false,
}: {
  index: number;
  show?: boolean;
}) => {
  const router = useRouter();
  const hallArrangementPlans = useRecoilValue(HallArrangementPlansState);
  const [data, setData] = useState<HallArrangementPlan>();
  const id = `seatarrangement${index}}`;
  const { getStartDate, getEndDate } = useDurationDetails();
  useEffect(() => {
    const data =
      hallArrangementPlans && hallArrangementPlans.length
        ? hallArrangementPlans
        : JSON.parse(
            window.localStorage.getItem(
              LOCAL_STORAGE_KEYS.hallArrangementPlans
            ) || "[]"
          );
    console.log(data);
    setData(data[index]);
  }, [hallArrangementPlans, index]);

  if (!data) return <>Not found</>;
  //   Date: 11/9/2023 to 13/9/2023(FN&amp;AN)                  Time: 09.00 AM - 10.30PM (FN)
  //                                                            02.30 PM - 04.00 PM (AN)
  return (
    <div>
      {show && (
        <div className="font-semibold">
          <div className="flex justify-between ">
            <div>
              Date of Exam: {getStartDate()}
              {getStartDate() === getEndDate() ? null : " - " + getEndDate()}
            </div>
            <div>Time: 09.00 AM - 10.30PM (FN)</div>
          </div>
          <div className="flex justify-between ">
            <div>-</div>
            <div>02.30 PM - 04.00 PM (AN)</div>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:w-screen max-sm:border max-sm:px-2">
          <table className="table-bordered mx-auto table" id={id}>
            <thead>
              <tr>
                {data.hallArrangement[0].map((_, index) => (
                  <th colSpan={2} className="border px-4 py-2 text-center">
                    col {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.hallArrangement.map((row, ind) => (
                <tr key={`${data.hallno}-${ind}`}>
                  {row.map((seat, index) =>
                    seat.length === 1 ? (
                      <td
                        key={`${data.hallno}-${ind}-${data.hallno}-${seat.length}`}
                        colSpan={2}
                        className="w-[100px] border px-4 py-2 text-center"
                      >
                        {seat[0]}
                      </td>
                    ) : (
                      <>
                        <td
                          key={`${data.hallno}-${ind}-${data.hallno}-${seat.length}1`}
                          colSpan={1}
                          className="w-[100px] border px-4 py-2 text-center"
                        >
                          {seat[0]}
                        </td>
                        <td
                          key={`${data.hallno}-${ind}-${data.hallno}-${seat.length}2`}
                          colSpan={1}
                          className="w-[100px] border px-4 py-2 text-center"
                        >
                          {seat[1]}
                        </td>
                      </>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default HallArrangementTable;
