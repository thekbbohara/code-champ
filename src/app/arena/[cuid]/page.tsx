'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

//export default function ArenaRoom({ params }: { params: { cuid: string } }) {
export default function ArenaRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock data - would come from API/DB in real implementation
  const roomData = {
    name: "Epic Code Battle",
    mode: "1v1",
    language: "JavaScript",
    tokenPool: 100,
    participants: [
      { id: 1, name: "Player 1", ready: true },
      { id: 2, name: "Player 2", ready: false }
    ],
    maxParticipants: 2
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Math.random().toString(),
      content: message,
      sender: "Player 1",
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Arena Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-bold text-white mb-4">{roomData.name}</h1>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Start Battle
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm">Mode: {roomData.mode}</p>
                  <p className="text-sm">Language: {roomData.language}</p>
                </div>
                <div>
                  <p className="text-sm">Token Pool: {roomData.tokenPool}</p>
                  <p className="text-sm">Players: {roomData.participants.length}/{roomData.maxParticipants}</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Participants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomData.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                      <span className="text-white">{participant.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${participant.ready ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {participant.ready ? 'Ready' : 'Not Ready'}
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
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{msg.sender}</span>
                      <span>{msg.timestamp.toLocaleTimeString()}</span>
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
  );
}
