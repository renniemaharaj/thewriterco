import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, ReactNode } from "react";
import MonacoEditor from "../components/MonacoEditor.tsx";
import "@radix-ui/themes/styles.css"; // Import the Radix Theme styles
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ThemeProvider } from "../components/context/ThemeProvider";
import { Theme } from "@radix-ui/themes";
import { useThemeContext } from "../components/context/useThemeContext";
import { fn } from "@storybook/test";

// Functional component to properly use the theme context and hook
const Decoration = ({ children }: { children: ReactNode }) => {
  // Getting theme context
  const { theme } = useThemeContext();
  return (
    <Theme appearance={theme} accentColor={"indigo"} grayColor="sand">
      {children}
    </Theme>
  );
};

// Decorate the story with a container div and the Decoration component
const meta: Meta<ComponentProps<typeof MonacoEditor>> = {
  component: MonacoEditor,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider>
          <Decoration>
            <div
              style={{ width: "600px", height: "400px" }}
              //   className="!w-6 h-[400px]"
            >
              <Story />
            </div>
          </Decoration>
        </ThemeProvider>
      </Provider>
    ),
  ],
  args: { onChange: fn() },
};

export default meta;

type Story = StoryObj<ComponentProps<typeof MonacoEditor>>;

export const Reactive: Story = {
  args: {
    language: "javascript",
    code: "const x = 1;",
  },
};
