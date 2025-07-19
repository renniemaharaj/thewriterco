import { useSetAtom } from "jotai";
import { Block, Report } from "./types";
import useReportReducers from "./useReportReducers";
import { pageErrorAtom } from "../../../page/atoms/page";
import { tagsAvailableAtom } from "../../../page/search/labs/atoms/labs";

const useBlockInterpreter = () => {
  const { put } = useReportReducers();
  const setPageError = useSetAtom(pageErrorAtom);

  const setTagsAvailable = useSetAtom(tagsAvailableAtom);

  const interpret = (block: Block) => {
    if (typeof block === "string") return;
    if ("results" in block) put(block as Report);
    if ("href" in block) location.href = block.href;
    if ("error" in block) setPageError(block.error);
    if ("tagsAvailable" in block) setTagsAvailable(block.tagsAvailable);
  };

  return { interpret };
};

export default useBlockInterpreter;
