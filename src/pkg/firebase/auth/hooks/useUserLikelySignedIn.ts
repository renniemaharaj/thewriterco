import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import useAuthResultSyncer from "./useAuthResultSyncer";

const useUserLikelySignedIn = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const syncAuthResult = useAuthResultSyncer();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const tok = await firebaseUser.getIdToken();
        syncAuthResult(firebaseUser, tok);
        setToken(tok);
        return;
      }
      syncAuthResult(null);
      setToken("");
      setUser(null);
    });
    return () => unsub();
  }, [syncAuthResult]);

  return { token: token, user: user };
};
export default useUserLikelySignedIn;
