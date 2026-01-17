import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { nukeSystemMessages } from "../../../app/chat/chatSlice";
import type { ActionHandler } from "./types";
import useSendHandler from "./useSendHandler";

const useActionHandler = () => {
  const { sendHandler } = useSendHandler();
  const dispatch = useDispatch();
  const actionHandler = useCallback(
    ({ action, scrollHandler }: ActionHandler) => {
      switch (action) {
        case "fix":
          sendHandler({
            msg: "-@here Respond correctly, in defined schema. Validation failing.",
            defaultSending: false,
            scrollHandler: scrollHandler,
          });

          dispatch(nukeSystemMessages());
          break;
      }
    },
    [sendHandler, dispatch],
  );

  return { actionHandler };
};
export default useActionHandler;
