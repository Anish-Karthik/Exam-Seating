import { useEffect } from "react"
import { HallPlansState } from "@/store/atoms"
import { hallsState } from "@/store/atoms/form"
import { studentPerYearState } from "@/store/selectors"
import { sampleHallPlans } from "@/test/sample-data"
import { useRecoilState, useRecoilValue } from "recoil"

import { generateHallPlan } from "@/lib/actions"
import { ExportSkillsToExcel } from "@/lib/utils"

import HallPLanTable from "../tables/hall-plan"
import { Button } from "../ui/button"

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
        hallPlans.map((hallPlan, index) => (
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold">Hall Plan {index + 1}</h1>
              <Button
                onClick={() =>
                  ExportSkillsToExcel(
                    "xlsx",
                    `hallplan${index}`,
                    `hallplan${index + 1}`
                  )
                }
              >
                Download
              </Button>
            </div>
            <HallPLanTable hallPlan={hallPlan} id={`hallplan${index}`} />
          </div>
        ))
      )}
    </section>
  )
}

export default DisplayHallplan
