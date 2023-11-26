import { useEffect } from "react"
import Link from "next/link"
import { HallPlansState } from "@/store/atoms"
import { hallsState } from "@/store/atoms/form"
import { studentPerYearState } from "@/store/selectors"
import { sampleHallPlans } from "@/test/sample-data"
import { useRecoilState, useRecoilValue } from "recoil"

import { generateHallPlan } from "@/lib/actions"
import { exportHTMLTableToExcel } from "@/lib/utils"

import HallPLanTable from "../tables/hall-plan"
import { Button } from "../ui/button"
import DisplayDownloadOptions from "./display-download-options"

const DisplayHallplan = () => {
  const studentsPerYearData = useRecoilValue(studentPerYearState)
  const hallsData = useRecoilValue(hallsState)
  const [hallPlans, setHallPlans] = useRecoilState(HallPlansState)

  useEffect(() => {
    // TODO
    ;(async () => {
      const hallPlans = await generateHallPlan(studentsPerYearData, hallsData)
      setHallPlans([...hallPlans, ...sampleHallPlans])
    })()
    console.log(sampleHallPlans)
  }, [hallsData, setHallPlans, studentsPerYearData])

  return (
    <section className="h-full">
      {!(hallPlans && hallPlans.length) ? (
        <div className="">
          <h1 className="text-2xl font-bold">No Hall Plan</h1>
          <p>Please fill in the form to generate the hall plan.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-16">
          <DisplayDownloadOptions name="hallplan" size={hallPlans.length} />
          {hallPlans.map((hallPlan, index) => (
            <div className="flex max-w-6xl flex-col gap-8 max-sm:hidden">
              <div className="flex gap-2">
                <h1 className="text-2xl font-bold">Hall Plan {index + 1}</h1>
                <Button
                  onClick={() =>
                    exportHTMLTableToExcel(
                      "xlsx",
                      `hallplan${index}`,
                      `hallplan${index + 1}`
                    )
                  }
                >
                  Download
                </Button>
                <Link href={`preview/hall-plan/hallplan${index}`}>
                  <Button>Print Preview</Button>
                </Link>
              </div>
              <HallPLanTable hallPlan={hallPlan} id={`hallplan${index}`} />
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

export default DisplayHallplan
