import { ReactNode } from "react";

const GridItemsWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {children}
    </div>
  );
};

export default GridItemsWrapper;
