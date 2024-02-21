import React from "react";

import {
  useCollegeDetails,
  usePreviewCollegeDetails,
} from "@/hooks/use-college-details";

import PreviewDetails from "./preview-details";

/*
PSNA COLLEGE OF ENGINEERING AND TECHNOLOGY, DINDIGUL
(An Autonomous Institution affiliated to Anna University)
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING

SERIAL TEST - I

HALLPLAN - CSE (2023-2024) ODD
 */

const HeaderPreview = ({ isSubmitted }: { isSubmitted: boolean }) => {
  const { collegeDetails: collegeDetailsPreview } = usePreviewCollegeDetails();
  const { collegeDetails } = useCollegeDetails();
  return (
    <PreviewDetails
      collegeDetails={isSubmitted ? collegeDetails : collegeDetailsPreview}
    />
  );
};

export default HeaderPreview;
