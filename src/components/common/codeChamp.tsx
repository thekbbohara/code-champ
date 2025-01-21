import { cn } from "@/lib/utils"
import Image from "next/image"

export const CodeChamp = ({ height = 50, width = 50, className = "my-0" }) => {
  return <Image className={cn(className, "mix-blend-difference max-w-[90vw] sm:block sm:mix-blend-lighten select-none bg-transparent")} src={"/code-champ.png"} alt="code-champ" height={height} width={width} />
}

