import { useEffect, useState } from "react"
import Link from "next/link"
import {
  AttendanceSheet,
  Hall,
  HallArrangementPlan,
  HallPlanPerYear,
  StudentsPerYear,
} from "@/server/type"
import { hallsState } from "@/store/atoms/form"
import { studentPerYearState } from "@/store/selectors"
import { useRecoilValue } from "recoil"

import { exportHTMLTableToExcel } from "@/lib/utils"

import HallArrangementTable from "../tables/hall-arrangement-plan"
import AttendanceTable from "../tables/hall-attendance-plan"
import HallPLanTable from "../tables/hall-plan"
import { Button } from "../ui/button"
import DisplayDownloadOptions from "./display-download-options"

const DisplayPlan = ({
  generatePlan,
  name,
  sampledata,
}: {
  generatePlan: (
    studentsPerYearData: StudentsPerYear[],
    halls: Hall[]
  ) => Promise<HallArrangementPlan[] | HallPlanPerYear[] | AttendanceSheet[]>
  name: "hallplan" | "seatarrangement" | "attendance"
  sampledata: HallArrangementPlan[] | HallPlanPerYear[] | AttendanceSheet[]
}) => {
  const studentsPerYearData = useRecoilValue(studentPerYearState)
  const hallsData = useRecoilValue(hallsState)
  const [data, setData] = useState([])

  useEffect(() => {
    // TODO
    ;(async () => {
      const res = await generatePlan(studentsPerYearData, hallsData)
      // @ts-ignore
      setData((prev) => [...res])
      console.log(res)
    })()
    console.log(sampledata)
  }, [generatePlan, hallsData, sampledata, setData, studentsPerYearData])

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
              {name === "hallplan" && (
                <HallPLanTable
                  data={plan as HallPlanPerYear}
                  id={`${name}${index}`}
                />
              )}
              {name === "attendance" && (
                <AttendanceTable
                  data={plan as AttendanceSheet}
                  id={`${name}${index}`}
                />
              )}
              {name === "seatarrangement" && (
                <HallArrangementTable
                  data={plan as HallArrangementPlan}
                  id={`${name}${index}`}
                />
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
  )
}

export default DisplayPlan
