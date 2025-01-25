'use client';

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative m-0 p-0 w-fll bg-transparent hover:bg-transparent order-2">
          <Bell className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-3 h-4 w-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] font-medium text-white flex items-center justify-center">
            4
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gray-900/60 backdrop-blur-sm border border-gray-700" align="end">
        <div className="border-b border-gray-700 px-4 py-3">
          <h4 className="text-sm font-semibold text-white">Notifications</h4>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="divide-y divide-gray-700">
            {[1, 2, 3].map((notification) => (
              <div
                key={notification}
                className="flex items-start gap-4 p-4 hover:bg-gray-800/60 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-white">
                    New challenge available in Arena
                  </p>
                  <p className="text-xs text-gray-400">
                    2 minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
