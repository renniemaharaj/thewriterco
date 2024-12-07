import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Theme } from "@radix-ui/themes";
import CheckRadix from "../components/CheckRadix";
import "@radix-ui/themes/styles.css"; // Import the Radix Theme styles

type StoryProps = ComponentProps<typeof CheckRadix>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: CheckRadix,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Implementation: Story = {
  args: {},
};
