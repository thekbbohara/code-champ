//'use client';
//
//import { useState, useEffect, useCallback } from 'react';
//import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
//import { ScrollArea } from '@/components/ui/scroll-area';
//import { Sidebar } from './_components/sidebar';
//import { motion, AnimatePresence } from 'framer-motion';
//import { Smile, Paperclip, Image, Send, Mic, Gift, Settings, Bell, Search } from 'lucide-react';
//import { Tooltip } from '@/components/ui/tooltip';
//import { Avatar } from '@/components/ui/avatar';
//import { Dialog } from '@/components/ui/dialog';
//import { Popover } from '@/components/ui/popover';
//
//interface Message {
//  id: string;
//  content: string;
//  sender: string;
//  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'ICON' | 'GIFT' | 'VOICE';
//  timestamp: Date;
//  reactions?: Reaction[];
//  attachments?: Attachment[];
//  isEdited?: boolean;
//  replyTo?: string;
//}
//
//interface Reaction {
//  emoji: string;
//  count: number;
//  users: string[];
//}
//
//interface Attachment {
//  id: string;
//  type: 'IMAGE' | 'VIDEO' | 'FILE';
//  url: string;
//  name: string;
//  size: number;
//  thumbnailUrl?: string;
//}
//
//interface User {
//  id: string;
//  name: string;
//  avatar: string;
//  status: 'online' | 'idle' | 'dnd' | 'offline';
//  customStatus?: string;
//  roles: string[];
//}
//
//interface Channel {
//  id: string;
//  name: string;
//  type: 'TEXT' | 'VOICE' | 'ANNOUNCEMENT';
//  description?: string;
//  isPrivate: boolean;
//  members: string[];
//}
//
//export default function HangoutArea() {
//  const [message, setMessage] = useState('');
//  const [messages, setMessages] = useState<Message[]>([]);
//  const [currentChannel, setCurrentChannel] = useState<string>('general');
//  const [isTyping, setIsTyping] = useState<boolean>(false);
//  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
//  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
//  const [searchQuery, setSearchQuery] = useState<string>('');
//  const [notifications, setNotifications] = useState<boolean>(true);
//  const [userSettings, setUserSettings] = useState({
//    theme: 'dark',
//    notifications: true,
//    sounds: true,
//    status: 'online' as const,
//  });
//
//  const [users] = useState<User[]>([
//    { id: '1', name: 'Alice', avatar: '/avatars/alice.jpg', status: 'online', roles: ['admin'] },
//    { id: '2', name: 'Bob', avatar: '/avatars/bob.jpg', status: 'idle', roles: ['moderator'] },
//    { id: '3', name: 'Charlie', avatar: '/avatars/charlie.jpg', status: 'dnd', roles: ['member'] },
//    { id: '4', name: 'Diana', avatar: '/avatars/diana.jpg', status: 'offline', roles: ['member'] },
//    { id: '5', name: 'Eve', avatar: '/avatars/eve.jpg', status: 'online', roles: ['vip'] },
//  ]);
//
//  const [channels] = useState<Channel[]>([
//    { id: 'general', name: 'General', type: 'TEXT', isPrivate: false, members: ['1', '2', '3', '4', '5'] },
//    { id: 'announcements', name: 'Announcements', type: 'ANNOUNCEMENT', isPrivate: true, members: ['1', '2'] },
//    { id: 'voice-chat', name: 'Voice Chat', type: 'VOICE', isPrivate: false, members: ['1', '2', '3'] },
//  ]);
//
//  const handleTyping = useCallback(() => {
//    setIsTyping(true);
//    const timeout = setTimeout(() => setIsTyping(false), 3000);
//    return () => clearTimeout(timeout);
//  }, []);
//
//  const sendMessage = (e: React.FormEvent) => {
//    e.preventDefault();
//    if (!message.trim()) return;
//
//    const newMessage: Message = {
//      id: Math.random().toString(),
//      content: message,
//      sender: "User",
//      type: 'TEXT',
//      timestamp: new Date(),
//      reactions: [],
//      isEdited: false,
//    };
//
//    setMessages(prev => [...prev, newMessage]);
//    setMessage('');
//    setIsTyping(false);
//  };
//
//  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//    const files = e.target.files;
//    if (!files) return;
//
//    // Handle file upload logic
//    Array.from(files).forEach(file => {
//      const reader = new FileReader();
//      reader.onload = () => {
//        const newMessage: Message = {
//          id: Math.random().toString(),
//          content: '',
//          sender: "User",
//          type: file.type.startsWith('image/') ? 'IMAGE' : 'FILE',
//          timestamp: new Date(),
//          attachments: [{
//            id: Math.random().toString(),
//            type: file.type.startsWith('image/') ? 'IMAGE' : 'FILE',
//            url: reader.result as string,
//            name: file.name,
//            size: file.size,
//          }]
//        };
//        setMessages(prev => [...prev, newMessage]);
//      };
//      reader.readAsDataURL(file);
//    });
//  };
//
//  const handleReaction = (messageId: string, emoji: string) => {
//    setMessages(prev => prev.map(msg => {
//      if (msg.id === messageId) {
//        const reactions = msg.reactions || [];
//        const existingReaction = reactions.find(r => r.emoji === emoji);
//
//        if (existingReaction) {
//          return {
//            ...msg,
//            reactions: reactions.map(r =>
//              r.emoji === emoji
//                ? { ...r, count: r.count + 1, users: [...r.users, 'User'] }
//                : r
//            )
//          };
//        }
//
//        return {
//          ...msg,
//          reactions: [...reactions, { emoji, count: 1, users: ['User'] }]
//        };
//      }
//      return msg;
//    }));
//  };
//
//  useEffect(() => {
//    const handleKeyPress = (e: KeyboardEvent) => {
//      if (e.key === 'Escape') {
//        setShowEmojiPicker(false);
//        setSelectedMessages([]);
//      }
//    };
//
//    window.addEventListener('keydown', handleKeyPress);
//    return () => window.removeEventListener('keydown', handleKeyPress);
//  }, []);
//
//  return (
//    <div className="min-h-screen bg-gray-900">
//      <div className="container mx-auto px-4 py-8">
//        <div className="grid grid-cols-12 gap-4 h-[90vh]">
//          <div className="col-span-2 bg-gray-800 rounded-lg p-4">
//            <Sidebar currentChannel={currentChannel} onChannelSelect={setCurrentChannel} />
//          </div>
//
//          <div className="col-span-7 bg-gray-800 rounded-lg p-6 flex flex-col">
//            <div className="flex items-center justify-between mb-6">
//              <div className="flex items-center space-x-4">
//                <span className="text-gray-300 text-2xl">#</span>
//                <div>
//                  <h2 className="text-xl font-bold text-white">{currentChannel}</h2>
//                  <p className="text-sm text-gray-400">Welcome to #{currentChannel}</p>
//                </div>
//              </div>
//
//              <div className="flex items-center space-x-4">
//                <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
//                <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
//                <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
//              </div>
//            </div>
//
//            <ScrollArea className="flex-grow mb-4 pr-4">
//              <AnimatePresence>
//                <div className="space-y-4">
//                  {messages.map((msg) => (
//                    <motion.div
//                      key={msg.id}
//                      initial={{ opacity: 0, y: 20 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      exit={{ opacity: 0 }}
//                      className="group hover:bg-gray-750 rounded-lg p-3"
//                    >
//                      <div className="flex items-start space-x-3">
//                        <Avatar className="w-10 h-10" />
//                        <div className="flex-1">
//                          <div className="flex items-baseline space-x-3">
//                            <span className="font-semibold text-white">{msg.sender}</span>
//                            <span className="text-xs text-gray-400">
//                              {msg.timestamp.toLocaleTimeString()}
//                            </span>
//                          </div>
//
//                          {msg.type === 'TEXT' && (
//                            <p className="text-gray-300">{msg.content}</p>
//                          )}
//
//                          {msg.type === 'IMAGE' && msg.attachments && (
//                            <img
//                              src={msg.attachments[0].url}
//                              alt="attachment"
//                              className="max-w-md rounded-lg mt-2"
//                            />
//                          )}
//
//                          {msg.reactions && msg.reactions.length > 0 && (
//                            <div className="flex gap-2 mt-2">
//                              {msg.reactions.map((reaction, index) => (
//                                <div
//                                  key={index}
//                                  className="flex items-center bg-gray-700 rounded-full px-2 py-1"
//                                >
//                                  <span>{reaction.emoji}</span>
//                                  <span className="ml-1 text-xs text-gray-300">{reaction.count}</span>
//                                </div>
//                              ))}
//                            </div>
//                          )}
//                        </div>
//                      </div>
//                    </motion.div>
//                  ))}
//                </div>
//              </AnimatePresence>
//            </ScrollArea>
//
//            {isTyping && (
//              <div className="text-gray-400 text-sm mb-2">Someone is typing...</div>
//            )}
//
//            <form onSubmit={sendMessage} className="flex gap-2">
//              <div className="flex-grow flex items-center gap-2 bg-gray-700 rounded-lg px-4">
//                <Paperclip
//                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
//                  onClick={() => document.getElementById('file-upload')?.click()}
//                />
//                <input
//                  id="file-upload"
//                  type="file"
//                  className="hidden"
//                  multiple
//                  onChange={handleFileUpload}
//                />
//
//                <Input
//                  value={message}
//                  onChange={(e) => {
//                    setMessage(e.target.value);
//                    handleTyping();
//                  }}
//                  placeholder={`Message #${currentChannel}`}
//                  className="flex-grow bg-transparent border-none focus:ring-0"
//                />
//
//                <Smile
//                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
//                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                />
//
//                <Gift className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
//              </div>
//
//              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
//                <Send className="w-5 h-5" />
//              </Button>
//            </form>
//          </div>
//
//          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
//            <h2 className="text-xl font-bold text-white mb-4">Online Members</h2>
//            <ScrollArea className="h-full">
//              <div className="space-y-3">
//                {users.map((user) => (
//                  <div key={user.id} className="flex items-center space-x-3">
//                    <div className="relative">
//                      <Avatar className="w-8 h-8" />
//                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800
//                        ${user.status === 'online' ? 'bg-green-500' :
//                          user.status === 'idle' ? 'bg-yellow-500' :
//                            user.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
//                        }`}
//                      />
//                    </div>
//                    <div>
//                      <span className="text-gray-300">{user.name}</span>
//                      {user.roles.map(role => (
//                        <span key={role} className="ml-2 text-xs text-indigo-400">{role}</span>
//                      ))}
//                    </div>
//                  </div>
//                ))}
//              </div>
//            </ScrollArea>
//          </div>
//        </div>
//      </div>
//    </div>
//  );
//}


export default function HangoutArea() {
  //return <section>Just go and watch some movie or build it yourself it&apos;s on github</section>
  return <section>Just go find yourself a girlfriend.</section>
}
