import { Outlet } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Unauthenticated from "./page/views/Unauthenticated";

export const RequireAuth = () => {
  const [token, setToken] = useState<string>("?");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        if (token) {
          setToken(token);
        }
        return;
      }
      setToken("?");
    });
    return () => unsub();
  }, []);
  return token === "?" ? <Unauthenticated /> : <Outlet />;
};
