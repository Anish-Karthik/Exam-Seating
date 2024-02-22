import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CollegeDetails = {
  collegeName: string;
  department: string;
  departmentCode: string;
  examName: string;
  academicYear: string;
  semester: "ODD" | "EVEN";
  description?: string | undefined;
  districtName: string;
};

type UseCollegeDetails = {
  collegeDetails: CollegeDetails;
  setCollegeDetails: (collegeDetails: CollegeDetails) => void;
  changeCollegeName: (collegeName: string) => void;
  changeDescription: (description: string) => void;
  changeDepartment: (department: string) => void;
  changeDepartmentCode: (departmentCode: string) => void;
  changeExamName: (examName: string) => void;
  changeAcademicYear: (academicYear: string) => void;
  changeSemester: (semester: "ODD" | "EVEN") => void;
  changeDistrictName: (districtName: string) => void;
};

type MyStateCreatorPersist = StateCreator<
  UseCollegeDetails,
  [],
  [["zustand/persist", CollegeDetails]]
>;
type MyStateCreator = StateCreator<UseCollegeDetails, []>;

const collegeDetailsStore: MyStateCreator = (set) => ({
  collegeDetails: {
    collegeName: "",
    description: "",
    department: "",
    departmentCode: "",
    examName: "",
    academicYear: "",
    semester: "ODD",
    districtName: "",
  },
  setCollegeDetails: (collegeDetails: CollegeDetails) =>
    set(() => ({
      collegeDetails,
    })),
  changeCollegeName: (collegeName: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        collegeName,
      },
    })),
  changeDescription: (description: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        description,
      },
    })),
  changeDepartment: (department: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        department,
      },
    })),
  changeDepartmentCode: (departmentCode: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        departmentCode,
      },
    })),
  changeExamName: (examName: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        examName,
      },
    })),
  changeAcademicYear: (academicYear: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        academicYear,
      },
    })),
  changeSemester: (semester: "ODD" | "EVEN") =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        semester,
      },
    })),
  changeDistrictName: (districtName: string) =>
    set((state) => ({
      collegeDetails: {
        ...state.collegeDetails,
        districtName,
      },
    })),
});

export const collegeDetailsStorePersist: MyStateCreatorPersist = persist(
  collegeDetailsStore,
  {
    name: "college-details",
    storage: createJSONStorage(() => localStorage),
  }
);

export const useCollegeDetails = create(collegeDetailsStorePersist);
export const usePreviewCollegeDetails = create(collegeDetailsStore);
