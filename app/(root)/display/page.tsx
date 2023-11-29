"use client";

import dynamic from "next/dynamic";

const DisplayPage = dynamic(() => import("@/components/display/display-page"), {
  ssr: false,
});

const page = () => {
  return <DisplayPage />;
};

export default page;
