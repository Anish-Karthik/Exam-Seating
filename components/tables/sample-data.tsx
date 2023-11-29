import React from "react";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const SampleData = () => {
  return (
    <div className="pb-2">
      <div className="table-responsive">
        <div>
          <h6 className="px-4 py-2 font-semibold">
            (Student Data)Your Input Excel/spreadSheet file must be of this
            format
          </h6>
        </div>
        <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:border">
          <table className="table-bordered mx-auto table">
            <thead>
              <tr>
                <th className="border px-1 py-2 max-sm:max-w-[120px]">S.No</th>
                <th className="border px-1 py-2 max-sm:max-w-[120px]">
                  Roll No
                </th>
                <th className="border px-1 py-2 max-sm:max-w-[120px]">
                  Reg No
                </th>
                <th className="border px-1 py-2 max-sm:max-w-[120px]">Name</th>
                <th className="border px-1 py-2 max-sm:max-w-[120px]">
                  Section
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-1 py-2 max-sm:max-w-[120px]">1</td>
                <td className="border px-1 py-2 max-sm:max-w-[120px]">
                  21CSXXX
                </td>
                <td className="border px-1 py-2 max-sm:max-w-[120px]">
                  92132313XXX
                </td>
                <td className="border px-1 py-2 max-sm:max-w-[120px]">Name</td>
                <td className="border px-1 py-2 max-sm:max-w-[120px]">A</td>
              </tr>
            </tbody>
          </table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SampleData;
