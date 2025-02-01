
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Using Input instead of Search
import { CopyIcon } from "lucide-react";

interface InvitePopupProps {
  inviteUrl: string;
  friendList: string[]; // Assuming friendList is an array of strings (usernames or IDs)
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitePopup({ inviteUrl, friendList, open, onOpenChange }: InvitePopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredFriends = friendList.filter((friend) =>
    friend.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex justify-between items-center my-2">
            <span>
              Invite Friends
            </span>
            <Button variant="ghost" onClick={handleCopy} className="ml-2 hover:bg-transparent hover:text-gray-300">
              {copied ? "Copied!" : "Copy"}
              <CopyIcon className="ml-1 h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">

          <div className="space-y-2">
            <Label htmlFor="search">Search Friends</Label>
            <Input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-gray-800 text-white placeholder-gray-400 select-none"
            />
            <ul className="space-y-2">
              {filteredFriends.map((friend) => (
                <li key={friend} className="text-gray-200 flex justify-between">
                  <span className="cursor-default">
                    {friend}
                  </span>
                  <span className="cursor-pointer">Invite</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

