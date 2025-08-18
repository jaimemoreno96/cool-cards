import { redirect } from "next/navigation";
import { cachedAuth } from "./lib/session";

const Home = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;
  if (user) {
    redirect("/projects");
  }
  redirect("/api/auth/signin?callbackUrl=/projects");
};
export default Home;
