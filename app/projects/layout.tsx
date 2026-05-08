import Navbar from "@/components/navbar/navbar";

const ProjectsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};
export default ProjectsLayout;
