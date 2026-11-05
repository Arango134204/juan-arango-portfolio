import Hero from "@/components/Hero";
import Now from "@/components/Now";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Quoter from "@/components/Quoter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Now />
      <Projects />
      <TechStack />
      <Quoter />
      <Footer />
    </main>
  );
}
