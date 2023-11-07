export type Student = {
  name: string;
  regno: number;
  rollno: string;
  section: string;
};

export type StudentsPerYear = {
  year: 1 | 2 | 3 | 4;
  dept: string;
  strength: number;
  studentData: Student[];
};

export type Hall = {
  hallno: number;
  dept: string;
  studentsPerBench: 1 | 2;
  studentsPerHall: number;
  isSameYearPerBenchAllowed: boolean;
  benches: {
    rows: number;
    cols: number;
    total?: number;
  };
};

export type ExamTimings = {
  startTime: string;
  endTime: string;
  duration: number;
  startDate: string;
  endDate: string;
};
