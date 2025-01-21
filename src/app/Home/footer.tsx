import { CodeChamp } from "@/components/common/codeChamp"
import { Copyright, Github, XIcon, } from "lucide-react"

const Footer = () => {
  return (<footer className="border border-transparent  border-t-gray-600 mt-20 flex justify-between items-center">
    <div>
      <div className="flex gap-2 items-center">
        <CodeChamp />
        <h1 className="text-gray-200 font-bold lowercase text-[20px]">Code champ</h1>
      </div>
      <div className="pl-2 flex justify-start items-center gap-2">
        <span>Copyright</span><Copyright size={12} /><span>2025</span>
      </div>
    </div>
    <div className="flex gap-4">
      <a href="https://x.com/thekbbohara" className="bg-[#1e293b] w-8 h-8 rounded-lg flex items-center justify-center"><XIcon /></a>
      <a href="https://github.com/thekbbohara/code-champ" className="bg-[#1e293b] w-8 h-8 rounded-lg flex items-center justify-center"><Github /></a>
    </div>
  </footer>)
}
export default Footer
