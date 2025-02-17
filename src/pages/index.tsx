import { Button, Avatar } from "@/components";
import { ChevronRight, Mail } from "lucide-react";

export default function Home() {
  // for demo purposes
  const avatarImage =
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3161&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buttons</h1>
          <p className="mt-2 text-gray-500">
            A collection of button styles and variants.
          </p>
        </div>

        <div className="w-full">
          {/* Button Colors Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Colors</h2>
            <p className="text-sm text-gray-500 mb-4">
              A showcase of all available button colors.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Primary"} variant="filled" color={"primary"} />
                <Button
                  text={"Secondary"}
                  variant="filled"
                  color={"secondary"}
                />
                <Button text={"Danger"} variant="filled" color={"danger"} />
                <Button text={"Warning"} variant="filled" color={"warning"} />
                <Button text={"Success"} variant="filled" color={"success"} />
                <Button text={"Info"} variant="filled" color={"info"} />
              </div>
            </div>
          </div>

          {/* Button Outlined Colors Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">
              Outlined Colors
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              A showcase of all available outlined button colors.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Primary"} variant="outlined" color={"primary"} />
                <Button
                  text={"Secondary"}
                  variant="outlined"
                  color={"secondary"}
                />
                <Button text={"Danger"} variant="outlined" color={"danger"} />
                <Button text={"Warning"} variant="outlined" color={"warning"} />
                <Button text={"Success"} variant="outlined" color={"success"} />
                <Button text={"Info"} variant="outlined" color={"info"} />
              </div>
            </div>
          </div>

          {/* Button Variants */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Variants</h2>
            <p className="text-sm text-gray-500 mb-4">
              Explore different visual styles for buttons.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Filled"} variant="filled" />
                <Button text={"Gradient"} variant="gradient" />
                <Button text={"Outlined"} variant="outlined" />
                <Button text={"Ghost"} variant="ghost" />
              </div>
            </div>
          </div>

          {/* Shapes Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Shapes</h2>
            <p className="text-sm text-gray-500 mb-4">
              Explore different button corner styles.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button text={"Default"} shape="default" />
                <Button text={"Rounded"} shape="rounded" />
                <Button text={"Pill"} shape="pill" />
                <Button text={"Sharp"} shape="sharp" />
              </div>
            </div>
          </div>

          {/* Loading Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Loading</h2>
            <p className="text-sm text-gray-500 mb-4">
              Buttons with loading indicators for actions.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Button text"} loading />
                <Button text={"Button text"} shape={"rounded"} loading />
                <Button text={"Button text"} shape={"pill"} loading />
                <Button text={"Button text"} shape={"sharp"} loading />
              </div>
            </div>
          </div>

          {/* Icons Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">With Icon</h2>
            <p className="text-sm text-gray-500 mb-4">
              Buttons with icons for enhanced visual cues.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
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
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Sizes</h2>
            <p className="text-sm text-gray-500 mb-4">
              Different button sizes for various contexts.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button text={"Extra Small"} size="xs" />
                <Button text={"Small"} size="sm" />
                <Button text={"Medium"} size="md" />
                <Button text={"Large"} size="lg" />
              </div>
            </div>
          </div>

          {/* Animation Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Animations</h2>
            <p className="text-sm text-gray-500 mb-4">
              Button animations for interactive feedback.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button text={"Ripple"} animation="ripple" />
                <Button text={"Scale"} animation="scale" />
              </div>
            </div>
          </div>

          {/* Icon-only Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Icon-only</h2>
            <p className="text-sm text-gray-500 mb-4">
              Buttons with only icons for compact actions.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
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
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Avatar</h1>
          <p className="mt-2 text-gray-500">
            A collection of avatar styles and variants.
          </p>
        </div>

        <div className="w-full">
          {/* Avatar Sizes Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Sizes</h2>
            <p className="text-sm text-gray-500 mb-4">
              Different avatar sizes for various contexts.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Avatar src={avatarImage} size="xs" />
                <Avatar src={avatarImage} size="sm" />
                <Avatar src={avatarImage} size="md" />
                <Avatar src={avatarImage} size="lg" />
              </div>
            </div>
          </div>

          {/* Avatar Status Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Status</h2>
            <p className="text-sm text-gray-500 mb-4">
              Avatars with status indicators for user presence.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Avatar src={avatarImage} status="online" />
                <Avatar src={avatarImage} status="offline" />
                <Avatar src={avatarImage} status="away" />
                <Avatar src={avatarImage} status="busy" />
              </div>
            </div>
          </div>

          {/* Avatar Initials Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Initials</h2>
            <p className="text-sm text-gray-500 mb-4">
              Avatars with initials for user profiles.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Avatar initials="JD" />
                <Avatar initials="LM" />
                <Avatar initials="AB" />
                <Avatar initials="CD" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
