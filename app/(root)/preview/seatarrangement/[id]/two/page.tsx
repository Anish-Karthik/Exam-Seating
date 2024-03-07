"use client";

import { usePathname } from "next/navigation";

import HeaderPreview from "@/components/display/header-preview";
import HallArrangementTable from "@/components/tables/hall-arrangement-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[pathname.split("/").length - 2];
  const index = Number(id?.charAt(id.length - 1));
  return (
    <div>
      <HeaderPreview name="Seating Arrangement" />
      <HallArrangementTable index={index} show={true} />
      <HeaderPreview name="Seating Arrangement" className="mt-8" />
      <HallArrangementTable index={index + 1} show={true} />
    </div>
  );
};

export default Page;
