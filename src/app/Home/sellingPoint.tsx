import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
const SellingPoint = () => {
  return <section className='text-center'>
    <h3 className="text-[3.5rem] font-bold mb-12 text-gray-200">
      Why Code Champ ?
    </h3>
    <strong className="text-[2.5rem] font-semibold leading-8 text-gray-300">
      3 out of 4 developers fail technical inteviews <br /> due to lack of real-world practice
    </strong>
    <div className='flex justify-evenly my-20'>
      <div className='flex relative'>
        <p>Felling Overwhelmed by <br /> technical interviews</p>
        <Image src={"/arrow.svg"} alt="->" width={50} height={50} className='absolute  select-none' style={{ right: "-55px", top: "-5px" }} />
      </div>
      <div className='flex relative'>
        <p>Struggling with time pressure during <br /> coding challenges</p>
        <Image src={"/arrow.svg"} alt="->" width={50} height={50} className='absolute select-none' style={{ right: "-55px", top: "-10px" }} />
      </div>
      <p>Losing confidence after <br /> failed interviews</p>
    </div>
    <div className='flex gap-2 justify-center text-gray-400'>
      <span><ArrowDown /> </span><p>There is an easier way</p>
    </div>
  </section >
}
export default SellingPoint;
