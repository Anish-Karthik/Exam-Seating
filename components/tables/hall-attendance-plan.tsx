import React from "react"
import { AttendanceSheet } from "@/server/type"

const AttendanceTable = ({
  data,
  id,
}: {
  data: AttendanceSheet
  id: string
}) => {
  return (
    <div className="table-responsive">
      <table className="table-bordered mx-auto table" id={id}>
        <thead>
          <tr>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              S.No
            </th>
            <th rowSpan={1} className="border px-4 py-2 text-center">
              Hall No {data.hallno}
            </th>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              Name
            </th>
            <th rowSpan={2} className="border px-4 py-2 text-center">
              Section
            </th>
            {/* Can display all exams date */}
          </tr>
          <tr>
            <th rowSpan={1} className="border px-4 py-2 text-center">
              Register No
            </th>
            {/* Can display all exams session */}
          </tr>
        </thead>
        <tbody>
          {data.studentData.map((student, ind) => (
            <tr key={`${data.hallno}-${ind}`}>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.sno}
              </td>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.regno}
              </td>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.name}
              </td>
              <td
                key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                className="border px-4 py-2 text-center"
              >
                {student.section}
              </td>
              {/* Can display all empty cells to allow manual signature */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceTable
