"use client";

import { usePathname } from "next/navigation";

import HeaderPreview from "@/components/display/header-preview";
import HallArrangementTable from "@/components/tables/hall-arrangement-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const index = Number(id?.charAt(id.length - 1));
  return (
    <div>
      <HeaderPreview name="Seating Arrangement" />
      <HallArrangementTable index={index} />
    </div>
  );
};

export default Page;
