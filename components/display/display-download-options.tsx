import React from "react";
import Link from "next/link";

import { exportHTMLTableToExcel } from "@/lib/utils";

import { Button } from "../ui/button";

const DisplayDownloadOptions = ({
  name,
  size,
}: {
  name: "hallplan" | "seatarrangement" | "attendance" | "verticalcount";
  size: number;
}) => {
  const arr = new Array(size).fill(0);
  return (
    <div>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {name !== "seatarrangement" &&
          arr.map((_, index) => (
            <div>
              <div className="flex w-fit items-center gap-2 rounded-md bg-slate-100 p-1">
                <h1 className="text-lg font-bold xl:text-sm">
                  {name} {index + 1}
                </h1>
                <Button
                  onClick={() =>
                    exportHTMLTableToExcel(
                      "xlsx",
                      `${name}${index}`,
                      `${name}${index}`
                    )
                  }
                >
                  Download
                </Button>
                <Link href={`preview/${name}/${name}${index}`}>
                  <Button>Print Preview</Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      {name === "seatarrangement" && (
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {arr.map(
            (_, index) =>
              (index % 2 === 0 ||
                (arr.length % 2 === 1 && index === arr.length - 1)) && (
                <div>
                  <div className="flex w-fit items-center gap-2 rounded-md bg-slate-100 p-1">
                    <h1 className="text-lg font-bold xl:text-sm">
                      {name} {index + 1}, {index + 2} Halls
                    </h1>
                    <Button
                      onClick={() => {
                        exportHTMLTableToExcel(
                          "xlsx",
                          `${name}${index}`,
                          `${name}${index}`
                        );
                        if (arr.length % 2 === 1 && index === arr.length - 1)
                          return;
                        exportHTMLTableToExcel(
                          "xlsx",
                          `${name}${index + 1}`,
                          `${name}${index + 1}`
                        );
                      }}
                    >
                      Download
                    </Button>
                    <Link
                      href={`preview/${name}/${name}${index}/${
                        arr.length % 2 === 1 && index === arr.length - 1
                          ? ""
                          : "two"
                      }`}
                      target="_blank"
                    >
                      <Button>Print Preview</Button>
                    </Link>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayDownloadOptions;
