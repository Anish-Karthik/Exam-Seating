import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AttendanceSheet,
  Hall,
  HallArrangementPlan,
  HallPlanPerYear,
  StudentsPerYear,
} from "@/server/type";
import {
  HallArrangementPlansState,
  HallAttendancesState,
  HallPlansState,
} from "@/store/atoms";
import { hallsState } from "@/store/atoms/form";
import { studentPerYearState } from "@/store/selectors";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  generateAttendaceSheet,
  generateHallArrangement,
  generateHallPlan,
} from "@/lib/actions";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import { exportHTMLTableToExcel } from "@/lib/utils";

import HallArrangementTable from "../tables/hall-arrangement-plan";
import AttendanceTable from "../tables/hall-attendance-plan";
import HallPLanTable from "../tables/hall-plan";
import { Button } from "../ui/button";
import DisplayDownloadOptions from "./display-download-options";

const DisplayPlan = ({
  name,
  sampledata,
}: {
  name: "hallplan" | "seatarrangement" | "attendance";
  sampledata: HallArrangementPlan[] | HallPlanPerYear[] | AttendanceSheet[];
}) => {
  const [studentsPerYearData, setStudentsPerYearData] = useState(
    useRecoilValue(studentPerYearState)
  );
  const [hallsData, setHallsData] = useRecoilState(hallsState);
  const [data, setData] = useState([]);
  const [hallPlans, setHallPlans] = useRecoilState(HallPlansState);
  const [attendance, setAttendance] = useRecoilState(HallAttendancesState);
  const [seatarrangement, setseatarrangement] = useRecoilState(
    HallArrangementPlansState
  );

  useEffect(() => {
    console.log("RERENDER COUNT");
    if (!studentsPerYearData || !studentsPerYearData.length)
      setStudentsPerYearData(
        JSON.parse(
          window.localStorage.getItem(LOCAL_STORAGE_KEYS.studentsPerYearData) ||
            "[]"
        )
      );
    if (!hallsData || !hallsData.length)
      setHallsData(
        JSON.parse(
          window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallsData) || "[]"
        )
      );
    if (
      !studentsPerYearData ||
      !studentsPerYearData.length ||
      !hallsData ||
      !hallsData.length
    )
      return; // TODO
    (async () => {
      console.log("generating plan");
      console.log(studentsPerYearData);
      console.log(hallsData);
      if (
        !studentsPerYearData ||
        !studentsPerYearData.length ||
        !hallsData ||
        !hallsData.length
      )
        return;
      console.log("TEST");
      console.log(studentsPerYearData);
      console.log(hallsData);
      const generatePlan = async (
        studentsPerYearData: StudentsPerYear[],
        hallsData: Hall[]
      ) => {
        switch (name) {
          case "hallplan":
            return await generateHallPlan(studentsPerYearData, hallsData);
          case "seatarrangement":
            return await generateHallArrangement(
              studentsPerYearData,
              hallsData
            );
          case "attendance":
            return await generateAttendaceSheet(studentsPerYearData, hallsData);
          default:
            return [];
        }
      };
      const res = await generatePlan(studentsPerYearData, hallsData);
      console.log(res);
      // @ts-ignore
      setData((prev) => [...res]);
      switch (name) {
        case "hallplan":
          window.localStorage.setItem(
            LOCAL_STORAGE_KEYS.hallPlans,
            JSON.stringify(res)
          );
          setHallPlans(res as HallPlanPerYear[]);
          break;
        case "seatarrangement":
          window.localStorage.setItem(
            LOCAL_STORAGE_KEYS.hallArrangementPlans,
            JSON.stringify(res)
          );
          setseatarrangement(res as HallArrangementPlan[]);
          break;
        case "attendance":
          window.localStorage.setItem(
            LOCAL_STORAGE_KEYS.hallAttendances,
            JSON.stringify(res)
          );
          setAttendance(res as AttendanceSheet[]);
          break;
      }
      console.log(res);
    })();
  }, [
    hallsData,
    name,
    sampledata,
    setAttendance,
    setData,
    setHallPlans,
    setseatarrangement,
    studentsPerYearData,
  ]);

  if (!window || !window.localStorage) {
    return <h1>Local Storage not supported</h1>;
  }

  return (
    <section className="h-full">
      {!(data && data.length) ? (
        <div className="">
          <h1 className="text-2xl font-bold">No Hall Plan</h1>
          <p>Please fill in the form to generate the hall plan.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-16">
          <DisplayDownloadOptions name="hallplan" size={data.length} />
          {data.map((plan, index) => (
            <div className="flex max-w-6xl flex-col gap-8 max-sm:hidden">
              <div className="flex gap-2">
                <h1 className="text-2xl font-bold">Hall Plan {index + 1}</h1>
                <Button
                  onClick={() =>
                    exportHTMLTableToExcel(
                      "xlsx",
                      `${name}${index}`,
                      `${name}${index + 1}`
                    )
                  }
                >
                  Download
                </Button>
                <Link href={`preview/${name}/${name}${index}`}>
                  <Button>Print Preview</Button>
                </Link>
              </div>
              {name === "hallplan" && <HallPLanTable index={index} />}
              {name === "attendance" && <AttendanceTable index={index} />}
              {name === "seatarrangement" && (
                <HallArrangementTable index={index} />
              )}
            </div>
          ))}
        </div>
      )}
      {
        <h1 className="rounded-md bg-slate-100 p-2 sm:hidden">
          View In Desktop to see table
        </h1>
      }
    </section>
  );
};

export default DisplayPlan;
