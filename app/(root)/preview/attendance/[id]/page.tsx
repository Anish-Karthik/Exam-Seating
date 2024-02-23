"use client";

import { usePathname } from "next/navigation";

import HeaderPreview from "@/components/display/header-preview";
import AttendanceTable from "@/components/tables/hall-attendance-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const index = Number(id?.charAt(id.length - 1));
  return (
    <div>
      <HeaderPreview name="attendance Sheet" />
      <AttendanceTable index={index} />
    </div>
  );
};

export default Page;
