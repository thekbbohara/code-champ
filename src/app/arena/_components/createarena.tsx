'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function CreateArena() {
  const [roomName, setRoomName] = useState('');
  const [playerMode, setPlayerMode] = useState('1v1');
  const [tokens, setTokens] = useState(0);
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-xl"
        >
          Create Arena
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Arena</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomName">Arena Name</Label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-gray-800 border-gray-700"
              placeholder="Enter arena name"
            />
          </div>

          <div className="space-y-2">
            <Label>Player Mode</Label>
            <RadioGroup value={playerMode} onValueChange={setPlayerMode} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1v1" id="1v1" />
                <Label htmlFor="1v1">1 vs 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiplayer" id="multiplayer" />
                <Label htmlFor="multiplayer">Multiplayer</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tokens">Entry Tokens</Label>
            <Input
              id="tokens"
              type="number"
              min="0"
              value={tokens}
              onChange={(e) => setTokens(Number(e.target.value))}
              className="bg-gray-800 border-gray-700"
              placeholder="Enter token amount"
            />
            <p className="text-sm text-gray-400">Tokens will be added to the winner&apos;s prize pool</p>
          </div>

          <div className="space-y-2">
            <Label>Programming Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Create Arena
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
