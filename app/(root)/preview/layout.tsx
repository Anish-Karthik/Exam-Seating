import { PropsWithChildren } from "react";

import Export from "@/components/export-to-pdf";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-2 h-20 w-full">
      <div>
        <Export />
      </div>
      <div id="preview">{children}</div>
    </div>
  );
};

export default layout;
