import Navbar from "@/components/navbar/navbar";

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
