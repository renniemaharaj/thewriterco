import { Avatar as RAvatar } from "@radix-ui/themes";
import useUserLikelySignedIn from "../../firebase/auth/hooks/useUserLikelySignedIn";
const Avatar = ({ role }: { role: string }) => {
  const { user } = useUserLikelySignedIn();
  return (
    <RAvatar
      size={"1"}
      className={`h-6 w-6`}
      src={role === "model" ? "M" : (user?.photoURL ?? "U")}
      fallback={role === "model" ? "M" : "U"}
    />
  );
};

export default Avatar;
