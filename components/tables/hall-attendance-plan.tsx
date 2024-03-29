import { useCallback, useEffect, useState } from "react";
import { extractDataFromRollno } from "@/server/hallplan";
import { AttendanceSheet } from "@/server/type";
import { HallAttendancesState } from "@/store/atoms";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import { useDurationDetails } from "@/hooks/use-duration-details";

import DateOfExamModal from "../mini-components/date-of-exam-modal";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

// rollno: 'I-A(31)-I-CSE-92132313031-BLESSY CATHERINE V'

function extractRollNo(rollno: string) {
  // 'I-A(31)-I-CSE-92132313031-BLESSY CATHERINE V'
  const [year, roll, semester, dept, regno, name] = rollno.split("-");
  return { year, roll, semester, dept, regno, name, section: roll[0] };
}

const AttendanceTable = ({
  index,
  show = false,
}: {
  index: number;
  show?: boolean;
}) => {
  const id = `attendance${index}`;
  const attendances = useRecoilValue(HallAttendancesState);
  const [data, setData] = useState<AttendanceSheet>();
  const { details } = useDurationDetails();
  const getAllSections = useCallback(() => {
    const sections = new Set<string>();
    data?.studentData.forEach((student) => {
      sections.add(extractRollNo(student.rollno).section);
    });
    return Array.from(sections);
  }, [data?.studentData]);
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
  const allSections = getAllSections();

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
      {show && (
        <div className="font-semibold">
          <div className="flex justify-between ">
            {/* Year: IV – A      Semester: VII       Degree: B.E       Branch: CSE */}
            <div>
              Year: {year} - {allSections.join(" & ")}
            </div>
            <div>Semester: {semester}</div>
            <div>Degree: B.E</div>
            <div>Branch: {branch}</div>
          </div>
          <div className="flex justify-between">
            {/* Hall No.:CSE209           Date of Exam: 14-9-23(FN) */}
            <div>Hall No.: {data.hallno}</div>
            <DateOfExamModal />
          </div>
        </div>
      )}
      <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:w-screen max-sm:border max-sm:px-2">
        <div className="table-responsive !text-[11px]">
          <table className="table-bordered mx-auto table" id={id}>
            <thead>
              <tr>
                <th rowSpan={2} className="border px-1 !text-[12px]">
                  R.No
                </th>
                <th rowSpan={1} className="border px-1 !text-[12px]">
                  Hall No {data.hallno}
                </th>
                <th rowSpan={2} className="border px-1 !text-[12px]">
                  Name
                </th>
                {/* <th
                  rowSpan={2}
                  className="max-w-[100px] whitespace-normal border px-1  md:max-w-[200px]"
                >
                  Section
                </th> */}
                {/* Can display all exams date */}
                {details.map(({ date, timings }, ind) => (
                  <th
                    key={`${data.hallno}-${ind}`}
                    className="border px-1 "
                    colSpan={timings.fn && timings.an ? 2 : 1}
                    rowSpan={!(timings.an || timings.fn) ? 2 : 1}
                  >
                    {format(date || new Date(), "dd/MM/yy")}
                  </th>
                ))}
              </tr>
              <tr>
                <th rowSpan={1} className="border px-1 ">
                  Register No
                </th>
                {/* Can display all exams session */}
                {details.map(({ date, timings }, ind) => (
                  <>
                    {timings.fn && (
                      <th
                        key={`${data.hallno}-${ind}`}
                        className="border px-1 "
                      >
                        FN
                      </th>
                    )}
                    {timings.an && (
                      <th
                        key={`${data.hallno}-${ind}`}
                        className="border px-1 "
                      >
                        AN
                      </th>
                    )}
                    {!(timings.an || timings.fn) && <td />}
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.studentData.map((student, ind) => (
                <tr key={`${data.hallno}-${ind}`}>
                  <td
                    key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                    className="border px-1 !text-[12px]"
                  >
                    {extractDataFromRollno(student.rollno).rollNo}
                  </td>
                  <td
                    key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                    className="border px-1 !text-[12px]"
                  >
                    {student.regno}
                  </td>
                  <td
                    key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                    className="border px-1 !text-[12px]"
                  >
                    {student.name}
                  </td>
                  {/* <td
                    key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                    className="border px-1 "
                  >
                    {student.section}
                  </td> */}
                  {/* Can display all empty cells to allow manual signature */}
                  {details.map(({ date, timings }, ind) => (
                    <>
                      {timings.fn && (
                        <td
                          key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                          className="border "
                        ></td>
                      )}
                      {timings.an && (
                        <td
                          key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                          className="border "
                        ></td>
                      )}
                      {!(timings.an || timings.fn) && <td className="border" />}
                    </>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border text-center font-bold" colSpan={3}>
                  Number of Students Present :
                </td>
                {details.map(({ date, timings }, ind) => (
                  <td className="border" />
                ))}
              </tr>
              <tr>
                <td className="border text-center font-bold" colSpan={3}>
                  Number of Students Absent :
                </td>
                {details.map(({ date, timings }, ind) => (
                  <td className="border" />
                ))}
              </tr>
              <tr>
                <td className="border text-center font-bold" colSpan={3}>
                  Invigilator Signature
                </td>
                {details.map(({ date, timings }, ind) => (
                  <td className="border" />
                ))}
              </tr>
              <tr>
                <td className="border text-center font-bold" colSpan={3}>
                  Designation &amp;Department
                </td>
                {details.map(({ date, timings }, ind) => (
                  <td className="border" />
                ))}
              </tr>

              <tr>
                <td className="text-center font-bold" colSpan={3}>
                  Note:Mark “AB” for Absent
                </td>
                {details.map(({ date, timings }, ind) => (
                  <td />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default AttendanceTable;
