import { mergedDataState } from "@/store/atoms/form"
import { useRecoilValue } from "recoil"

const DisplayStudentInputData = () => {
  const data = useRecoilValue(mergedDataState)
  return (
    <div className="max-sm:hidden">
      <div className="table-responsive">
        <table className="table-bordered mx-auto table">
          <thead>
            <tr>
              <th className="px-4 py-2" colSpan={4}>
                Student Data
              </th>
            </tr>
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Roll No</th>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Section</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) =>
              data.map((d, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{d.sno}</td>
                  <td className="border px-4 py-2">{d.rollno}</td>
                  <td className="border px-4 py-2">{d.regno}</td>
                  <td className="border px-4 py-2">{d.name}</td>
                  <td className="border px-4 py-2">{d.section}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayStudentInputData