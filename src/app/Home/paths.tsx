const Paths = () => {
  return (
    <section className="w-fit mx-auto my-16 flex flex-col gap-8">
      <h3 className="font-bold text-[38px] text-gray-300">Your Path to Interview Success</h3>
      <ol className="flex flex-col gap-6 max-w-[500px]">
        <li className="flex gap-4">
          <div className="bg-[#1e293b] p-6 rounded-full aspect-square w-14 h-14 flex justify-center items-center font-bold text-[24px]">1</div>
          <div>
            <h5 className="font-semibold">Sign Up</h5>
            <p>Create your account and complete a skill assesment to determine your initial ranking</p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="bg-[#1e293b] p-6 rounded-full aspect-square w-14 h-14 flex justify-center items-center font-bold text-[24px]">2</div>
          <div>
            <h5>Join a Battel</h5>
            <p>Get matched with an opponent and receive your coding challenges</p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="bg-[#1e293b]  p-6 rounded-full aspect-square w-14 h-14 flex justify-center items-center font-bold text-[24px]">3</div>
          <div>
            <h5>Code Under Pressure</h5>
            <p>Solve the problem within the time limit while competing head-to-head</p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="bg-[#1e293b] p-6 rounded-full aspect-square w-14 h-14 flex justify-center items-center font-bold text-[24px]">4</div>
          <div>
            <h5>Win Rewards</h5>
            <p>Earn tokens for victories and climb the global leaderboard</p>
          </div>
        </li>
      </ol>
    </section>
  )
}
export default Paths;
