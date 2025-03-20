// import Footer from "../../components/Footer";
import { Box, Flex } from "@radix-ui/themes";
import Menu from "../../components/docs/Menu";
import Page from "../../components/page/Page";
import SideBar from "../../components/SideBar";
import { useThemeContext } from "../../components/context/theme/useThemeContext";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
// import Hint from "../../components/Hint";
// import Footer from "../../components/additional/footer";

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
        className="flex-col !relative flex-wrap md:!flex-nowrap !m-auto !w-[100vw] !p-2 transition-all gap-1"
        orientation={"horizontal"}
        childLeft={<Menu routeChildren={setRouteChildren} />}
        centerBar={<></>}
        childRight={
          /* Chatbox Section */
          <Flex
            // ref={messageBoxRef}
            className={`${theme === "dark" ? "bg-[#171918]" : "border"} !flex md:!min-w-[70%]`}
          >
            {routeChildren && (
              // <Card className="!p-1 !mx-auto">
              <Box className="space-y-4 space-x-4 !p-2 !py-10 max-w-[500px] !mx-auto">
                {orientation === "horizontal" && routeChildren}
              </Box>
              // </Card>
            )}
          </Flex>
        }
      />
    </Page>
  );
};

export default Reasoning;
