import { Button } from "@/components";

export default function Home() {
  return (
    <div className="app-home bg-gray-100 h-screen flex items-center justify-center">
      <Button
        text="Click me"
        variant="primary"
        size="lg"
        onClick={() => console.log('Button clicked')}
      />
    </div>
  );
}
