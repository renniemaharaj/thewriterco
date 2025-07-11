import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useCallback } from "react";
import useUserLikelySignedIn from "../../firebase/auth/hooks/useUserLikelySignedIn";

const useBuildContexts = () => {
  const readerState = useSelector((state: RootState) => state.reader);
  const chatState = useSelector((state: RootState) => state.chat);
  const { user } = useUserLikelySignedIn();

  const buildContexts = useCallback(() => {
    const attachedBookState = `${readerState.eBook.title} ${readerState.currentChapter}:${readerState.currentVerse}`;

    const attachedResponseConstraint = chatState.responseConstraint;
    return [
      { currentUser: user?.displayName },
      { themeMode: "Please don't use custom colors styles" },
      { bookState: attachedBookState },
      { responseConstraint: attachedResponseConstraint },
      {
        constraintInstruction:
          "responseConstraint is a value from the union: shorter | short | detailed where detailed is 70+ words",
      },
    ];
  }, [user, readerState, chatState]);

  return { buildContexts };
};

export default useBuildContexts;
