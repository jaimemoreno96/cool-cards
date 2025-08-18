const ProjectsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col gap-2 items-start justify-center p-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <p>Welcome to your projects. Here you can find all the projects you have created or are currently member of.</p>
      {children}
    </div>
  );
};
export default ProjectsLayout;
