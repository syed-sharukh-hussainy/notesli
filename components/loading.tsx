import React from "react";
import { Disc3, Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loading;
