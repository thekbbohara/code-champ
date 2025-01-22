'use client';

import { Codearena } from '@/components/common/Codearena';
import { CreateArena } from './_components/createarena';

export default function ArenaHome() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Logo */}
          <div className="relative w-64 h-64">
           <Codearena width={256} height={256}/> 
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold text-white">
            Welcome to CodeArena
          </h1>

          {/* Subheading */}
          <p className="text-2xl text-gray-300 max-w-2xl">
            It&apos;s Time For Battle
          </p>

          {/* Create Arena Button */}
              
              <CreateArena />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Real-time Battles</h3>
              <p className="text-gray-400">Challenge other developers in real-time coding competitions</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Multiple Languages</h3>
              <p className="text-gray-400">Support for various programming languages and frameworks</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Earn Rewards</h3>
              <p className="text-gray-400">Win tokens and climb the global leaderboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
