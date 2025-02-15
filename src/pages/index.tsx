import { Button } from "@/components";
import { ChevronRight, Mail } from "lucide-react";

export default function Home() {
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
          {/* Primary Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Primary</h2>
            <p className="text-sm text-gray-500 mb-4">
              Primary actions that stand out.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Button text"} variant="primary" />
                <Button text={"Disabled"} variant="primary" disabled />
                <Button
                  text={"Button text"}
                  variant="primary"
                  leadingIcon={Mail}
                />
                <Button
                  text={"Button text"}
                  variant="primary"
                  trailingIcon={ChevronRight}
                />
                <Button text={"Button text"} variant="primary" isLoading />
              </div>
            </div>
          </div>

          {/* Secondary Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Secondary</h2>
            <p className="text-sm text-gray-500 mb-4">
              Secondary actions with less emphasis.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Button text"} variant="secondary" />
                <Button text={"Disabled"} variant="secondary" disabled />
                <Button
                  text={"Button text"}
                  variant="secondary"
                  leadingIcon={Mail}
                />
                <Button
                  text={"Button text"}
                  variant="secondary"
                  trailingIcon={ChevronRight}
                />
                <Button text={"Button text"} variant="secondary" isLoading />
              </div>
            </div>
          </div>

          {/* Ghost Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Ghost</h2>
            <p className="text-sm text-gray-500 mb-4">
              Ghost visual style with actions.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-4">
                <Button text={"Button text"} variant="ghost" />
                <Button text={"Disabled"} variant="ghost" disabled />
                <Button
                  text={"Button text"}
                  variant="ghost"
                  leadingIcon={Mail}
                />
                <Button
                  text={"Button text"}
                  variant="ghost"
                  trailingIcon={ChevronRight}
                />
                <Button text={"Button text"} variant="ghost" isLoading />
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

          {/* Shapes Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Shapes</h2>
            <p className="text-sm text-gray-500 mb-4">
              Different button corner styles.
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

          {/* Animation Section */}
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="font-semibold text-gray-900 mb-2">Animations</h2>
            <p className="text-sm text-gray-500 mb-4">
              Button animations on click.
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
              Buttons with only icons.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly leadingIcon={Mail} />
                <Button iconOnly leadingIcon={ChevronRight} shape={"rounded"} />
                <Button iconOnly leadingIcon={Mail} shape={"pill"} />
                <Button iconOnly leadingIcon={ChevronRight} shape={"sharp"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
