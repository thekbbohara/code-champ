//'use client';
//
//import { ReactNode, useState } from 'react';
//import { ScrollArea } from "@/components/ui/scroll-area";
//import { cn } from "@/lib/utils";
//import {
//  Hash, Users, Settings, Plus, ChevronDown, ChevronRight,
//  Volume2, Lock, Star, Crown, Shield, AtSign, Bell,
//  MessageSquare, UserPlus, Headphones, Mic, Video,
//  Activity, Gift, Sparkles, Heart, Zap, Target
//} from "lucide-react";
//import { Avatar } from "@/components/ui/avatar";
//import { Button } from "@/components/ui/button";
//import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
//import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
//import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
//import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
//
//interface SidebarProps {
//  currentChannel?: string;
//  onChannelSelect?: (channel: string) => void;
//}
//
//interface Category {
//  id: string;
//  name: string;
//  isExpanded: boolean;
//  channels: Channel[];
//  color?: string;
//}
//
//interface Channel {
//  id: string;
//  name: string;
//  type: 'TEXT' | 'VOICE';
//  isPrivate: boolean;
//  unreadCount?: number;
//  connectedUsers?: number;
//}
//
//interface DirectMessage {
//  id: string;
//  username: string;
//  status: 'online' | 'idle' | 'dnd' | 'offline' | 'mobile';
//  avatar?: string;
//  customStatus?: string;
//  unreadCount?: number;
//  isTyping?: boolean;
//  badges?: Badge[];
//}
//
//interface Badge {
//  type: 'NITRO' | 'BOOST' | 'PARTNER';
//  icon: ReactNode;
//  tooltip: string;
//}
//
//export function Sidebar({ currentChannel, onChannelSelect }: SidebarProps) {
//  const [categories, setCategories] = useState<Category[]>([
//    {
//      id: '1',
//      name: 'Global',
//      isExpanded: true,
//      color: 'from-blue-500 to-blue-600',
//      channels: [
//        { id: 'global-chat', name: 'global-chat', type: 'TEXT', isPrivate: false },
//        { id: 'global-voice', name: 'Global Voice', type: 'VOICE', isPrivate: false, connectedUsers: 12 }
//      ]
//    },
//    {
//      id: '2',
//      name: 'Pro',
//      isExpanded: true,
//      color: 'from-purple-500 to-purple-600',
//      channels: [
//        { id: 'pro-chat', name: 'pro-chat', type: 'TEXT', isPrivate: true },
//        { id: 'pro-voice', name: 'Pro Voice', type: 'VOICE', isPrivate: true, connectedUsers: 5 }
//      ]
//    },
//    {
//      id: '3',
//      name: 'Big-B',
//      isExpanded: true,
//      color: 'from-amber-500 to-amber-600',
//      channels: [
//        { id: 'bigb-chat', name: 'bigb-chat', type: 'TEXT', isPrivate: true },
//        { id: 'bigb-voice', name: 'Big-B Voice', type: 'VOICE', isPrivate: true, connectedUsers: 3 }
//      ]
//    }
//  ]);
//
//  const [dms] = useState<DirectMessage[]>([
//    {
//      id: '1',
//      username: 'CoolUser123',
//      status: 'online',
//      customStatus: '🎮 Gaming',
//      unreadCount: 3,
//      badges: [
//        { type: 'NITRO', icon: <Sparkles className="w-3 h-3" />, tooltip: 'Nitro Subscriber' }
//      ]
//    },
//    {
//      id: '2',
//      username: 'ProGamer',
//      status: 'dnd',
//      isTyping: true
//    },
//    {
//      id: '3',
//      username: 'ArtisticSoul',
//      status: 'idle'
//    }
//  ]);
//
//  const [userStatus, setUserStatus] = useState<'online' | 'idle' | 'dnd' | 'invisible'>('online');
//
//  const toggleCategory = (categoryId: string) => {
//    setCategories(prev => prev.map(cat =>
//      cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
//    ));
//  };
//
//  const getStatusColor = (status: string) => {
//    switch (status) {
//      case 'online': return 'bg-green-500';
//      case 'idle': return 'bg-yellow-500';
//      case 'dnd': return 'bg-red-500';
//      case 'mobile': return 'bg-green-500';
//      default: return 'bg-gray-500';
//    }
//  };
//
//  return (
//    <TooltipProvider>
//    <div className="flex flex-col h-full bg-gray-900 w-72">
//      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
//        <h2 className="text-xl font-bold text-white">Code Warriors</h2>
//        <ChevronDown className="w-4 h-5 text-gray-400 hover:text-white cursor-pointer" />
//      </div>
//
//      <ScrollArea className="flex-1">
//        <div className="p-2">
//          {/* Categories and Channels */}
//          {categories.map(category => (
//            <div key={category.id} className="mb-4">
//              <div
//                onClick={() => toggleCategory(category.id)}
//                className={`w-full flex items-center px-3 py-2 rounded-lg bg-gradient-to-r ${category.color} text-white text-sm font-semibold cursor-pointer`}
//              >
//                {category.isExpanded ? (
//                  <ChevronDown className="w-3 h-3 mr-1" />
//                ) : (
//                  <ChevronRight className="w-3 h-3 mr-1" />
//                )}
//                {category.name}
//              </div>
//
//              {category.isExpanded && (
//                <div className="space-y-1 mt-1 ml-2">
//                  {category.channels.map(channel => (
//                    <div
//                      key={channel.id}
//                      onClick={() => onChannelSelect?.(channel.id)}
//                      className={cn(
//                        "w-full flex items-center px-2 py-1.5 rounded-md hover:bg-gray-700 transition group relative cursor-pointer",
//                        currentChannel === channel.id ? "bg-gray-700 text-white" : "text-gray-400"
//                      )}
//                    >
//                      {channel.type === 'TEXT' && <Hash className="w-4 h-4 mr-2" />}
//                      {channel.type === 'VOICE' && <Volume2 className="w-4 h-4 mr-2" />}
//
//                      <span className="truncate">{channel.name}</span>
//
//                      {channel.isPrivate && (
//                        <Lock className="w-3 h-3 ml-2 text-gray-500" />
//                      )}
//
//                      {channel.connectedUsers && channel.connectedUsers > 0 && (
//                        <span className="ml-auto text-xs text-gray-400">
//                          {channel.connectedUsers}
//                        </span>
//                      )}
//                    </div>
//                  ))}
//                </div>
//              )}
//            </div>
//          ))}
//
//          {/* Direct Messages */}
//          <div className="mt-4">
//            <div className="px-2 mb-2 flex items-center justify-between">
//              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                Direct Messages
//              </h3>
//              <Plus className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
//            </div>
//
//            <div className="space-y-1">
//              {dms.map((dm) => (
//                <div
//                  key={dm.id}
//                  className={cn(
//                    "w-full flex items-center px-2 py-1.5 rounded-md hover:bg-gray-700 transition group cursor-pointer",
//                    currentChannel === `dm-${dm.id}` ? "bg-gray-700 text-white" : "text-gray-400"
//                  )}
//                >
//                  <div className="relative mr-2">
//                    <Avatar className="w-8 h-8">
//                      <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
//                        <span className="text-sm">{dm.username[0]}</span>
//                      </div>
//                    </Avatar>
//                    <div className={cn(
//                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900",
//                      getStatusColor(dm.status)
//                    )} />
//                  </div>
//
//                  <div className="flex-1 min-w-0">
//                    <div className="flex items-center">
//                      <span className="truncate">{dm.username}</span>
//                      {dm.badges?.map((badge, index) => (
//                        <Tooltip key={index}>
//                          <div className="ml-1 text-gray-400">
//                            {badge.icon}
//                          </div>
//                        </Tooltip>
//                      ))}
//                    </div>
//                    {(dm.customStatus || dm.isTyping) && (
//                      <div className="text-xs text-gray-400 truncate">
//                        {dm.isTyping ? 'typing...' : dm.customStatus}
//                      </div>
//                    )}
//                  </div>
//
//                  {dm.unreadCount && (
//                    <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">
//                      {dm.unreadCount}
//                    </span>
//                  )}
//                </div>
//              ))}
//            </div>
//          </div>
//        </div>
//      </ScrollArea>
//
//      {/* User Controls */}
//      <div className="p-3 bg-gray-800 flex items-center gap-2">
//        <div className="flex-1 flex items-center gap-2">
//          <Avatar className="w-8 h-8">
//            <img src="/avatar.png" alt="User avatar" />
//          </Avatar>
//          <div className="flex-1 min-w-0">
//            <div className="text-sm font-medium text-white truncate">CoolWarrior</div>
//            <div className="text-xs text-gray-400">#1234</div>
//          </div>
//        </div>
//
//        <div className="flex items-center gap-1">
//          <Tooltip>
//            <div className="p-1 hover:bg-gray-700 rounded-md cursor-pointer">
//              <Mic className="w-5 h-5 text-gray-400" />
//            </div>
//          </Tooltip>
//
//          <Tooltip>
//            <div className="p-1 hover:bg-gray-700 rounded-md cursor-pointer">
//              <Headphones className="w-5 h-5 text-gray-400" />
//            </div>
//          </Tooltip>
//
//          <Tooltip>
//            <div className="p-1 hover:bg-gray-700 rounded-md cursor-pointer">
//              <Settings className="w-5 h-5 text-gray-400" />
//            </div>
//          </Tooltip>
//        </div>
//      </div>
//    </div>
//    </TooltipProvider>
//  );
//}
