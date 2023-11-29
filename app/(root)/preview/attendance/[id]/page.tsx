"use client";

import { usePathname } from "next/navigation";

import AttendanceTable from "@/components/tables/hall-attendance-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const index = Number(id?.charAt(id.length - 1));
  return <AttendanceTable index={index} />;
};

export default Page;
