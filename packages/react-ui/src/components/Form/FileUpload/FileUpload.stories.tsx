import type { Meta, StoryObj } from "@storybook/react";
import FileUpload from "./FileUpload.tsx";

const meta: Meta<typeof FileUpload> = {
  title: "Form/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: { label: "Upload files" },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};

export const ImageOnly: Story = {
  args: {
    accept:  "image/png, image/jpeg, image/gif",
    label:   "Upload image",
    maxSize: 5 * 1024 * 1024,
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    label:    "Upload documents",
    accept:   ".pdf,.doc,.docx",
  },
};

export const WithError: Story = {
  args: { error: "Only PDF files are accepted." },
};

export const Disabled: Story = {
  args: { disabled: true },
};
