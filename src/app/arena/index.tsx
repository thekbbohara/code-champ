'use client';

import { Codearena } from '@/components/common/Codearena';
import { CreateArena } from './components/createarena';
import { useAuth } from '@/hooks/use-auth';
import { getUserArenas } from './_store/_api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { type Room, type RoomConfig, type RoomMessage, type User } from '@prisma/client';

type RoomWithRelations = Room & {
  config: RoomConfig[];
  createdBy: User;
  roomChat?: {
    messages: (RoomMessage & {
      user: User;
    })[];
  };
};

export default function ArenaHome() {
  const { user } = useAuth();
  const { data: rooms, isLoading, isError } = useQuery<RoomWithRelations[]>({
    queryKey: ["userArenas", user?.id],
    queryFn: () => getUserArenas({ userId: String(user?.id) }),
    enabled: !!user,
  });

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-4 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Logo */}
          <div className="relative w-64 h-64">
            <Codearena width={256} height={256} />
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

          {/* Rooms Grid */}
          <div className="w-full">
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 bg-gray-800 rounded-lg animate-pulse">
                    <div className="h-6 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
                  </div>
                ))}
              </div>
            )}

            {rooms && rooms.length >= 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {rooms.map((room) => (
                  <Link href={`/arena/${room.id}`} key={room.id} className="p-6 bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-2">{room.title}</h3>
                    <sup>Status: {room.status}</sup>
                    <div className="text-gray-400 space-y-1">
                      <p>Entry Tokens: {room.entryToken}</p>
                      <p>{room.config.find((c: RoomConfig) => c.key === 'playerMode')?.value}: {room.config.find((c: RoomConfig) => c.key === 'language')?.value}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {(isError || (rooms && rooms.length === 0)) && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
