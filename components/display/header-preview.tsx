import React from "react";

import {
  useCollegeDetails,
  usePreviewCollegeDetails,
} from "@/hooks/use-college-details";

import PreviewDetails from "./preview-details";

const HeaderPreview = ({
  isSubmitted = true,
  name = "HallPlan",
  className,
}: {
  isSubmitted?: boolean;
  name?: string;
  className?: string;
}) => {
  const { collegeDetails: collegeDetailsPreview } = usePreviewCollegeDetails();
  const { collegeDetails } = useCollegeDetails();
  return (
    <PreviewDetails
      collegeDetails={isSubmitted ? collegeDetails : collegeDetailsPreview}
      name={name}
      className={className}
    />
  );
};

export default HeaderPreview;
