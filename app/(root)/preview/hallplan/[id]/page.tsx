"use client";

import { usePathname } from "next/navigation";

import HallPLanTable from "@/components/tables/hall-plan";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const index = Number(id?.charAt(id.length - 1));
  return <HallPLanTable index={index} />;
};

export default Page;
