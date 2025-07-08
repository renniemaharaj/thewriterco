import { User } from "firebase/auth";
import { AuthResult } from "../../../../app/api/auth/authTypes";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../../app/api/auth/authSlice";

const useAuthResultSyncer = () => {
  const dispatch = useDispatch();

  const noAuthResult = useMemo<AuthResult>(
    () => ({
      user: null,
      accessToken: null,
      message: "User signed out",
    }),
    [],
  );
  return (user: User | null, token?: string) => {
    if (user) {
      const parts = user.displayName?.split(" ");
      const fname = parts?.[0] || "";
      const lname = parts?.slice(1).join(" ") || "";
      const authResult: AuthResult = {
        user: {
          _id: user.uid,
          userName: user.displayName || "",
          firstName: fname,
          lastName: lname,
          emailAddress: user.email || "",
        },
        accessToken: token ?? "",
      };
      dispatch(setCredentials(authResult));
    } else {
      dispatch(setCredentials(noAuthResult));
    }
  };
};
export default useAuthResultSyncer;
