import { CodeChamp } from "@/components/common/codeChamp"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="min-h-full h-[90vh] flex justify-between items-center">
      <div className="my-auto flex flex-col gap-4">
        <h1 className="font-bold text-[46px] leading-9 text-gray-200"><strong>Master Technical Interviews Through Real Competition</strong></h1>
        <h2 className="text-gray-400 font-medium">Practical coding challenges in real-time battles against other developers. Win tokens, build confidence, and land your dream job.</h2>

        <Link href={"/auth"} className=" w-fit bg-white px-3 py-2 rounded-md font-semibold text-gray-700" >
          Start Competing
        </Link>
      </div>
      <CodeChamp height={250} width={350} />
    </section>
  )
}
export default Hero
