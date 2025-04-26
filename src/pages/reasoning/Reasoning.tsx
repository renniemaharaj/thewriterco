// import Footer from "../../pkg/Footer";
import { Box, Flex } from "@radix-ui/themes";
import Menu from "../../pkg/docs/Menu";
import Page from "../../pkg/page/Page";
import SideBar from "../../pkg/SideBar";
import { useThemeContext } from "../../pkg/context/theme/useThemeContext";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
// import Hint from "../../pkg/Hint";
// import Footer from "../../pkg/additional/footer";

const Reasoning = () => {
  const { theme } = useThemeContext();
  const [routeChildren, setRouteChildren] = useState<ReactNode | null>(null);

  const { orientation } = useSelector((state: RootState) => state.chat);

  return (
    <Page
      // wrapChildren={true}
      title="Rationale"
      description="Reasoning for faith"
    >
      {/* <BeforeHeader /> */}
      <SideBar
        variant="center"
        className="flex-col !relative flex-wrap md:!flex-nowrap !m-auto !w-[98vw] transition-all mx-auto gap-1"
        orientation={"horizontal"}
        childLeft={
          /* Chatbox Section */
          <Flex
            // ref={messageBoxRef}
            className={`${theme === "dark" ? "bg-[#171918]" : "border"} !flex md:!min-w-[70%]`}
          >
            {routeChildren &&
              // <Card className="!p-1 !mx-auto">
              orientation === "horizontal" && (
                <Box className="space-y-4 space-x-4 !p-2 !py-10 max-w-[500px] !mx-auto">
                  {routeChildren}
                </Box>

                // </Card>
              )}
          </Flex>
        }
        centerBar={<></>}
        childRight={<Menu routeChildren={setRouteChildren} />}
      />
    </Page>
  );
};

export default Reasoning;
