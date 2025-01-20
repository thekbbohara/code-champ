import { Button } from "@/components/ui/button"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="min-h-full h-[90vh] flex justify-between items-center">
      <div className="my-auto flex flex-col gap-4">
        <h1 className="font-bold text-[46px] leading-9 text-gray-200"><strong>Master Technical Interviews Through Real Competition</strong></h1>
        <h2 className="text-gray-400 font-medium">Practical coding challenges in real-time battles against other developers. Win tokens, build confidence, and land your dream job.</h2>
        <Button className="bg-white w-fit text-black font-medium text-[18px] p-2">
          Start Competing
        </Button>
      </div>
      <Image src={"/code-champ.png"} alt="code-champ" height={250} width={350} />
    </section>
  )
}
export default Hero
