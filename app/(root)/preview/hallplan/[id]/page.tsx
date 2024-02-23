"use client";

import { usePathname } from "next/navigation";

import HeaderPreview from "@/components/display/header-preview";
import HallPLanTable from "@/components/tables/hall-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const index = Number(id?.charAt(id.length - 1));
  return (
    <div>
      <HeaderPreview name="HallPlan" />
      <HallPLanTable index={index} show={true} />
    </div>
  );
};

export default Page;
