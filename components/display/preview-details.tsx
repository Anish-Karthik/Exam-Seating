import React from "react";

import { CollegeDetails } from "@/hooks/use-college-details";

const PreviewDetails = ({
  collegeDetails,
}: {
  collegeDetails: CollegeDetails;
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className="text-3xl font-bold">Header Preview</h1>
      <div className="mt-4 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold">
          {`${collegeDetails.collegeName || "College Name"}, ${
            collegeDetails.districtName || "District"
          }`.toUpperCase()}
        </h2>
        <h3 className="text-xl font-semibold">
          {"("}
          {collegeDetails.description || "Description"}
          {")"}
        </h3>
        <h3 className="text-xl font-semibold">
          {`Department of ${
            collegeDetails.department || "Department Name"
          }`.toUpperCase()}
        </h3>
        <h3 className="text-xl font-semibold">
          {collegeDetails.examName || "Exam Name"}
        </h3>
        <h3 className="text-xl font-semibold underline">
          {`HALLPLAN - ${collegeDetails.departmentCode || "DEPT-CODE"} (${
            collegeDetails.academicYear || "Academic Year"
          }) ${collegeDetails.semester || "ODD/EVEN"}`}
        </h3>
      </div>
    </div>
  );
};

export default PreviewDetails;
