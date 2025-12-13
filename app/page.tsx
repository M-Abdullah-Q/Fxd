import Experience from "@/components/Experience";
import ToggleSection from "@/components/ToggleSection";
import { Menu } from "lucide-react";
import Navbar from "@/components/Navbar";
import ValuesGrid from "@/components/ValuesGrid";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Experience />
      <ValuesGrid />
      <ToggleSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
