import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Theme } from "@radix-ui/themes";
import Select from "../components/Select";
import { fn } from "@storybook/test";

type StoryProps = ComponentProps<typeof Select>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: Select,
  decorators: [(Story) => <Theme>{<Story />}</Theme>],
  args: { callback: fn() },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Implementation: Story = {
  args: {
    defaultValue: "apple",
    groups: [
      {
        displayText: "Fruits",
        options: [
          { displayText: "Orange", value: "orange" },
          { displayText: "Apple", value: "apple" },
          { displayText: "Grape", value: "grape", disabled: true },
        ],
      },
      {
        displayText: "Vegetables",
        options: [
          { displayText: "Carrot", value: "carrot" },
          { displayText: "Potato", value: "potato" },
        ],
      },
    ],
  },
};
