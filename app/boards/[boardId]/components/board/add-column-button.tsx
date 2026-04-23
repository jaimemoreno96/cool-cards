import { Button } from "@/components/ui/button";

const AddColumnButton = () => {
  return (
    <Button className="justify-start bg-white/70 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 transition-colors duration-200 cursor-pointer">
      + Add a column
    </Button>
  );
};

export default AddColumnButton;
