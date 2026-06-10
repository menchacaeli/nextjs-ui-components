import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table.tsx";
import Badge from "../Badge/Badge.tsx";
import Button from "../Button/Button.tsx";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joined: string;
}

const users: User[] = [
  { id: 1, name: "Alice Martin",  email: "alice@example.com",  role: "Admin",   status: "active",   joined: "2023-01-15" },
  { id: 2, name: "Bob Chen",      email: "bob@example.com",    role: "Member",  status: "active",   joined: "2023-03-22" },
  { id: 3, name: "Carol Davis",   email: "carol@example.com",  role: "Viewer",  status: "inactive", joined: "2023-05-10" },
  { id: 4, name: "David Kim",     email: "david@example.com",  role: "Member",  status: "pending",  joined: "2023-07-04" },
  { id: 5, name: "Eva Torres",    email: "eva@example.com",    role: "Admin",   status: "active",   joined: "2023-09-18" },
  { id: 6, name: "Frank Liu",     email: "frank@example.com",  role: "Member",  status: "inactive", joined: "2023-11-02" },
  { id: 7, name: "Grace Park",    email: "grace@example.com",  role: "Viewer",  status: "active",   joined: "2024-01-30" },
  { id: 8, name: "Henry Brown",   email: "henry@example.com",  role: "Member",  status: "pending",  joined: "2024-03-14" },
  { id: 9, name: "Isabel Reed",   email: "isabel@example.com", role: "Admin",   status: "active",   joined: "2024-05-05" },
  { id: 10, name: "Jack Wilson",  email: "jack@example.com",   role: "Member",  status: "inactive", joined: "2024-06-20" },
  { id: 11, name: "Karen Lee",    email: "karen@example.com",  role: "Viewer",  status: "active",   joined: "2024-08-11" },
  { id: 12, name: "Leo Zhang",    email: "leo@example.com",    role: "Member",  status: "active",   joined: "2024-10-01" },
];

const statusColor = (status: User["status"]) =>
  status === "active" ? "green" : status === "pending" ? "yellow" : "gray";

const basicColumns = [
  { key: "name",  header: "Name",  sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role",  header: "Role",  sortable: true },
];

const richColumns = [
  { key: "name",  header: "Name",  sortable: true, width: "200px" },
  { key: "email", header: "Email", sortable: true },
  { key: "role",  header: "Role",  sortable: true, width: "100px" },
  {
    key: "status",
    header: "Status",
    width: "120px",
    render: (_: unknown, row: User) => (
      <Badge text={row.status} variant="filled" color={statusColor(row.status)} shape="pill" />
    ),
  },
  { key: "joined", header: "Joined", sortable: true, width: "120px" },
  {
    key: "id",
    header: "",
    width: "80px",
    render: (_: unknown, row: User) => (
      <Button text="Edit" size="xs" variant="ghost" color="primary" onClick={() => console.log(row.id)} />
    ),
  },
];

const meta: Meta<typeof Table<User>> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    data: users,
    columns: basicColumns,
    rowsPerPage: 5,
    selectable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {};

export const Sortable: Story = {
  args: { columns: basicColumns, rowsPerPage: 5 },
};

export const WithPagination: Story = {
  args: { columns: basicColumns, rowsPerPage: 5 },
};

export const Selectable: Story = {
  args: {
    columns: basicColumns,
    selectable: true,
    onRowSelect: (rows) => console.log("Selected:", rows),
  },
};

export const RichColumns: Story = {
  args: { columns: richColumns, rowsPerPage: 5 },
};

export const AllFeatures: Story = {
  args: {
    columns: richColumns,
    selectable: true,
    rowsPerPage: 5,
    onRowSelect: (rows) => console.log("Selected:", rows),
  },
};

export const SmallDataset: Story = {
  args: {
    data: users.slice(0, 3),
    columns: basicColumns,
    rowsPerPage: 10,
  },
};
