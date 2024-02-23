import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AttendanceSheet } from "@/server/type";
import { HallAttendancesState } from "@/store/atoms";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import { useDurationDetails } from "@/hooks/use-duration-details";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

// rollno: 'I-A(31)-I-CSE-92132313031-BLESSY CATHERINE V'

function extractRollNo(rollno: string) {
  // 'I-A(31)-I-CSE-92132313031-BLESSY CATHERINE V'
  const [year, roll, semester, dept, regno, name] = rollno.split("-");
  return { year, roll, semester, dept, regno, name, section: roll[0] };
}

const AttendanceTable = ({ index }: { index: number }) => {
  const id = `attendance${index}`;
  const router = useRouter();
  const pathname = usePathname();
  const attendances = useRecoilValue(HallAttendancesState);
  const [data, setData] = useState<AttendanceSheet>();
  const { getStartDate, getEndDate } = useDurationDetails();
  useEffect(() => {
    const data =
      attendances && attendances.length
        ? attendances
        : JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallAttendances) ||
              "[]"
          );
    console.log(data);
    setData(data[index]);
  }, [attendances, index]);

  if (!data) return <>Not found</>;
  console.log(data);
  console.log(data.studentData);
  const {
    year,
    dept: branch,
    name,
    regno,
    roll,
    semester,
    section,
  } = extractRollNo(data.studentData[0].rollno);
  return (
    <div>
      {pathname.split("/").includes("attendance") && (
        <div className="font-semibold">
          <div className="flex justify-between ">
            {/* Year: IV – A      Semester: VII       Degree: B.E       Branch: CSE */}
            <div>
              Year: {year} - {section}
            </div>
            <div>Semester: {semester}</div>
            <div>Degree: B.E</div>
            <div>Branch: {branch}</div>
          </div>
          <div className="flex justify-between">
            {/* Hall No.:CSE209           Date of Exam: 14-9-23(FN) */}
            <div>Hall No.: {data.hallno}</div>
            <div>
              Date of Exam: {getStartDate()}
              {getStartDate() === getEndDate() ? null : " - " + getEndDate()}
            </div>
          </div>
        </div>
      )}
      <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:w-screen max-sm:border max-sm:px-2">
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default AttendanceTable;
