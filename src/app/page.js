
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Footer from "@/components/Footer";
import Heropage from "@/components/Heropage";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import Navbar from "@/components/Navbar";
import Platform from "@/components/Platform";
import WhyChooseNovacare from "@/components/WhyChooseNovacare";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Navbar></Navbar>

      <Heropage></Heropage>
      <FeaturedDoctors></FeaturedDoctors>
      <MedicalSpecializations></MedicalSpecializations>
      <Platform></Platform>
      <WhyChooseNovacare></WhyChooseNovacare>
      

       <Footer></Footer>

    </main>
  );
}