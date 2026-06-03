import { type RefCallback } from "react";

interface BoardColumnHeaderProps {
  index: number;
  name: string;
  handlerRef: RefCallback<HTMLElement>;
}
const BoardColumnHeader = ({ index, name, handlerRef }: BoardColumnHeaderProps) => {
  return (
    <div ref={handlerRef} className="px-2 pt-2">
      <h3 className="text-sm font-semibold text-gray-500 cursor-pointer">
        {name}
      </h3>
    </div>
  );
};

export default BoardColumnHeader;
