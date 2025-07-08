import { Avatar as RAvatar } from "@radix-ui/themes";
import useUserLikelySignedIn from "../../hooks/useUserLikelySignedIn";

const Avatar = ({ size }: { size?: "1" | "2" | "3" }) => {
  const { user } = useUserLikelySignedIn();
  return (
    <RAvatar
      size={size ?? "3"}
      src={user?.photoURL || ""}
      fallback={user?.displayName?.[0] || "?"}
      radius="full"
      className="cursor-pointer"
    />
  );
};

export default Avatar;
