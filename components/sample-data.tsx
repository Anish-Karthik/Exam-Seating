
import React from 'react'

const SampleData = () => {
  return (
    <div className='max-xs:hidden'>
      <div className="table-responsive">
        <table className="table table-bordered mx-auto">
          <thead>
            <tr>
              <th className="px-4 max-sm:max-w-[120px] py-2" colSpan={4}>(Student Data)Your Input Excel/spreadSheet file must be of this format</th>
            </tr>
            <tr>
              <th className="px-1 max-sm:max-w-[120px] py-2">S.No</th>
              <th className="px-1 max-sm:max-w-[120px] py-2">Roll No</th>
              <th className="px-1 max-sm:max-w-[120px] py-2">Reg No</th>
              <th className="px-1 max-sm:max-w-[120px] py-2">Name</th>
              <th className="px-1 max-sm:max-w-[120px] py-2">Section</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-1 max-sm:max-w-[120px] py-2">1</td>
              <td className="border px-1 max-sm:max-w-[120px] py-2">21CSXXX</td>
              <td className="border px-1 max-sm:max-w-[120px] py-2">92132313XXX</td>
              <td className="border px-1 max-sm:max-w-[120px] py-2">Name</td>
              <td className="border px-1 max-sm:max-w-[120px] py-2">A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SampleData