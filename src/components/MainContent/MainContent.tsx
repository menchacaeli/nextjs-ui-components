import {
  Avatar,
  Badge,
  Button,
  Option,
  StackedList,
  Table,
} from "@/ui-components";
import { MainContentProps } from "./main-content.ts";
import { useEffect, useRef } from "react";
import { ChevronRight, EditIcon, Mail } from "lucide-react";
import { Column } from "@/ui-components/Table/table.ts";

interface User {
  id: number;
  created: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const MainContent = (props: MainContentProps) => {
  const mainRef = useRef<HTMLDivElement>(null);

  // for demo purposes
  const avatarImage =
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3161&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const columns: Array<Column<User>> = [
    { key: "id", header: "ID", sortable: true },
    { key: "created", header: "Created", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <Badge
          text={value.toString()}
          variant="filled"
          color={value.toString() === "active" ? "green" : "gray"}
        />
      ),
    },
    { key: "role", header: "Role", width: "150px" },
    {
      key: "",
      header: "Actions",
      width: "100px",
      render: () => (
        <Button size={"sm"} shape={"rounded"} iconOnly leadingIcon={EditIcon} />
      ),
    },
  ];

  const users: Array<User> = [
    {
      id: 1,
      created: "2021-01-01",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
    },
    {
      id: 2,
      created: "2021-01-01",
      name: "Dang Doe",
      email: "dang@example.com",
      role: "Admin",
      status: "inactive",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const mainRefNode = mainRef.current;
    const sectionNode = mainRefNode?.querySelector(`#${sectionId}`);
    if (sectionNode) {
      sectionNode.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (props.activeSection) {
      scrollToSection(props.activeSection);
    }
  }, [props.activeSection]);

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      ref={mainRef}
    >
      <section id="avatar" className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Avatar</h1>
          <p className="mt-2">A collection of avatar styles and variants.</p>
        </div>

        <div className="w-full">
          {/* Avatar Sizes Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Sizes</h2>
            <p className="text-sm mb-4">
              Different avatar sizes for various contexts.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Avatar src={avatarImage} size="xs" />
                <Avatar src={avatarImage} size="sm" />
                <Avatar src={avatarImage} size="md" />
                <Avatar src={avatarImage} size="lg" />
              </div>
            </div>
          </div>

          {/* Avatar Status Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Status</h2>
            <p className="text-sm mb-4">
              Avatars with status indicators for user presence.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Avatar src={avatarImage} status="online" />
                <Avatar src={avatarImage} status="offline" />
                <Avatar src={avatarImage} status="away" />
                <Avatar src={avatarImage} status="busy" />
              </div>
            </div>
          </div>

          {/* Avatar Initials Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Initials</h2>
            <p className="text-sm mb-4">
              Avatars with initials for user profiles.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Avatar initials="JD" />
                <Avatar initials="LM" />
                <Avatar initials="AB" />
                <Avatar initials="CD" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="badge" className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Badge</h1>
          <p className="mt-2">A collection of badge styles and variants.</p>
        </div>

        <div className="w-full">
          {/* Badge Filled Colors Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Filled Colors</h2>
            <p className="text-sm mb-4">
              A showcase of all available filled colors.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Badge text={"Gray Badge"} variant="filled" color={"gray"} />
                <Badge text={"Red Badge"} variant="filled" color={"red"} />
                <Badge
                  text={"Yellow Badge"}
                  variant="filled"
                  color={"yellow"}
                />
                <Badge text={"Green Badge"} variant="filled" color={"green"} />
                <Badge text={"Blue Badge"} variant="filled" color={"blue"} />
                <Badge
                  text={"Purple Badge"}
                  variant="filled"
                  color={"purple"}
                />
                <Badge text={"Pink Badge"} variant="filled" color={"pink"} />
              </div>
            </div>
          </div>

          {/* Badge Outlined Colors Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Outlined Colors</h2>
            <p className="text-sm mb-4">
              A showcase of all available outlined colors.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Badge text={"Gray Badge"} variant="outlined" color={"gray"} />
                <Badge text={"Red Badge"} variant="outlined" color={"red"} />
                <Badge
                  text={"Yellow Badge"}
                  variant="outlined"
                  color={"yellow"}
                />
                <Badge
                  text={"Green Badge"}
                  variant="outlined"
                  color={"green"}
                />
                <Badge text={"Blue Badge"} variant="outlined" color={"blue"} />
                <Badge
                  text={"Purple Badge"}
                  variant="outlined"
                  color={"purple"}
                />
                <Badge text={"Pink Badge"} variant="outlined" color={"pink"} />
              </div>
            </div>
          </div>

          {/* Badge Ghost with Dot Colors Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Ghost With Dot Colors</h2>
            <p className="text-sm mb-4">
              A showcase of all available ghost with dot colors.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Badge text={"Gray Badge"} variant="ghost" color={"gray"} dot />
                <Badge text={"Red Badge"} variant="ghost" color={"red"} dot />
                <Badge
                  text={"Yellow Badge"}
                  variant="ghost"
                  color={"yellow"}
                  dot
                />
                <Badge
                  text={"Green Badge"}
                  variant="ghost"
                  color={"green"}
                  dot
                />
                <Badge text={"Blue Badge"} variant="ghost" color={"blue"} dot />
                <Badge
                  text={"Purple Badge"}
                  variant="ghost"
                  color={"purple"}
                  dot
                />
                <Badge text={"Pink Badge"} variant="ghost" color={"pink"} dot />
              </div>
            </div>
          </div>

          {/* Badge Pill with Dot Colors Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Pill With Dot Colors</h2>
            <p className="text-sm mb-4">
              A showcase of all available pill with dot colors.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Badge
                  text={"Gray Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"gray"}
                  dot
                />
                <Badge
                  text={"Red Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"red"}
                  dot
                />
                <Badge
                  text={"Yellow Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"yellow"}
                  dot
                />
                <Badge
                  text={"Green Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"green"}
                  dot
                />
                <Badge
                  text={"Blue Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"blue"}
                  dot
                />
                <Badge
                  text={"Purple Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"purple"}
                  dot
                />
                <Badge
                  text={"Pink Badge"}
                  shape={"pill"}
                  variant="outlined"
                  color={"pink"}
                  dot
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="button" className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Button</h1>
          <p className="mt-2">A collection of button styles and variants.</p>
        </div>

        <div className="w-full">
          {/* Button Colors Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Colors</h2>
            <p className="text-sm mb-4">
              A showcase of all available button colors.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Button text={"Primary"} variant={"filled"} color={"primary"} />
                <Button
                  text={"Secondary"}
                  variant={"filled"}
                  color={"secondary"}
                />
                <Button text={"Danger"} variant={"filled"} color={"danger"} />
                <Button text={"Warning"} variant={"filled"} color={"warning"} />
                <Button text={"Success"} variant={"filled"} color={"success"} />
                <Button text={"Info"} variant={"filled"} color={"info"} />
              </div>
            </div>
          </div>

          {/* Button Outlined Colors Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Outlined Colors</h2>
            <p className="text-sm mb-4">
              A showcase of all available outlined button colors.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Button
                  text={"Primary"}
                  variant={"outlined"}
                  color={"primary"}
                />
                <Button
                  text={"Secondary"}
                  variant={"outlined"}
                  color={"secondary"}
                />
                <Button text={"Danger"} variant={"outlined"} color={"danger"} />
                <Button
                  text={"Warning"}
                  variant={"outlined"}
                  color={"warning"}
                />
                <Button
                  text={"Success"}
                  variant={"outlined"}
                  color={"success"}
                />
                <Button text={"Info"} variant={"outlined"} color={"info"} />
              </div>
            </div>
          </div>

          {/* Button Variants */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Variants</h2>
            <p className="text-sm mb-4">
              Explore different visual styles for buttons.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Button text={"Filled"} variant="filled" />
                <Button text={"Gradient"} variant="gradient" />
                <Button text={"Outlined"} variant="outlined" />
                <Button text={"Ghost"} variant="ghost" />
              </div>
            </div>
          </div>

          {/* Shapes Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Shapes</h2>
            <p className="text-sm mb-4">
              Explore different button corner styles.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Button text={"Default"} shape="default" />
                <Button text={"Rounded"} shape="rounded" />
                <Button text={"Pill"} shape="pill" />
                <Button text={"Sharp"} shape="sharp" />
              </div>
            </div>
          </div>

          {/* Loading Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Loading</h2>
            <p className="text-sm mb-4">
              Buttons with loading indicators for actions.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Button text={"Button text"} loading />
                <Button text={"Button text"} shape={"rounded"} loading />
                <Button text={"Button text"} shape={"pill"} loading />
                <Button text={"Button text"} shape={"sharp"} loading />
              </div>
            </div>
          </div>

          {/* Icons Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">With Icon</h2>
            <p className="text-sm mb-4">
              Buttons with icons for enhanced visual cues.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Button text={"Button text"} leadingIcon={Mail} />
                <Button
                  text={"Button text"}
                  variant={"gradient"}
                  shape={"rounded"}
                  trailingIcon={Mail}
                />
                <Button
                  text={"Button text"}
                  variant={"outlined"}
                  shape={"pill"}
                  leadingIcon={Mail}
                />
                <Button
                  text={"Button text"}
                  variant={"ghost"}
                  shape={"sharp"}
                  trailingIcon={Mail}
                />
              </div>
            </div>
          </div>

          {/* Sizes Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Sizes</h2>
            <p className="text-sm mb-4">
              Different button sizes for various contexts.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Button text={"Extra Small"} size="xs" />
                <Button text={"Small"} size="sm" />
                <Button text={"Medium"} size="md" />
                <Button text={"Large"} size="lg" />
              </div>
            </div>
          </div>

          {/* Animation Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Animations</h2>
            <p className="text-sm mb-4">
              Button animations for interactive feedback.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Button text={"Ripple"} animation="ripple" />
                <Button text={"Scale"} animation="scale" />
              </div>
            </div>
          </div>

          {/* Icon-only Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Icon-only</h2>
            <p className="text-sm mb-4">
              Buttons with only icons for compact actions.
            </p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly leadingIcon={Mail} />
                <Button
                  iconOnly
                  variant={"gradient"}
                  leadingIcon={ChevronRight}
                  shape={"rounded"}
                />
                <Button
                  iconOnly
                  variant={"outlined"}
                  leadingIcon={Mail}
                  shape={"pill"}
                />
                <Button
                  iconOnly
                  variant={"ghost"}
                  leadingIcon={ChevronRight}
                  shape={"sharp"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="option" className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Option</h1>
          <p className="mt-2">A dropdown select option.</p>
        </div>

        <div className="w-full">
          {/* Options text only */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Option
                  text={"Select an option text only"}
                  items={[
                    {
                      text: "Option One",
                      value: "Option One",
                      onClick: (value) => {
                        alert(value);
                      },
                    },
                    {
                      text: "Option Two",
                      value: "Option Two",
                      onClick: (value) => {
                        alert(value);
                      },
                    },
                  ]}
                />

                <Option
                  text={"Select an option text with icon"}
                  items={[
                    {
                      text: "Option One",
                      value: "Option One",
                      leadingIcon: Mail,
                      onClick: (value) => {
                        alert(value);
                      },
                    },
                    {
                      text: "Option Two",
                      value: "Option Two",
                      leadingIcon: Mail,
                      onClick: (value) => {
                        alert(value);
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stacked-list" className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Stacked List</h1>
          <p className="mt-2">A preview of the stacked list componet.</p>
        </div>

        <div className="w-full">
          {/* Text Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Text</h2>
            <p className="text-sm mb-4">List with only text</p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <StackedList
                  items={[
                    { text: "Item One" },
                    { text: "Item Two" },
                    { text: "Item Three" },
                    { text: "Item Four" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Text With Secondary Text Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Text With Secondary Text</h2>
            <p className="text-sm mb-4">List with only text and secondary.</p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <StackedList
                  items={[
                    { text: "Item One", secondaryText: "Secondary text" },
                    { text: "Item Two", secondaryText: "Secondary text" },
                    { text: "Item Three", secondaryText: "Secondary text" },
                    { text: "Item Four", secondaryText: "Secondary text" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Everything Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Everything</h2>
            <p className="text-sm mb-4">List with all props.</p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <StackedList
                  items={[
                    {
                      avatar: <Avatar src={avatarImage} />,
                      text: "Item One",
                      secondaryText: "Secondary text",
                      secondaryAction: (
                        <Button
                          iconOnly
                          size={"sm"}
                          leadingIcon={Mail}
                          shape={"rounded"}
                        />
                      ),
                    },
                    {
                      avatar: <Avatar src={avatarImage} />,
                      text: "Item Two",
                      secondaryText: "Secondary text",
                      secondaryAction: (
                        <Button
                          iconOnly
                          size={"sm"}
                          leadingIcon={Mail}
                          shape={"rounded"}
                        />
                      ),
                    },
                    {
                      avatar: <Avatar src={avatarImage} />,
                      text: "Item Three",
                      secondaryText: "Secondary text",
                      secondaryAction: (
                        <Button
                          iconOnly
                          size={"sm"}
                          leadingIcon={Mail}
                          shape={"rounded"}
                        />
                      ),
                    },
                    {
                      avatar: <Avatar src={avatarImage} />,
                      text: "Item Four",
                      secondaryText: "Secondary text",
                      secondaryAction: (
                        <Button
                          iconOnly
                          size={"sm"}
                          leadingIcon={Mail}
                          shape={"rounded"}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="table" className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Table</h1>
          <p className="mt-2">A preview of the table componet.</p>
        </div>

        <div className="w-full">
          {/* Minimal Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Minimal Table</h2>
            <p className="text-sm mb-4">Table with minimal props.</p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Table columns={columns} data={users} />
              </div>
            </div>
          </div>

          {/* Selectable Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Selectable Table</h2>
            <p className="text-sm mb-4">Table with selection props.</p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Table
                  columns={columns}
                  data={users}
                  selectable
                  onRowSelect={(rows) => console.log("selected rows:", rows)}
                />
              </div>
            </div>
          </div>

          {/* Pagination Section */}
          <div
            className="border-b pb-10 mb-10"
            style={{ borderColor: "var(--color-gray-500)" }}
          >
            <h2 className="font-semibold mb-2">Pagination Table</h2>
            <p className="text-sm mb-4">Table with pagination props.</p>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderColor: "var(--color-gray-500)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                <Table columns={columns} data={users} rowsPerPage={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
