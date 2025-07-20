import { useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useBlockInterpreter from "./useBlockInterpreter";
import { Response } from "./types";
import useSocketCommands from "./useSocketCommands";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import {
  searchDisabledAtom,
  searchQueryAtom,
} from "../../../page/search/atoms/search";
import { pageErrorAtom } from "../../../page/atoms/page";
import { preferenceTagsAtom } from "../../../page/search/labs/atoms/labs";
import { customDecodeURI } from "../utils";
// import useReportReducers from "./useReportReducers";

/**
 * The Socket URL that the hook should connect to
 */
const socketURL = "https://news-go.onrender.com/ws";
// const socketURL = "ws://localhost:8080/ws";

const useSocketHandler = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL);
  const { interpret } = useBlockInterpreter();

  // Message received logic
  useEffect(() => {
    if (!lastMessage) return;
    const response = JSON.parse(lastMessage?.data) as Response;
    response.forEach((block) => interpret(block));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  // Subscribers, delegating via components and singleton socket
  const { stringify, feed, search } = useSocketCommands();

  // Feed subscriber
  const preferenceTags = useAtomValue(preferenceTagsAtom);
  const prevTagsRef = useRef<string[]>([]);

  const { searchQuery, resultTitle } = useParams();

  useEffect(() => {
    // Avoid sending if tags are empty or haven't changed
    if (!preferenceTags.length) return;

    const prevTags = prevTagsRef.current;
    const changed =
      prevTags.length !== preferenceTags.length ||
      prevTags.some((t, i) => t !== preferenceTags[i]);

    if (changed) {
      prevTagsRef.current = preferenceTags;
      sendMessage(
        stringify(
          feed(
            preferenceTags,
            customDecodeURI(searchQuery || ""),
            customDecodeURI(resultTitle || ""),
          ),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceTags]);

  // Search subscriber
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const setSearchDisabled = useSetAtom(searchDisabledAtom);
  useEffect(() => {
    if (searchQuery && resultTitle === "") {
      setSearchQuery("");
      setSearchDisabled(true);
      sendMessage(stringify(search(customDecodeURI(searchQuery))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Socket error logic
  const setPageError = useSetAtom(pageErrorAtom);
  useEffect(() => {
    if (readyState !== ReadyState.OPEN) setPageError("Not connected to server");
    else setPageError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState]);
  return { lastMessage, sendMessage, readyState };
};

export default useSocketHandler;
