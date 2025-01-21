import { cn } from "@/lib/utils"
import Image from "next/image"

export const CodeChamp = ({ height = 50, width = 50, className = "my-0" }) => {
  return <Image className={cn(`max-w-[90vw] sm:block mix-blend-lighten select-none h-${height}px w-${width}px`, className)} src={"/code-champ.png"} alt="code-champ" height={height} width={width} />
}

