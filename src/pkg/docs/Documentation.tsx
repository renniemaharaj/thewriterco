import { Box, Card } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu, { TabItem } from "./cmpnts/Menu";
import SideBar from "../../pkg/SideBar";
import { useThemeContext } from "../../pkg/context/theme/useThemeContext";
import { RootState } from "../../app/store";
import { useURLState } from "../hooks/useURLState";
import { setCurrentTitle } from "../../app/reasoning/reasoningSlice";

export type DocumentationProps = {
  additionalTabs?: TabItem[];
};

const Documentation = ({ additionalTabs }: DocumentationProps) => {
  const { theme } = useThemeContext();
  const { orientation } = useSelector((state: RootState) => state.chat);
  const [routeChildren, setRouteChildren] = useState<ReactNode | null>(null);
  const currentTitle = useSelector(
    (state: RootState) => state.reasoning.currentTitle,
  );

  const dispatch = useDispatch();

  const [titleFromUrl, setTitleInUrl] = useURLState("t");

  const isDarkMode = theme === "dark";

  // Extracted Styles
  const sidebarClass =
    "flex-col !relative flex-wrap md:!flex-nowrap !m-auto !w-[98vw] transition-all gap-1";

  const contentContainerClass = `
  ${isDarkMode ? "bg-[#171918]" : "border"} !flex !flex-[4] !min-h-[350px]`;

  const innerBoxClass = "space-y-4 space-x-4 !p-2 !py-10 !max-w-full !mx-auto";

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
    <SideBar
      variant="center"
      className={sidebarClass}
      orientation="horizontal"
      childLeft={
        orientation === "horizontal" && (
          <Card className={contentContainerClass}>
            {routeChildren && orientation === "horizontal" && (
              <Box className={innerBoxClass}>{routeChildren}</Box>
            )}
          </Card>
        )
      }
      centerBar={<></>}
      childRight={
        <Card className="!flex !flex-[2] !max-h-fit !top-0 !sticky">
          <Menu
            routeChildren={setRouteChildren}
            additionalTabs={additionalTabs}
          />
        </Card>
      }
    />
  );
};

export default Documentation;
