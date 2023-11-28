"use client";

import { usePathname } from "next/navigation";

import HallArrangementTable from "@/components/tables/hall-arrangement-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const index = Number(id?.charAt(id.length - 1));
  return <HallArrangementTable index={index} />;
};

export default Page;
