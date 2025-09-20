import Navbar from "@/components/Navbar";

const ProjectsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 p-8 w-full mt-16">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p>
          Welcome to your projects. Here you can find all the projects you have
          created or are currently member of.
        </p>
        <div className="flex flex-col gap-2 items-start justify-center">
          {children}
        </div>
      </div>
    </>
  );
};
export default ProjectsLayout;
