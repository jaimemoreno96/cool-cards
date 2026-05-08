import { Button } from "../ui/button";
import { handleSignOut } from "./logout-actions";

const Logout = () => {
  return (
    <form action={handleSignOut}>
      <Button className="rounded-sm text-sm font-normal" type="submit">
        Sign Out
      </Button>
    </form>
  );
};

export default Logout;
