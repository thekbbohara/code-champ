'use client';

import { Codearena } from "@/components/common/Codearena"
import Link from "next/link"

export default function Nav() {
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
        </div>
      </div>
    </nav>
  )
}
