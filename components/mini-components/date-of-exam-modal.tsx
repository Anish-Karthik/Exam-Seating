import React from "react";
import { format } from "date-fns";

import { useDurationDetails } from "@/hooks/use-duration-details";

const DateOfExamModal = () => {
  const { getStartDate, getEndDate } = useDurationDetails();
  return (
    <div>
      Date of Exam: {format(getStartDate(), "dd-MM-yy")}
      {getStartDate() === getEndDate()
        ? null
        : " - " + format(getEndDate(), "dd-MM-yy")}
    </div>
  );
};

export default DateOfExamModal;
