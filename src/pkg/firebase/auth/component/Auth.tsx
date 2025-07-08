import { useEffect, useCallback, useState, useMemo } from "react";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  signInWithPopup,
} from "firebase/auth";

import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { Avatar, Button } from "@radix-ui/themes";
import { AuthResult } from "../../../../app/api/auth/authTypes";
import { setCredentials } from "../../../../app/api/auth/authSlice";
import { auth } from "../../firebase";

const Auth = ({ variant = "button" }: { variant?: "image" | "button" }) => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();

  const noAuthResult = useMemo<AuthResult>(
    () => ({
      user: null,
      accessToken: null,
      message: "User signed out",
    }),
    [],
  );

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
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const renderAvatar = useCallback(
    (size?: "1" | "2" | "3") => (
      <Avatar
        size={size ?? "3"}
        src={user?.photoURL || ""}
        fallback={user?.displayName?.[0] || "?"}
        radius="full"
        className="cursor-pointer"
      />
    ),
    [user],
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const parts = firebaseUser.displayName?.split(" ");
        const fname = parts?.[0] || "";
        const lname = parts?.slice(1).join(" ") || "";
        const authResult: AuthResult = {
          user: {
            _id: firebaseUser.uid,
            userName: firebaseUser.displayName || "",
            firstName: fname,
            lastName: lname,
            emailAddress: firebaseUser.email || "",
          },
          accessToken: token,
        };
        dispatch(setCredentials(authResult));
        setUser(firebaseUser);
      } else {
        dispatch(setCredentials(noAuthResult));
        setUser(null);
      }
    });
    return () => unsub();
  }, [dispatch, noAuthResult]);

  return variant === "image" ? (
    <UserCard
      user={user}
      renderAvatar={renderAvatar}
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
