import Navbar from "@/components/Navbar";

const BoardsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-2 p-8 w-full mt-16">{children}</div>
    </>
  );
};
export default BoardsLayout;
