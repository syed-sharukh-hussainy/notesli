import { ReactNode } from "react";

const ItemWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border rounded-xl p-5 transition-all  opacity-90 hover:opacity-100 bg-secondary/50 group">
      {children}
    </div>
  );
};
export default ItemWrapper;
