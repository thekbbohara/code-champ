//import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
//import { ScrollArea } from '@/components/ui/scroll-area';
//import { Avatar } from '@/components/ui/avatar';
//import { Smile, Paperclip, Image, Send, Mic, Gift, Settings, Bell, Search, Users } from 'lucide-react';
//
//interface MainContentProps {
//  currentChannel: string;
//  messages: Message[];
//  message: string;
//  setMessage: (message: string) => void;
//  isTyping: boolean;
//  handleTyping: () => void;
//  sendMessage: (e: React.FormEvent) => void;
//  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
//  showEmojiPicker: boolean;
//  setShowEmojiPicker: (show: boolean) => void;
//  showMembersList: boolean;
//  setShowMembersList: (show: boolean) => void;
//}
//
//export function MainContent({
//  currentChannel,
//  messages,
//  message,
//  setMessage,
//  isTyping,
//  handleTyping,
//  sendMessage,
//  handleFileUpload,
//  showEmojiPicker,
//  setShowEmojiPicker,
//  showMembersList,
//  setShowMembersList
//}: MainContentProps) {
//  return (
//    <div className="flex-1 flex flex-col bg-gray-800 rounded-lg overflow-hidden">
//      {/* Channel Header */}
//      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
//        <div className="flex items-center gap-2">
//          <h2 className="text-xl font-semibold">#{currentChannel}</h2>
//          <span className="text-gray-400 text-sm">Channel Description</span>
//        </div>
//        <div className="flex items-center gap-2">
//          <Button
//            variant="ghost"
//            size="icon"
//            onClick={() => setShowMembersList(!showMembersList)}
//          >
//            <Users className="h-5 w-5" />
//          </Button>
//          <Button variant="ghost" size="icon">
//            <Search className="h-5 w-5" />
//          </Button>
//          <Button variant="ghost" size="icon">
//            <Bell className="h-5 w-5" />
//          </Button>
//          <Button variant="ghost" size="icon">
//            <Settings className="h-5 w-5" />
//          </Button>
//        </div>
//      </div>
//
//      {/* Messages Area */}
//      <ScrollArea className="flex-1 p-4">
//        <div className="space-y-4">
//          {messages.map((msg) => (
//            <div key={msg.id} className="flex items-start gap-3">
//              <Avatar>
//                <img src="/avatars/default.png" alt={msg.sender} />
//              </Avatar>
//              <div>
//                <div className="flex items-center gap-2">
//                  <span className="font-semibold">{msg.sender}</span>
//                  <span className="text-xs text-gray-400">
//                    {msg.timestamp.toLocaleTimeString()}
//                  </span>
//                </div>
//                {msg.type === 'TEXT' && (
//                  <p className="text-gray-200">{msg.content}</p>
//                )}
//                {msg.type === 'IMAGE' && msg.attachments && (
//                  <img
//                    src={msg.attachments[0].url}
//                    alt={msg.attachments[0].name}
//                    className="max-w-md rounded-lg"
//                  />
//                )}
//                {msg.reactions && msg.reactions.length > 0 && (
//                  <div className="flex gap-1 mt-1">
//                    {msg.reactions.map((reaction, i) => (
//                      <div
//                        key={i}
//                        className="flex items-center bg-gray-700 rounded px-2 py-0.5 text-sm"
//                      >
//                        <span>{reaction.emoji}</span>
//                        <span className="ml-1">{reaction.count}</span>
//                      </div>
//                    ))}
//                  </div>
//                )}
//              </div>
//            </div>
//          ))}
//          {isTyping && (
//            <div className="text-gray-400 text-sm">Someone is typing...</div>
//          )}
//        </div>
//      </ScrollArea>
//
//      {/* Message Input */}
//      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
//        <div className="flex items-center gap-2">
//          <Input
//            value={message}
//            onChange={(e) => {
//              setMessage(e.target.value);
//              handleTyping();
//            }}
//            placeholder="Type a message..."
//            className="flex-1"
//          />
//          <div className="flex items-center gap-1">
//            <Button
//              type="button"
//              variant="ghost"
//              size="icon"
//              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//            >
//              <Smile className="h-5 w-5" />
//            </Button>
//            <label>
//              <input
//                type="file"
//                className="hidden"
//                onChange={handleFileUpload}
//                multiple
//              />
//              <Button type="button" variant="ghost" size="icon" asChild>
//                <span>
//                  <Paperclip className="h-5 w-5" />
//                </span>
//              </Button>
//            </label>
//            <Button type="button" variant="ghost" size="icon">
//              <Gift className="h-5 w-5" />
//            </Button>
//            <Button type="submit" variant="default">
//              <Send className="h-5 w-5" />
//            </Button>
//          </div>
//        </div>
//      </form>
//    </div>
//  );
//}


