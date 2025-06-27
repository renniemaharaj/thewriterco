import { Box, Card, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu, { TabItem } from "./cmpnts/Menu";
import { RootState } from "../../app/store";
import { useURLState } from "../hooks/useURLState";
import { setCurrentTitle } from "../../app/reasoning/reasoningSlice";
import { ChevronDown } from "lucide-react";

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
    orientation === "vertical" ? "100%" : isFocused ? "2.7rem" : "35%";
  const contentWidth = isFocused ? "100%" : "65%";

  return (
    <Flex className="gap-2 !overflow-visible w-full">
      {/* Menu */}
      <Flex
        style={{ width: menuWidth }}
        onMouseEnter={() => setIsFocused(false)}
      >
        <Card className="w-fit !p-1 !h-fit !sticky !top-[3.2rem]">
          {isFocused && (
            <IconButton variant="soft" aria-controls="file-content">
              <Tooltip content="Menu">
                <ChevronDown className="h-4 w-4" />
              </Tooltip>
            </IconButton>
          )}

          <Menu
            className={isFocused ? "!opacity-0 pointer-events-none" : ""}
            routeChildren={setRouteChildren}
            additionalTabs={additionalTabs}
          />
        </Card>
      </Flex>

      {/* Content View */}
      {orientation === "horizontal" && (
        <Flex
          style={{ width: contentWidth }}
          onMouseEnter={() => {
            if (routeChildren) setIsFocused(true);
          }}
        >
          <Flex className="!w-full">
            {routeChildren && (
              <Box className={innerBoxClass}>{routeChildren}</Box>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Documentation;
