import React from "react";

import { cn } from "@/lib/utils";
import { CollegeDetails } from "@/hooks/use-college-details";

const PreviewDetails = ({
  collegeDetails,
  name = "HallPlan",
  className,
}: {
  collegeDetails: CollegeDetails;
  name?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex h-full w-full flex-col items-center", className)}>
      <div className="text-md mt-4 flex flex-col items-center text-center">
        <h2 className="font-bold">
          {`${collegeDetails.collegeName || "College Name"}, ${
            collegeDetails.districtName || "District"
          }`.toUpperCase()}
        </h2>
        <h3 className="italic">
          {"("}
          {collegeDetails.description || "Description"}
          {")"}
        </h3>
        <h3 className="font-semibold">
          {`Department of ${
            collegeDetails.department || "Department Name"
          }`.toUpperCase()}
        </h3>
        <h3 className="font-semibold">
          {collegeDetails.examName || "Exam Name"}
        </h3>
        <h3 className="font-semibold underline">
          {`${name.toUpperCase()} - ${
            collegeDetails.departmentCode || "DEPT-CODE"
          } (${collegeDetails.academicYear || "Academic Year"}) ${
            collegeDetails.semester || "ODD/EVEN"
          }`}
        </h3>
      </div>
    </div>
  );
};

export default PreviewDetails;
