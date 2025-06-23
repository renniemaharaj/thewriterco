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
  const currentTitle = useSelector(
    (state: RootState) => state.reasoning.currentTitle,
  );
  const dispatch = useDispatch();

  const [titleFromUrl, setTitleInUrl] = useURLState("t");
  const [routeChildren, setRouteChildren] = useState<ReactNode | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const innerBoxClass = "space-y-4 space-x-4 !p-2 !py-10 !mx-auto !w-full";

  useEffect(() => {
    if (orientation === "vertical") return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [currentTitle, orientation]);

  useEffect(() => {
    if (titleFromUrl && !currentTitle) dispatch(setCurrentTitle(titleFromUrl));
    if (currentTitle && currentTitle !== titleFromUrl)
      setTitleInUrl(currentTitle);
  }, [dispatch, currentTitle, setTitleInUrl, titleFromUrl]);

  const menuWidth =
    orientation === "vertical" ? "100%" : isFocused ? "25%" : "35%";
  const contentWidth = isFocused ? "75%" : "65%";

  return (
    <Flex className="gap-2 !overflow-visible w-full">
      {/* Content View */}
      {orientation === "horizontal" && (
        <Flex
          style={{ width: contentWidth }}
          onMouseEnter={() => setIsFocused(true)}
        >
          <Card className="!w-full !sticky !top-[2rem]">
            {routeChildren && (
              <Box className={innerBoxClass}>{routeChildren}</Box>
            )}
          </Card>
        </Flex>
      )}

      {/* Menu */}
      <Flex
        style={{ width: menuWidth }}
        onMouseEnter={() => setIsFocused(false)}
      >
        <Card className="!w-full !h-fit !sticky !top-[2rem]">
          <Menu
            className={isFocused ? "!opacity-0 pointer-events-none" : ""}
            routeChildren={setRouteChildren}
            additionalTabs={additionalTabs}
          />
        </Card>
      </Flex>
    </Flex>
  );
};

export default Documentation;
