import { Student } from "@/server/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataWrangleTheExcelData(data: any) {
  console.log(data);
  try {
    // format it into student data, remove the data that does fit under that category
    // input data is an array of objects containing the data from the excel sheet
    // remove the rows that don't match the format slno, regno, name, rollno, section
    const studentData: Student[] = [];
    const invalidRows: any[] = [];
    let i = 1;
    data.forEach((row: any, index: number) => {
      console.log(row);

      if (
        row.__EMPTY &&
        row.__EMPTY_1 &&
        row.__EMPTY_2 &&
        row.__EMPTY_3 &&
        !isNaN(parseInt(row.__EMPTY_1))
      ) {
        try {
          const student: Student = {
            sno: i++,
            name: row.__EMPTY_2,
            regno: row.__EMPTY_1,
            rollno: row.__EMPTY,
            section: row.__EMPTY_3,
          };
          studentData.push(student);
        } catch (error) {
          invalidRows.push(row);
        }
      }
    });
    console.log(studentData);
    return studentData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function yearFromStartYear(startYear: number): 1 | 2 | 3 | 4 {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const currentStartYear = currentMonth >= 6 ? currentYear : currentYear - 1;

  return Math.max(1, Math.min(4, currentStartYear - startYear + 1)) as
    | 1
    | 2
    | 3
    | 4;
}

export function extractRollNo(rollno: string) {
  // 21CSXX
  const startYear = parseInt(rollno.slice(0, 2));
  const dept = rollno.slice(2, rollno.length - 3);
  const rno = parseInt(rollno.slice(rollno.length - 3));
  const year = yearFromStartYear(startYear);

  return { year, dept, rno };
}

export function exportHTMLTableToExcel(
  type: XLSX.BookType,
  tableId: string,
  fileName: string,
  isBase64: boolean = false
): File | null | string {
  var tableElement = document.getElementById(tableId);
  if (null == tableElement) return null;
  var workBook = XLSX.utils.table_to_book(tableElement, { sheet: "skills" });
  return isBase64
    ? XLSX.write(workBook, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(workBook, (fileName || "Skills") + "." + (type || "xlsx"));
}
