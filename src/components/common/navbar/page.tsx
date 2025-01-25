'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Notifications } from './notifications';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Codearena } from '../Codearena';

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { status } = useSession()

  const isActive = (path: string) => {
    return pathname === path ? 'text-white' : 'text-gray-400 hover:text-white';
  };

  if (status === "loading") { 
    return <nav className="border-b border-gray-700 bg-gray-900/60 backdrop-blur-sm sticky top-0 z-50"></nav> 
  }

  return (
    <nav className="border-b border-gray-700 bg-gray-900/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white flex gap-1">
              <Codearena width={30} height={30} />
              <span>CodeArena</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              {user ? (
                <>
                  <Link href="/arena" className={`${isActive('/arena')} transition-colors`}>
                    Arena
                  </Link>
                  <Link href="/hangout" className={`${isActive('/hangout')} transition-colors`}>
                    Hangout
                  </Link>
                  <Link href="/shop" className={`${isActive('/shop')} transition-colors`}>
                    Shop
                  </Link>
                </>
              ) : (
                <>
                  <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                  <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                  <Link href="#faqs" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </Link>
                </>
              )}
            </div>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className='flex'>
                <span className="text-[16px] text-gray-300">{user.tokens} </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='text-gray-300'>
                  <path fill="currentColor" d="M12 10c3.976 0 8-1.374 8-4s-4.024-4-8-4s-8 1.374-8 4s4.024 4 8 4" />
                  <path fill="currentColor" d="M4 10c0 2.626 4.024 4 8 4s8-1.374 8-4V8c0 2.626-4.024 4-8 4s-8-1.374-8-4z" />
                  <path fill="currentColor" d="M4 14c0 2.626 4.024 4 8 4s8-1.374 8-4v-2c0 2.626-4.024 4-8 4s-8-1.374-8-4z" />
                </svg>
              </div>
              <Notifications />
              <Link href={`/@${user.username}`} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl || ''} />
                  <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <Link 
              href="/auth" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
