'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getArena } from '../_store/_api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { type Room, type RoomConfig, type RoomMessage, type Participant, type User } from '@prisma/client';
import { useParams } from 'next/navigation';
import { InvitePopup } from '../components/invitePopup';


export type RoomWithRelations = Room & {
  config: RoomConfig[];
  participants: (Participant & { user: User })[];
  createdBy: User;
  createdAt: Date;
  roomChat?: { messages: (RoomMessage & { user: User })[] };
};

export default function ArenaRoom() {
  const [message, setMessage] = useState('');
  const [openInvitPopup, setIsOpenInvitePopup] = useState<boolean>(false)
  const params = useParams();
  const cuid = params.cuid as string;
  // Fetch room data using React Query
  const { data: room, isLoading, isError } = useQuery<RoomWithRelations>({
    queryKey: ['arena', cuid],
    queryFn: () => getArena({ cuid }),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement sending message to API
    setMessage('');
  };

  // Loading Skeleton

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Arena Info Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="mb-4 flex justify-between">
                  <Skeleton className="h-10 w-48 bg-gray-700" />
                  <Skeleton className="h-10 w-32 bg-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-32 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-40 bg-gray-700" />
                  <Skeleton className="h-4 w-36 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-28 bg-gray-700" />
                </div>
              </div>

              {/* Participants Skeleton */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-400 mb-4">Participants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full bg-gray-600" />
                        <Skeleton className="h-4 w-24 bg-gray-600" />
                      </div>
                      <Skeleton className="h-6 w-16 bg-gray-600 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Section Skeleton */}
            <div className="bg-gray-800 rounded-lg p-6 h-[70vh] flex flex-col">
              <h2 className="text-xl font-bold text-gray-400 mb-4">Arena Chat</h2>
              <ScrollArea className="flex-grow mb-4 pr-4">
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-gray-700 rounded-lg p-3">
                      <Skeleton className="h-4 w-1/2 bg-gray-600 mb-2" />
                      <Skeleton className="h-6 w-full bg-gray-600" />
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form className="flex gap-2">
                <Skeleton className="h-10 flex-grow bg-gray-700 border-gray-600 rounded" />
                <Skeleton className="h-10 w-20 bg-gray-700 rounded" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );


  // Error Handling
  if (isError) return <div className="text-red-500 text-center">Failed to load arena.</div>;
  if (!room) return <div className="text-center">Room not found</div>;

  const getConfigValue = (key: string) => room.config.find(c => c.key === key)?.value || '';

  return (
    <section>
      <InvitePopup
        inviteUrl={`${process.env.NEXT_PUBLIC_CODEAREAN_CLIENT || "https://codearena-pro.vercel.app"}/join?arena=${cuid}`}
        friendList={["thekbbohara", "jainam", "rishi", "aakash", "sandip", "sandesh"]}
        open={openInvitPopup}
        onOpenChange={() => { setIsOpenInvitePopup(false) }} />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Arena Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="mb-4 flex justify-between">
                  <h1 className="text-3xl font-bold text-white">{room.title || 'Arena'}</h1>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Start Battle
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <p className="text-sm">Mode: {getConfigValue('playerMode')}</p>
                  <p className="text-sm">Language: {getConfigValue('language')}</p>
                  <p className="text-sm">Entry Token: {room.entryToken}</p>
                  <p className="text-sm">
                    Players: {1 + room.participants.length}{getConfigValue('playerMode') === "1v1" ? "/2" : ""}
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className='flex justify-between'>
                  <h2 className="text-xl font-bold text-white mb-4">Participants</h2>
                  <div className='py-0 flex gap-2'>
                    <Button
                      className='bg-transparent hover:bg-transparent hover:text-gray-400 hover:border-gray-400 py-0 my-0'
                      variant={"outline"}
                      onClick={() => { setIsOpenInvitePopup(true) }}>
                      Invite
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={String(room.createdBy.avatarUrl)} alt="avatar" />
                        <AvatarFallback>{String(room.createdBy.name).slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-white">{room.createdBy.name}</span>
                    </div>
                    <span className="px-2 py-1 rounded text-sm bg-green-600 cursor-default">Host</span>
                  </div>

                  {room.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={String(participant.user.avatarUrl)} alt="avatar" />
                          <AvatarFallback>{String(participant.user.name).slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-white">{participant.user.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${participant.state === "ready" ? 'bg-green-600' : 'bg-yellow-600'}`}>
                        {participant.state ? 'Ready' : 'Not Ready'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-gray-800 rounded-lg p-6 h-[80vh] flex flex-col">
              <h2 className="text-xl font-bold text-white mb-4">Arena Chat</h2>

              <ScrollArea className="flex-grow mb-4 pr-4">
                <div className="space-y-4">
                  {room.roomChat?.messages.map((msg) => (
                    <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{msg.user.name}</span>
                        <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-white">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-700 border-gray-600"
                />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
