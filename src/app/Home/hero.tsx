import { Codearena } from "@/components/common/Codearena"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="min-h-[90vh] h-full flex flex-col-reverse sm:my-0 mt-6 mb-24 sm:flex-row  justify-between items-center ">
      <div className="my-auto flex flex-col gap-4">
        <h1 className="font-bold text-[46px] leading-10 sm:leading-9 sm:my-0 my-4 text-gray-200"><strong>Master Technical Interviews Through Real Competition</strong></h1>
        <h2 className="text-gray-400 font-medium ">Practical coding challenges in real-time battles against other developers. Win tokens, build confidence, and land your dream job.</h2>

        <Link href={"/auth"} className=" w-fit bg-white px-3 py-2 rounded-md font-semibold text-gray-700" >
          Start Competing
        </Link>
      </div>
      <Codearena height={250} width={350} className="sm:my-0 my-4" />
    </section>
  )
}
export default Hero
