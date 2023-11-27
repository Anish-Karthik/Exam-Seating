import React from "react"
import { HallArrangementPlan } from "@/server/type"

const HallArrangementTable = ({
  data,
  id,
}: {
  data: HallArrangementPlan
  id: string
}) => {
  return (
    <div className="table-responsive">
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
                    className="border px-4 py-2 text-center w-[100px]"
                  >
                    {seat[0]}
                  </td>
                ) : (
                  <>
                    <td
                      key={`${data.hallno}-${ind}-${data.hallno}-${seat.length}1`}
                      colSpan={1}
                      className="border px-4 py-2 text-center w-[100px]"
                    >
                      {seat[0]}
                    </td>
                    <td
                      key={`${data.hallno}-${ind}-${data.hallno}-${seat.length}2`}
                      colSpan={1}
                      className="border px-4 py-2 text-center w-[100px]"
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
    </div>
  )
}

export default HallArrangementTable
