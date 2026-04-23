interface BoardColumnHeaderProps {
  index: number;
}
const BoardColumnHeader = ({ index }: BoardColumnHeaderProps) => {
  return (
    <div className="px-2 pt-2">
      <h3 className="text-sm font-semibold text-gray-500 cursor-pointer">
        Column {index + 1}
      </h3>
    </div>
  );
};

export default BoardColumnHeader;
