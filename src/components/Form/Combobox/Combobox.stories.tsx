import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Combobox from "./Combobox.tsx";

const frameworks = [
  { label: "React",      value: "react" },
  { label: "Vue",        value: "vue" },
  { label: "Angular",    value: "angular" },
  { label: "Svelte",     value: "svelte" },
  { label: "Next.js",    value: "nextjs" },
  { label: "Nuxt",       value: "nuxt" },
  { label: "Remix",      value: "remix" },
  { label: "SvelteKit",  value: "sveltekit" },
  { label: "Astro",      value: "astro" },
];

const grouped = [
  { label: "React",      value: "react",   group: "JavaScript" },
  { label: "Vue",        value: "vue",     group: "JavaScript" },
  { label: "Angular",    value: "angular", group: "JavaScript" },
  { label: "Django",     value: "django",  group: "Python" },
  { label: "FastAPI",    value: "fastapi", group: "Python" },
  { label: "Rails",      value: "rails",   group: "Ruby" },
  { label: "Sinatra",    value: "sinatra", group: "Ruby", disabled: true },
];

const meta: Meta<typeof Combobox> = {
  title: "Form/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: { options: frameworks, label: "Framework", placeholder: "Select a framework…" },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const Controlled = (args: React.ComponentProps<typeof Combobox>) => {
  const [value, setValue] = useState(args.value ?? "");
  return <div style={{ maxWidth: "320px" }}><Combobox {...args} value={value} onChange={setValue} /></div>;
};

export const Default: Story        = { render: (args) => <Controlled {...args} /> };
export const WithValue: Story      = { render: (args) => <Controlled {...args} />, args: { value: "react" } };
export const Clearable: Story      = { render: (args) => <Controlled {...args} />, args: { value: "nextjs", clearable: true } };
export const WithError: Story      = { render: (args) => <Controlled {...args} />, args: { error: "Please select a framework." } };
export const Disabled: Story       = { render: (args) => <Controlled {...args} />, args: { disabled: true, value: "react" } };
export const Grouped: Story        = { render: (args) => <Controlled {...args} />, args: { options: grouped, label: "Technology" } };
