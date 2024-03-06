import { Student } from "@/server/type";
import { clsx, type ClassValue } from "clsx";
import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const exportToPdf = () => {
  const canvas = document.getElementById("preview");

  if (!canvas) return;

  // use jspdf
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  });

  // download the pdf
  doc.save("canvas.pdf");
};

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
            name: row.__EMPTY_2 ?? row.name,
            regno: row.__EMPTY_1 ?? row.regno,
            rollno: row.__EMPTY ?? row.rollno,
            section: row.__EMPTY_3 ?? row.section,
          };
          studentData.push(student);
        } catch (error) {
          invalidRows.push(row);
        }
      }
      if (row.name && row.regno && row.rollno && row.section) {
        try {
          const student: Student = {
            sno: i++,
            name: row.name,
            regno: Number(row.regno),
            rollno: row.rollno.toString(),
            section: row.section,
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

export function romanToInt(s: string): number {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  // @ts-ignore
  const integers = s.split("").map((c) => roman[c]);
  const res = integers.reduce(
    (acc, x, i) => (x < integers[i + 1] ? acc - x : acc + x),
    0
  );
  return res;
}

export function intToRoman(num: number): string {
  const rNums: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let result = "";
  for (let rN in rNums) {
    let count = num / rNums[rN];
    if (count > 0) {
      result += rN.repeat(count);
      num = num % rNums[rN];
    }
  }
  return result;
}
