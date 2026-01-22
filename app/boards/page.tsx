import { redirect } from "next/navigation";
import { cachedAuth } from "../lib/session";

const MetaData = {
  title: "Boards",
  description: "Boards",
};

const BoardsPage = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?callbackUrl=/boards");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Boards</h1>
      <p>
        Welcome to your boards. Here you can find all the boards you have
        created or are currently member of.
      </p>
    </>
  );
};
export default BoardsPage;
