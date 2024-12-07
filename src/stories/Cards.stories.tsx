import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Theme } from "@radix-ui/themes";
import Cards from "../components/Cards";

type StoryProps = ComponentProps<typeof Cards>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: Cards,
  decorators: [(Story) => <Theme>{<Story />}</Theme>],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Implementation: Story = {
  args: {
    Cards: [
      {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
        fallback: "RM",
        href: "https://www.google.com",
      },
      {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
        fallback: "RM",
        href: "https://www.google.com",
      },
      {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
        fallback: "RM",
        href: "https://www.google.com",
      },
    ],
    asChild: true,
    variant: "classic",
    size: "2",
    gap: "3",
  },
};

export const Ghost: Story = {
  args: {
    Cards: [
      {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
        src: "https://source.unsplash.com/100x100",
        fallback: "RM",
        href: "https://www.google.com",
      },
      {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
        src: "https://source.unsplash.com/100x100",
        fallback: "RM",
        href: "https://www.google.com",
      },
      {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
        src: "https://source.unsplash.com/100x100",
        fallback: "RM",
        href: "https://www.google.com",
      },
    ],

    asChild: false,
    variant: "ghost",
    size: "2",
    gap: "9",
  },
};
