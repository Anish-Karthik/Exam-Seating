import { HallPlan } from "@/server/type";

const HallPLanTable = ({ data, id }: { data: HallPlan[]; id: number }) => {
  return (
    <div className="table-responsive">
      <table className="table-bordered mx-auto table" id={`hallplan${id}`}>
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
            <tr key={`${hall.hallno}-hallplan-${ind}`}>
              <td className="border px-4 py-2 text-center">{hall.year}</td>
              <td className="border px-4 py-2 text-center">{hall.section}</td>
              <td className="border px-4 py-2 text-center">
                {hall.rollNo.from}
              </td>
              <td className="border px-4 py-2 text-center">{hall.rollNo.to}</td>
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
  )
}

export default HallPLanTable
