import { useEffect, useCallback, useMemo } from "react";
import { GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";

import { useDispatch } from "react-redux";
import { Button } from "@radix-ui/themes";
import { AuthResult } from "../../../../app/api/auth/authTypes";
import { setCredentials } from "../../../../app/api/auth/authSlice";
import { auth } from "../../firebase";
import Card from "./user/Card";
import useUserLikelySignedIn from "../hooks/useUserLikelySignedIn";

const Auth = ({ variant = "button" }: { variant?: "image" | "button" }) => {
  const { user, token } = useUserLikelySignedIn();

  const dispatch = useDispatch();

  const handleSignIn = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed", err);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setCredentials(noAuthResult));
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const noAuthResult = useMemo<AuthResult>(
    () => ({
      user: null,
      accessToken: null,
      message: "User signed out",
    }),
    [],
  );

  useEffect(() => {
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
        accessToken: token,
      };
      dispatch(setCredentials(authResult));
    } else {
      dispatch(setCredentials(noAuthResult));
    }
  }, [user, token, dispatch, noAuthResult]);

  return variant === "image" ? (
    <Card
      user={user}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
    />
  ) : (
    <Button variant="soft" onClick={handleSignIn}>
      Sign In
    </Button>
  );
};

export default Auth;
