import Navbar from "@/components/navbar";

const BoardsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default BoardsLayout;
