interface BoardColumnHeaderProps {
  index: number;
  name: string;
}
const BoardColumnHeader = ({ index, name }: BoardColumnHeaderProps) => {
  return (
    <div className="px-2 pt-2">
      <h3 className="text-sm font-semibold text-gray-500 cursor-pointer">
        {name}
      </h3>
    </div>
  );
};

export default BoardColumnHeader;
