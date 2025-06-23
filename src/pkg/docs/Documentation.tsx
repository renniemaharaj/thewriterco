import { Box, Text, Card, Flex } from "@radix-ui/themes";
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

  const innerBoxClass = `!p-0 !mx-auto !w-full`;

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
          <Flex className="!w-full">
            {routeChildren && (
              <Box className={innerBoxClass}>{routeChildren}</Box>
            )}
          </Flex>
        </Flex>
      )}

      {/* Menu */}
      <Flex
        style={{ width: menuWidth }}
        onMouseEnter={() => setIsFocused(false)}
      >
        <Card className="!w-full !h-fit !sticky !top-[2rem]">
          {isFocused && (
            <Flex
              className={`!w-full !flex-col !justify-center !items-center ${orientation === "horizontal" ? "!p-4" : "!p-0"}`}
            >
              <Text size="2" weight="bold">
                Focused mode
              </Text>
              <Text size="2" color="gray">
                hover to disable
              </Text>
            </Flex>
          )}

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
