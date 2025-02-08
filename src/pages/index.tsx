import { Button } from "@/components";

export default function Home() {
  return (
    <div className="app-home bg-gray-100 h-screen flex flex-col p-24 justify-center space-y-4">
      <div className="space-x-4">
        <Button
          text="Button"
          variant="primary"
          shape="rounded"
        />
        <Button
          text="Button"
          variant="secondary"
          shape="pill"
        />
        <Button
          text="Button"
          variant="success"
          shape="sharp"
        />
        <Button
          text="Button"
          variant="danger"
          shape="default"
        />
      </div>

      <div className="space-x-4">
        <Button
          text="Button XL"
          variant="primary"
          size="xl"
        />
        <Button
          text="Button LG"
          variant="secondary"
          size="lg"
        />
        <Button
          text="Button MD"
          variant="success"
          size="md"
        />
        <Button
          text="Button SM"
          variant="danger"
          size="sm"
        />
        <Button
          text="Button XS"
          variant="warning"
          size="xs"
        />
      </div>

      <div className="space-x-4">
        <Button
          text="Button"
          variant="primary"
        />
        <Button
          text="Button"
          variant="secondary"
        />
        <Button
          text="Button"
          variant="success"
        />
        <Button
          text="Button"
          variant="danger"
        />
        <Button
          text="Button"
          variant="warning"
        />
        <Button
          text="Button"
          variant="info"
        />
        <Button
          text="Button"
          variant="outline"
        />
        <Button
          text="Button"
          variant="ghost"
        />
      </div>
    </div>
  );
}
