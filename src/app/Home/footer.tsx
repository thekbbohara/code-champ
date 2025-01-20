import { Copyright, Github, XIcon, } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  return (<footer className="border border-transparent  border-t-gray-600 mt-20 flex justify-between items-center">
    <div>
      <div className="flex gap-2 items-center">
        <Image src={"/code-champ.png"} alt="code-champ" height={50} width={50} />
        <h1 className="text-gray-200 font-bold lowercase text-[20px]">Code champ</h1>
      </div>
      <div className="pl-2 flex justify-start items-center gap-2">
        <span>Copyright</span><Copyright size={12} /><span>2025</span>
      </div>
    </div>
    <div className="flex gap-4">
      <div className="bg-[#1e293b] w-8 h-8 rounded-lg flex items-center justify-center"><XIcon /></div>
      <div className="bg-[#1e293b] w-8 h-8 rounded-lg flex items-center justify-center"><Github /></div>
    </div>
  </footer>)
}
export default Footer
