'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Notifications } from './notifications';
import Link from 'next/link';
//import { Logo } from '../Codearena';
import { User } from '@prisma/client';

function AuthenticatedNav({ user, isActive }: { user: User, isActive: (path: string) => string }) {
  return (
    <>
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-xl font-bold text-white flex gap-1">
          {/**
            <Logo width={30} height={30} />
          */}
          <span>CodeArena</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/arena" className={`${isActive('/arena')} transition-colors`}>
            Arena
          </Link>
          <Link href="/hangout" className={`${isActive('/hangout')} transition-colors`}>
            Hangout
          </Link>
          <Link href="/shop" className={`${isActive('/shop')} transition-colors`}>
            Shop
          </Link>
        </div>
      </div>

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
    </>
  );
}

function UnauthenticatedNav() {
  return (
    <>
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-xl font-bold text-white flex gap-1">
          {/**
            <Logo width={30} height={30} />
          */}
          <span>CodeArena</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#faqs" className="text-gray-400 hover:text-white transition-colors">
            FAQs
          </Link>
        </div>
      </div>

      <Link
        href="/auth"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
      >
        Get Started
      </Link>
    </>
  );
}

function LoadingNav() {
  return (
    <div className="flex items-center space-x-8">
      <Link href="/" className="text-xl font-bold text-white flex gap-1">
        {/**
            <Logo width={30} height={30} />
          */}
        <span>CodeArena</span>
      </Link>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { user, status } = useAuth();
  const isActive = (path: string) => {
    return pathname === path ? 'text-white' : 'text-gray-400 hover:text-white';
  };

  const hiddenRoutes = ['/auth', '/arena/battle'];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="border-b border-gray-700 bg-gray-900/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {status === "loading" && <LoadingNav />}
          {status === "authenticated" && user && <AuthenticatedNav user={user} isActive={isActive} />}
          {status === "unauthenticated" && <UnauthenticatedNav />}
        </div>
      </div>
    </nav>
  )
}
