import React from "react"

const SampleData = () => {
  return (
    <div className="max-xs:hidden">
      <div className="table-responsive">
        <table className="table-bordered mx-auto table">
          <thead>
            <tr>
              <th className="px-4 py-2 max-sm:max-w-[120px]" colSpan={4}>
                (Student Data)Your Input Excel/spreadSheet file must be of this
                format
              </th>
            </tr>
            <tr>
              <th className="px-1 py-2 max-sm:max-w-[120px]">S.No</th>
              <th className="px-1 py-2 max-sm:max-w-[120px]">Roll No</th>
              <th className="px-1 py-2 max-sm:max-w-[120px]">Reg No</th>
              <th className="px-1 py-2 max-sm:max-w-[120px]">Name</th>
              <th className="px-1 py-2 max-sm:max-w-[120px]">Section</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-1 py-2 max-sm:max-w-[120px]">1</td>
              <td className="border px-1 py-2 max-sm:max-w-[120px]">21CSXXX</td>
              <td className="border px-1 py-2 max-sm:max-w-[120px]">
                92132313XXX
              </td>
              <td className="border px-1 py-2 max-sm:max-w-[120px]">Name</td>
              <td className="border px-1 py-2 max-sm:max-w-[120px]">A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SampleData
