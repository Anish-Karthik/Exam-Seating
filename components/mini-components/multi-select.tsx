import React from "react";
import { ClipLoader } from "react-spinners";

import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from "@/components/ui/fancy-select";

type MultipleSelectorProps = {
  //need to set type properly
  defaultValues: string[];
};
const MultipleSelectorDemo = ({ defaultValues }: MultipleSelectorProps) => {
  const defaultItems: Option[] =
    defaultValues?.map((item: any) => {
      return { label: item, value: item };
    }) || [];

  const ref = React.useRef<MultipleSelectorRef>(null);

  return (
    <div className="w-full">
      <MultipleSelector
        value={defaultItems}
        placeholder="Select user"
        emptyIndicator={
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorDemo;
