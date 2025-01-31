import { cn } from "@/lib/utils"
import Image from "next/image"

//src={"/code-champ.png"}
//src={"/logo.svg"}
export const Codearena = ({ height = 50, width = 50, className = "my-0" }) => {
  return <Image
    src={"/code-champ.png"}
    alt="code-champ" height={height} width={width}
    className={cn(`max-w-[90vw] sm:block mix-blend-lighten select-none h-${height}px w-${width}px`, className)}
  />
}

export const Logo = ({ height = 50, width = 50, className = "my-0" }) => {
  return <Image
    src={"/code-champ.png"}
    alt="code-champ" height={height} width={width}
    className={cn(`max-w-[90vw] sm:block  select-none h-${height}px w-${width}px text-white`, className)}
  />
}
