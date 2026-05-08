import { Button } from "@/components/ui/button";

interface AddColumnButtonProps {
  userId?: string;
  onClick?: () => void;
}
const AddColumnButton = ({ userId, onClick }: AddColumnButtonProps) => {
  return (
    <Button
      className="justify-start bg-white/70 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      + Add a column
    </Button>
  );
};

export default AddColumnButton;
