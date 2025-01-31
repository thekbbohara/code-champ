'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import useAuthStore from '@/app/auth/_store';
import { TokenPurchasePopup } from './tokenPurchasePopup';
import { createArena } from '../_store/_api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function CreateArena({ trigger = "button" }: { trigger?: "card" | "button" }) {
  const [roomName, setRoomName] = useState('');
  const [playerMode, setPlayerMode] = useState('1v1');
  const [tokens, setTokens] = useState("1.5");
  const [requiredTokens, setRequiredTokens] = useState("1.5");
  const [language, setLanguage] = useState('javascript');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showTokenPurchasePopup, setShowTokenPurchasePopup] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const createArenaSchema = z.object({
    roomName: z
      .string()
      .min(3, "Arena name must be at least 3 characters long")
      .max(50, "Arena name must be at most 50 characters long"),
    playerMode: z.enum(['1v1', 'multiplayer']),
    tokens: z
      .number()
      .min(1.5, "Minimum entry tokens must be 1.5")
      .max(100, "Maximum entry tokens must be 100"),
    language: z.enum(['javascript', 'python']),
  });

  const handleTokenInput = (value: string) => {
    // Allow only numbers and a single dot (.) for decimal values
    if (/^\d*\.?\d*$/.test(value)) {
      if (parseFloat(value) <= 100 || value === "") {
        setTokens(value); // Update the state with the raw input
      }
    }
  };

  const handleTokenBlur = () => {
    // Validate the value when the input loses focus
    const parsedValue = parseFloat(tokens);

    if (isNaN(parsedValue) || parsedValue < 1.5) {
      setTokens("1.5"); // Default to the minimum value
    } else if (parsedValue > 100) {
      setTokens("100"); // Cap at the maximum value
    } else {
      setTokens(parsedValue.toString()); // Round and set valid value
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const formData = {
      roomName,
      playerMode,
      tokens: parseFloat(tokens),
      language,
    };

    try {
      createArenaSchema.parse(formData);
      setErrors({});

      // Check if user has enough tokens
      if (formData.tokens > user.tokens) {
        setRequiredTokens(String(formData.tokens - user.tokens))
        setShowTokenPurchasePopup(true);
        return;
      }

      // Create arena
      const response = await createArena({
        userId: user.id,
        entryToken: formData.tokens,
        title: formData.roomName,
        config: {
          playerMode: formData.playerMode as "1v1" | "multiplayer",
          language: formData.language as "javascript" | "python"
        }
      });
      if (response.id) {
        router.push(`/arena/${response.id}`)
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Failed to create arena. Please try again."
        });
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error creating arena:", error);
      }
    }
  };
  //useEffect(() => {
  //  if (!user) return;
  //  (async () => {
  //    const res = await getUserArenas({ userId: user.id })
  //    console.log(res)
  //  })()
  //}, [user])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger === "button" ? <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-xl"
        >
          Create Arena
        </Button> : <div className="p-6 bg-gray-800 rounded-lg flex flex-col gap-2 justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-400">
            It&apos;s Time For Battle
          </h1>
          <Button variant={"outline"} className='bg-transparent hover:bg-transparent hover:text-white text-xl w-fit'>
            Create Arena
          </Button>
        </div>
        }
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
            {errors.roomName && <p className="text-red-500 text-sm">{errors.roomName}</p>}
          </div>

          <div className="space-y-2">
            <Label>Player Mode</Label>
            <RadioGroup value={playerMode} onValueChange={setPlayerMode} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="1v1"
                  id="1v1"
                  className={`border-2 ${playerMode === "1v1" ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                />
                <Label htmlFor="1v1">1 vs 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="multiplayer"
                  id="multiplayer"
                  className={`border-2 ${playerMode === "multiplayer" ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                />
                <Label htmlFor="multiplayer">Multiplayer</Label>
              </div>
            </RadioGroup>
          </div>


          <div className="space-y-2">
            <Label htmlFor="tokens" className='flex justify-between'><span>Entry Tokens</span><span>{user?.tokens}</span></Label>
            <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <button
                type="button"
                onClick={() => setTokens((prev) => Math.max(1.5, parseFloat(prev) - 0.5).toString())}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                -
              </button>
              <div className="text-gray-200 text-xl font-bold flex gap-1">
                <input
                  type="text"
                  value={tokens}
                  onChange={(e) => handleTokenInput(e.target.value)}
                  onBlur={handleTokenBlur}
                  className={cn("bg-transparent outline-none border-none rounded-lg w-full")}
                  style={{ width: `${Math.min(tokens.toString().length, 6)}ch` }}
                />
                <span>Tokens</span>
              </div>
              <button
                type="button"
                onClick={() => setTokens((prev) => Math.min(100, parseFloat(prev) + 0.5).toString())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                +
              </button>
            </div>
            {/**
<p className="text-sm text-gray-400">
              Use the buttons or type to set the token amount (1.5 - 100). Tokens will be added to the winner&apos;s prize pool.
            </p>
              */}
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
        {user && (
          <TokenPurchasePopup
            requiredTokens={requiredTokens}
            userId={user.id}
            onSuccess={() => {
              setShowTokenPurchasePopup(false);
              //handleSubmit({} as unknown as React.FormEvent<HTMLFormElement>);
            }}
            open={showTokenPurchasePopup}
            onOpenChange={setShowTokenPurchasePopup}
          />
        )}
      </DialogContent>

    </Dialog>
  );
}
