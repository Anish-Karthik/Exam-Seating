import { mergedDataState } from "@/store/atoms/form";
import { studentPerYearState } from "@/store/selectors";
import { useRecoilValue } from "recoil";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const DisplayStudentInputData = () => {
  const data = useRecoilValue(studentPerYearState);
  return (
    <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:border">
      <div className="">
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
                data.studentData.map((d, i) => (
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DisplayStudentInputData;
