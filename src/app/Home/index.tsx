import { Button } from "@/components/ui/button";
import FAQs from "./faq";
import Feature from "./feature";
import Hero from "./hero";
import Nav from "./nav";
import Paths from "./paths";
import Pricing from "./pricing";
import SellingPoint from "./sellingPoint";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Footer from "./footer";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto pb-16 min-h-full">
      <Nav />
      <Hero />
      <SellingPoint />
      <Paths />
      <Feature />
      <Pricing />
      <FAQs />
      <Footer />
      <Link href={'#top'} className="fixed bottom-6 right-6 bg-[#1e293b] h-12 w-12 flex justify-center items-center rounded-full"><Button><ArrowUp /></Button></Link>
    </main>
  );
}
