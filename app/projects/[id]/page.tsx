const Project = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>Project {id}</div>;
};
export default Project;
