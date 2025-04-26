import { ComponentProps } from "react";

import "@radix-ui/themes/styles.css"; // Import the Radix Theme styles
import { Theme } from "@radix-ui/themes";

import { Meta, StoryObj } from "@storybook/react";
import Book, { BookProps } from "../pkg/book/Book";

// import CheckRadix from "../pkg/CheckRadix";

type StoryProps = ComponentProps<typeof Book>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: Book,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  //   args: { open: fn() },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Implementation: Story = {
  args: {
    title: "Holy Bible",
    division: "Matthew",
    version: "KJV",
    className: "!w-[120px]",
    onOpenClassName: `!scale-x-[200%] absolute z-30 translate-x-[-50%] translate-y-[-50%]"}`,
    showAnimation: true,
    initialOpen: false,
  } as BookProps,
};
