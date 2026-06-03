import { Button } from "@/components/ui/button";

interface AddCardButtonProps {
  onClick?: () => void;
  userId: string;
}

const AddCardButton = ({ userId, onClick }: AddCardButtonProps) => {
  //TODO : Add a card logic here
  return (
    <Button
      className="justify-start bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 transition-colors duration-200 cursor-pointer mx-2 mb-2"
      onClick={onClick}
    >
      + Add a card
    </Button>
  );
};

export default AddCardButton;
