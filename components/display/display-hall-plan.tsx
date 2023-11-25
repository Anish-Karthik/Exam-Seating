import { useEffect } from "react"
import { HallPlansState } from "@/store/atoms"
import { hallsState } from "@/store/atoms/form"
import { studentPerYearState } from "@/store/selectors"
import { sampleHallPlans } from "@/test/sample-data"
import { useRecoilState, useRecoilValue } from "recoil"

import { generateHallPlan } from "@/lib/actions"

import HallPLanTable from "../tables/hall-plan"

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
        <div>
          <h1 className="text-2xl font-bold">No Hall Plan</h1>
          <p>Please fill in the form to generate the hall plan.</p>
        </div>
      ) : (
        hallPlans.map((hallPlan, index) => (
          <div className="flex flex-col gap-8">
            <div></div>
            <HallPLanTable hallPlan={hallPlan} />
          </div>
        ))
      )}
    </section>
  )
}

export default DisplayHallplan
