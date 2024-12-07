import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Theme } from "@radix-ui/themes";
import { useThemeContext } from "../components/context/useThemeContext";
import SideBar from "../components/SideBar";
import { Provider } from "react-redux";
import { ThemeProvider } from "../components/context/ThemeProvider";
import "@radix-ui/themes/styles.css"; // Import the Radix Theme styles
import { store } from "../app/store";

type StoryProps = ComponentProps<typeof SideBar>;

const Decoration = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  return (
    <Theme appearance={theme} accentColor={"indigo"} grayColor="sand">
      {children}
    </Theme>
  );
};
//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: SideBar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider>
          <Decoration>
            <Story />
          </Decoration>
        </ThemeProvider>
      </Provider>
    ),
  ],
  args: {},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Implementation: Story = {
  args: {
    childLeft: (
      <div style={{ backgroundColor: "red", padding: "5px" }}>Left</div>
    ),

    centerBar: (
      <div style={{ backgroundColor: "blue", padding: "5px" }}>MenuBar</div>
    ),

    childRight: (
      <div style={{ backgroundColor: "red", padding: "5px" }}>Right</div>
    ),

    variant: "right",
    className: "gap-1",
  },
};
