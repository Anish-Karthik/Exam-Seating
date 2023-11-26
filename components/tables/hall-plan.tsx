import React from "react"
import { HallPlan } from "@/server/type"

const HallPLanTable = ({
  hallPlan,
  id,
}: {
  hallPlan: HallPlan[]
  id: string
}) => {
  return (
    <div className="table-responsive">
      <table className="table-bordered mx-auto table" id={id}>
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="max-w-[100px] border px-4 py-2 text-center"
            >
              Year / Semester
            </th>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              Section
            </th>
            <th
              colSpan={2}
              rowSpan={1}
              className="border px-4 py-2 text-center"
            >
              Roll No
            </th>
            <th
              rowSpan={2}
              className="max-w-[100px] border px-4 py-2 text-center"
            >
              Hall No. & Total Strength
            </th>
            <th
              rowSpan={2}
              className="max-w-[100px] border px-4 py-2 text-center"
            >
              Block / Floor
            </th>
          </tr>
          <tr>
            <th className="border px-4 py-2">From</th>
            <th className="border px-4 py-2">To</th>
          </tr>
        </thead>
        <tbody>
          {hallPlan.map((hall, ind) => (
            <tr>
              <td className="border px-4 py-2 text-center">{hall.year}</td>
              <td className="border px-4 py-2 text-center">{hall.section}</td>
              <td className="border px-4 py-2 text-center">
                {hall.rollNo.from}
              </td>
              <td className="border px-4 py-2 text-center">{hall.rollNo.to}</td>
              <td className="border px-4 py-2 text-center">{hall.hallno}</td>
              {ind == 0 && (
                <td
                  rowSpan={hallPlan.length}
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
  )
}

export default HallPLanTable
