import { Button } from "@/components/ui/button";

const AddCardButton = () => {
  return (
    <Button className="justify-start bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 transition-colors duration-200 cursor-pointer mx-2 mb-2">
      + Add a card
    </Button>
  );
};

export default AddCardButton;
