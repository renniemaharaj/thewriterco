import Dialog from "../components/Dialog";
import { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@radix-ui/themes"; // Import the Radix Theme component
import "@radix-ui/themes/styles.css"; // Import the Radix Theme styles
import { fn } from "@storybook/test"; // Import the fn function from Storybook
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Dialog>;

//Note decorate the story with the Theme component
const meta: Meta<StoryProps> = {
  component: Dialog,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  args: { onConfirm: fn(), onCancel: fn() },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Simple: Story = {
  args: {
    open: true,
    triggerText: "Delete",
    title: "Delete file?",
    description: "Are you sure you want to delete this file?",
    confirmText: "Delete",
    confirmColor: "red",
    triggerTextColor: "red",
  },
};

export const Closed: Story = {
  args: {
    open: false,
    triggerText: "Delete",
    title: "No Permission",
    description: "You're not allowed to do that",
    confirmText: "Close",
    triggerTextColor: "red",
    confirmColor: "blue",
  },
};

export const Confirm: Story = {
  args: {
    open: true,
    triggerText: "Delete Record",
    title: "Delete Record?",
    description: "Are you sure you want to delete this record?",
    confirmText: "Delete",
    triggerTextColor: "red",
    confirmColor: "red",
  },
};

export const TableView: Story = {
  args: {
    open: false,
    triggerText: "Users",
    title: "Users",
    description: "These are the users",
    confirmText: "Close",
    triggerTextColor: "crimson",

    tableView: {
      headers: ["Name", "Email", "Role"],
      rows: [
        { cells: ["John Doe", "jdoe@something.com", "Developer"] },
        { cells: ["Maria Doe", "mdoe@something.com", "Developer"] },
      ],
    },

    confirmColor: "gray",
  },
};
export const TextField: Story = {
  args: {
    open: true,
    triggerText: "Change Email",
    title: "Edit Email",
    description: "Enter your new email",
    confirmText: "Save",
    triggerTextColor: "blue",
    confirmColor: "blue",
    acceptFields: [
      {
        label: "Email",
        placeholder: "Email",
      },
    ],
  },
};
export const MultipleTextField: Story = {
  args: {
    open: true,
    triggerText: "Change Details",
    title: "Change User Details",
    description: "Enter your new details",
    confirmText: "Save",
    triggerTextColor: "blue",
    confirmColor: "blue",
    acceptFields: [
      {
        label: "Name",
        placeholder: "Name",
      },
      {
        label: "Email",
        placeholder: "Email",
      },
      {
        label: "Role",
        placeholder: "Role",
      },
    ],
  },
};
export const Select: Story = {
  args: {
    open: true,
    triggerText: "Create Node",
    title: "Create Node",
    description: "Enter node details",
    confirmText: "Save",
    triggerTextColor: "blue",
    confirmColor: "blue",
    acceptFields: [
      {
        label: "Name",
        placeholder: "Name",
      },
      {
        label: "Description",
        placeholder: "Description of your node",
      },
      {
        label: "Namespace",
        defaultValue: "1",
        selectFrom: [
          {
            displayText: "Namespace",
            options: [
              { value: "1", displayText: "Type 1" },
              { value: "2", displayText: "Type 2" },
              { value: "3", displayText: "Type 3" },
            ],
          },
        ],
      },
    ],
  },
};
