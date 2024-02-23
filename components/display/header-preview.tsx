import React from "react";

import {
  useCollegeDetails,
  usePreviewCollegeDetails,
} from "@/hooks/use-college-details";

import PreviewDetails from "./preview-details";

const HeaderPreview = ({
  isSubmitted = true,
  name = "HallPlan",
}: {
  isSubmitted?: boolean;
  name?: string;
}) => {
  const { collegeDetails: collegeDetailsPreview } = usePreviewCollegeDetails();
  const { collegeDetails } = useCollegeDetails();
  return (
    <PreviewDetails
      collegeDetails={isSubmitted ? collegeDetails : collegeDetailsPreview}
      name={name}
    />
  );
};

export default HeaderPreview;
