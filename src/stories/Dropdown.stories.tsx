import Dropdown from "../components/Dropdown";
import { DropdownProps } from "../components/Dropdown";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Theme } from "@radix-ui/themes"; // Import the Radix Theme component
import "@radix-ui/themes/styles.css"; // Import the Radix Theme styles
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Dropdown>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: Dropdown,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  args: { callback: fn() },
};

export default meta;

type Story = StoryObj<StoryProps>;

const simpleControls: DropdownProps = {
  displayText: "Controls",
  options: [
    {
      displayText: "File",
      shortcut: "Ctrl+F",
    },
    {
      displayText: "Edit",
      shortcut: "Ctrl+E",
    },
    {
      displayText: "View",
      shortcut: "Ctrl+V",
    },
    {
      displayText: "Help",
      shortcut: "Ctrl+H",
    },
  ],
};

const fileControls = [
  {
    displayText: "Open",
    shortcut: "Ctrl+O",
  },
  {
    displayText: "Save",
    shortcut: "Ctrl+S",
  },
  {
    displayText: "Close",
    shortcut: "Ctrl+W",
  },
];

export const Simple: Story = {
  args: simpleControls,
};

export const Complex: Story = {
  args: {
    displayText: "Controls",
    options: simpleControls.options.map((option) =>
      option.displayText == "File"
        ? { ...option, options: fileControls }
        : option,
    ), // Add the fileControls to the options
  },
};
