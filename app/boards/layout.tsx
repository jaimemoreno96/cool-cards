import Navbar from "@/components/Navbar";

const BoardsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 p-8 w-full mt-16">
        <h1 className="text-2xl font-bold">Boards</h1>
        <p>
          Welcome to your boards here you can find all the boards you have
          created for the project.
        </p>
        <div className="flex flex-col gap-2 items-start justify-center p-4">
          {children}
        </div>
      </div>
    </>
  );
};
export default BoardsLayout;
