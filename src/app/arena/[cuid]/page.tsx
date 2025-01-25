'use client';

import { useState, useEffect, use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getArena } from '../_store/_api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Room, type RoomConfig, type RoomMessage, type Participant, type User } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

type RoomWithRelations = Room & {
  config: RoomConfig[];
  participants: (Participant & {
    user: User;
  })[];
  createdBy: User;
  roomChat?: {
    messages: (RoomMessage & {
      user: User;
    })[];
  };
};


export default function ArenaRoom({ params }: { params: Promise<{ cuid: string }> }) {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState<RoomWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cuid } = use(params)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getArena({ cuid });
        setRoom(data);
      } catch (err) {
        setError('Failed to load arena');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [cuid]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement sending message to API
    setMessage('');
  };

  if (loading) return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4 flex justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-4 w-36 mb-2" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 h-[90vh] flex flex-col">
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="flex-grow mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-grow" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <div>{error}</div>;
  if (!room) return <div>Room not found</div>;

  const getConfigValue = (key: string) => {
    const config = room.config.find(c => c.key === key);
    return config?.value || '';
  };
  //
  //const getParticipantState = (participant: Participant, key: string) => {
  //  return participant.state.find(s => s.key === key)?.value === 'true';
  //};

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Arena Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {room.title || 'Arena'}
                </h1>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Start Battle
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm">Mode: {getConfigValue('playerMode')}</p>
                  <p className="text-sm">Language: {getConfigValue('language')}</p>
                </div>
                <div>
                  <p className="text-sm">Entry Token: {room.entryToken}</p>
                  <p className="text-sm">Players: {1 + room.participants.length}{getConfigValue('playerMode') === "1v1" ? "/2" : ""}</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Participants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full">
                      <Avatar>
                        <AvatarImage src={String(room?.createdBy?.avatarUrl)} alt='avatar' />
                        <AvatarFallback>{String(room?.createdBy?.name).slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-white">{room.createdBy.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm  bg-green-600 cursor-default`}>
                    Host
                  </span>
                </div>
                {room.participants.map((participant, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full">
                        <Avatar>
                          <AvatarImage src={String(participant?.user?.avatarUrl)} alt='avatar' />
                          <AvatarFallback>{String(participant.user.name).slice(0, 2)}</AvatarFallback>
                        </Avatar>

                      </div>
                      <span className="text-white">{participant.user.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${participant.state == "ready" ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {participant.state ? 'Ready' : 'Not Ready'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-gray-800 rounded-lg p-6 h-[90vh] flex flex-col">
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
    </div >
  );
}
