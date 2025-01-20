import { Button } from "@/components/ui/button"
import Image from "next/image"

const Nav = () => {
  return <header className="flex justify-between items-center" id="top">
    <nav className="flex gap-8 items-center" id="nav">
      <div className="flex gap-2 items-center">
        <Image src={"/code-champ.png"} alt="code-champ" height={50} width={50} />
        <h1 className="text-gray-200 font-bold lowercase text-[20px]">Code champ</h1>
      </div>
      <ul className="flex list-none gap-6 text-gray-400">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faqs">FAQs</a></li>
      </ul>
    </nav>
    <Button className="bg-white px-3 py-2 rounded-md font-semibold text-gray-700" variant={"default"}>
      Get Started
    </Button>
  </header>
}

export default Nav
