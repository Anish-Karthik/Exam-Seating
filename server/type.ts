export type Student = {
  name: string;
  sno: number;
  regno: number;
  rollno: string;
  section: string;
};

export type StudentsPerYear = {
  year: 1 | 2 | 3 | 4;
  semester: number;
  dept: string;
  strength: number;
  studentData: Student[];
};

export type Hall = {
  hallno: string;
  dept: string;
  studentsPerBench: 1 | 2;
  studentsPerHall: number;
  isSameYearPerBenchAllowed: boolean;
  benches: {
    rows: number;
    cols: number;
    extra: number;
  };
  isInterchange: boolean;
};

export type ExamTimings = {
  startTime: string;
  endTime: string;
  duration: number;
  startDate: string;
  endDate: string;
};

export type HallPlan = {
  section: string;
  hallno: string;
  totalStrength: number;
  rollNo: {
    from: string;
    to: string;
  };
  year: string;
  semester: string;
  dept: string;
};

// expected output type is HallPlanPerYear[]
export type HallPlanPerYear = HallPlan[];

export type Seat = [string, string] | [string];
// expected output type is HallArrangementPlan[]
export type HallArrangementPlan = {
  hallArrangement: Seat[][];
  hallStrength: number;
  hallno: string;
};

// expected output type is AttendanceSheet[] (i.e. AttendaceSheet for all halls)
export type AttendanceSheet = {
  hallno: string;
  studentData: Student[];
};
