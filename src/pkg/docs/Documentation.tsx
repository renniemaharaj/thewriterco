import { Box, Flex } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";

import Menu, { TabItem } from "./cmpnts/Menu";
import SideBar from "../../pkg/SideBar";
import { useThemeContext } from "../../pkg/context/theme/useThemeContext";
import { RootState } from "../../app/store";

export type DocumentationProps = {
  additionalTabs?: TabItem[];
};

const Documentation = ({ additionalTabs }: DocumentationProps) => {
  const { theme } = useThemeContext();
  const { orientation } = useSelector((state: RootState) => state.chat);
  const [routeChildren, setRouteChildren] = useState<ReactNode | null>(null);

  const isDarkMode = theme === "dark";

  // Extracted Styles
  const sidebarClass =
    "flex-col !relative flex-wrap md:!flex-nowrap !m-auto !w-[98vw] transition-all gap-1";

  const contentContainerClass = `
    ${isDarkMode ? "bg-[#171918]" : "border"} 
    !flex md:!min-w-[70%]
  `;

  const innerBoxClass = `
    space-y-4 space-x-4 
    !p-2 !py-10 
    !max-w-[500px] 
    !mx-auto
  `;

  return (
    <SideBar
      variant="center"
      className={sidebarClass}
      orientation="horizontal"
      childLeft={
        <Flex className={contentContainerClass}>
          {routeChildren && orientation === "horizontal" && (
            <Box className={innerBoxClass}>{routeChildren}</Box>
          )}
        </Flex>
      }
      centerBar={<></>}
      childRight={
        <Menu
          routeChildren={setRouteChildren}
          additionalTabs={additionalTabs}
        />
      }
    />
  );
};

export default Documentation;
