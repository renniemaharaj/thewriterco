import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Theme } from "@radix-ui/themes";
import Badges from "../components/Badges";

type StoryProps = ComponentProps<typeof Badges>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: Badges,
  decorators: [(Story) => <Theme>{<Story />}</Theme>],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Simple: Story = {
  args: {
    badges: ["One", "Two", "Three"],
    variant: "soft",
    highContrast: false,
    radius: "none",
    size: "2",
  },
};

export const Complex: Story = {
  args: {
    badges: [
      {
        badgeLabel: "Red",
        color: "red",
      },
      {
        badgeLabel: "Blue",
        color: "blue",
      },
      {
        badgeLabel: "Green",
        color: "green",
      },
    ],
    variant: "soft",
    highContrast: false,
    radius: "none",
    size: "2",
  },
};
