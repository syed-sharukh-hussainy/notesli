import { Ghost } from "lucide-react";
import React from "react";

const EmptyList = () => {
  return (
    <div className="mt-28 md:mt-36 flex flex-col items-center gap-2">
      <Ghost className="h-10 w-10 md:h-12 md:w-12" />
      <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
        You don&apos;t have any items yet
      </h3>
      {/* <p className="text-muted-foreground text-xs md:text-xl">
            Click on add notebook button to create new notebook
          </p> */}
    </div>
  );
};

export default EmptyList;
