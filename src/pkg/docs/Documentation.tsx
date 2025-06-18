import { Box, Card, Flex } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu, { TabItem } from "./cmpnts/Menu";
import { RootState } from "../../app/store";
import { useURLState } from "../hooks/useURLState";
import { setCurrentTitle } from "../../app/reasoning/reasoningSlice";

export type DocumentationProps = {
  additionalTabs?: TabItem[];
};

const Documentation = ({ additionalTabs }: DocumentationProps) => {
  const { orientation } = useSelector((state: RootState) => state.chat);
  const [routeChildren, setRouteChildren] = useState<ReactNode | null>(null);
  const currentTitle = useSelector(
    (state: RootState) => state.reasoning.currentTitle,
  );

  const dispatch = useDispatch();

  const [titleFromUrl, setTitleInUrl] = useURLState("t");

  const innerBoxClass = "space-y-4 space-x-4 !p-2 !py-10 !mx-auto !w-full";

  useEffect(() => {
    if (orientation === "vertical") return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [currentTitle, orientation]);

  useEffect(() => {
    if (titleFromUrl && !currentTitle) dispatch(setCurrentTitle(titleFromUrl));

    if (currentTitle && currentTitle != titleFromUrl)
      setTitleInUrl(currentTitle);
  }, [dispatch, currentTitle, setTitleInUrl, titleFromUrl]);

  return (
    <Flex className="gap-2 !overflow-visible">
      {orientation === "horizontal" && (
        <Flex className="w-[65%] !min-h-[350px]">
          <Card className="!w-full !sticky !top-[2rem]">
            {routeChildren && orientation === "horizontal" && (
              <Box className={innerBoxClass}>{routeChildren}</Box>
            )}
          </Card>
        </Flex>
      )}
      <Flex
        className={`${orientation === "horizontal" ? "w-[35%]" : "w-full"}`}
      >
        <Card className="!w-full !h-fit !sticky !top-[2rem]">
          <Menu
            routeChildren={setRouteChildren}
            additionalTabs={additionalTabs}
          />
        </Card>
      </Flex>
    </Flex>
  );
};

export default Documentation;
