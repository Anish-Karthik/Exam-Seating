"use client";

import dynamic from "next/dynamic";

const MainForm = dynamic(() => import("@/components/forms/main-form"), {
  ssr: false,
});
const Page = () => {
  return <MainForm />;
};

export default Page;
