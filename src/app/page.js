
import Heropage from "@/components/Heropage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Navbar></Navbar>

      <Heropage></Heropage>

    </main>
  );
}