'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Menu, User, LogOut, Settings, Heart, MapPin, Users } from 'lucide-react'
import { IconWithShadow } from '../ui/IconWithShadow'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [guests, setGuests] = useState('1')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (location) params.set('location', location)
    if (guests) params.set('guests', guests)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <nav className="bg-[#FBFBFB] sticky top-0 z-50 border-b border-[#EAEAEA] py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Row 1 - Logo, Icons, Navigation */}
        <div className="flex items-center justify-between mb-8">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <img 
                    src="/Graphics/Logo/Logo type + Icon/PinkAsset 2.svg" 
                    alt="Nooko" 
                    className="h-8 w-auto"
                  />
                </Link>

          {/* Center Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <IconWithShadow
              icon="/Graphics/Icons/photo_studio.svg"
              hoverIcon="/Graphics/Icons/photo_studio_hover_state.svg"
              label="Studio"
              href="/search?category=studio"
            />
            <IconWithShadow
              icon="/Graphics/Icons/office_desktop.svg"
              hoverIcon="/Graphics/Icons/office_desktop_hover_state.svg"
              label="Office"
              href="/search?category=office"
            />
            <IconWithShadow
              icon="/Graphics/Icons/room.svg"
              hoverIcon="/Graphics/Icons/room_hover_state.svg"
              label="Event"
              href="/search?category=event"
            />
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/become-a-host" 
              className="text-[#6F6470] hover:text-[#484149] transition-colors text-sm font-medium"
            >
              Become a Host
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-full border border-gray-200 hover:shadow-md transition-shadow"
              >
                <Menu className="w-4 h-4 text-[#6F6470]" />
                <User className="w-6 h-6 text-[#6F6470]" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                  <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-[#484149] hover:bg-[#F8DEFF]">
                    <User className="w-4 h-4 mr-3" />
                    Dashboard
                  </Link>
                  <Link href="/trips" className="flex items-center px-4 py-2 text-sm text-[#484149] hover:bg-[#F8DEFF]">
                    <Heart className="w-4 h-4 mr-3" />
                    My Trips
                  </Link>
                  <Link href="/host" className="flex items-center px-4 py-2 text-sm text-[#484149] hover:bg-[#F8DEFF]">
                    <Settings className="w-4 h-4 mr-3" />
                    Host Dashboard
                  </Link>
                  <hr className="my-1" />
                  <Link href="/account" className="flex items-center px-4 py-2 text-sm text-[#484149] hover:bg-[#F8DEFF]">
                    <Settings className="w-4 h-4 mr-3" />
                    Account
                  </Link>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-[#484149] hover:bg-[#F8DEFF]">
                    <LogOut className="w-4 h-4 mr-3" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full border border-gray-200"
          >
            <Menu className="w-5 h-5 text-[#6F6470]" />
          </button>
        </div>

        {/* Row 2 - Search Bar */}
        <div className="flex items-center">
                 <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
                   <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex flex-col md:flex-row gap-2 items-center hover:shadow-xl transition-shadow">
                     <div className="flex-1 flex items-center px-4 py-3 rounded-full hover:bg-[#F8DEFF] transition-colors">
                       <Search className="w-4 h-4 text-gray-500 mr-2" />
                       <input 
                         type="text" 
                         placeholder="What are you looking for?" 
                         className="flex-1 bg-transparent outline-none text-base placeholder:text-gray-500"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                     </div>
                     <div className="flex-1 flex items-center px-4 py-3 rounded-full hover:bg-[#F8DEFF] transition-colors">
                       <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                       <input 
                         type="text" 
                         placeholder="Where?" 
                         className="flex-1 bg-transparent outline-none text-base placeholder:text-gray-500"
                         value={location}
                         onChange={(e) => setLocation(e.target.value)}
                       />
                     </div>
                     <div className="flex items-center px-4 py-3 rounded-full hover:bg-[#F8DEFF] transition-colors">
                       <Users className="w-4 h-4 text-gray-500 mr-2" />
                       <select 
                         className="bg-transparent outline-none text-base"
                         value={guests}
                         onChange={(e) => setGuests(e.target.value)}
                       >
                         <option value="1">1 guest</option>
                         <option value="2">2 guests</option>
                         <option value="3">3 guests</option>
                         <option value="4">4 guests</option>
                         <option value="5+">5+ guests</option>
                       </select>
                     </div>
                     <button 
                       type="submit" 
                       className="bg-[#EFADFF] hover:bg-[#D298E0] text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors border-0 outline-none shadow-md hover:shadow-lg"
                     >
                       <Search className="w-5 h-5" />
                     </button>
                   </div>
                 </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-[#F8DEFF] border border-gray-200 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-3" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search for spaces..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
                />
              </div>
            </form>
            
            <div className="space-y-2">
              <Link 
                href="/become-a-host" 
                className="block py-2 text-[#6F6470] hover:text-[#484149] transition-colors"
              >
                Become a Host
              </Link>
              <Link 
                href="/dashboard" 
                className="block py-2 text-[#6F6470] hover:text-[#484149] transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/trips" 
                className="block py-2 text-[#6F6470] hover:text-[#484149] transition-colors"
              >
                My Trips
              </Link>
              <Link 
                href="/host" 
                className="block py-2 text-[#6F6470] hover:text-[#484149] transition-colors"
              >
                Host Dashboard
              </Link>
              <Link 
                href="/account" 
                className="block py-2 text-[#6F6470] hover:text-[#484149] transition-colors"
              >
                Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
