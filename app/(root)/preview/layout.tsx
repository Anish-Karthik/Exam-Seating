import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div id="preview">{children}</div>;
};

export default layout;
