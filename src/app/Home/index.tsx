import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

import FAQs from "./faq";
import Feature from "./feature";
import Hero from "./hero";
import Nav from "./nav";
import Paths from "./paths";
import Pricing from "./pricing";
import SellingPoint from "./sellingPoint";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      {/* Parent Element */}
      <section className="relative ">
        <SellingPoint />
        <Paths />
        <Feature />
        <Pricing />
        <FAQs />

        {/* Sticky Button */}
        <Link
          href="#top"
          className="sm:fixed sticky right-6 bottom-6 my-4 ml-auto bg-[#1e293b] h-12 w-12 flex justify-center items-center rounded-full"
        >
          <Button className="bg-transparent hover:bg-transparent">
            <ArrowUp className="bg-transparent hover:bg-transparent" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
