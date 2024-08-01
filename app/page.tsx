import Image from "next/image";
import ComponentSelect from "../components/ComponentSelect.js";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ComponentSelect />
    </main>
  );
}
