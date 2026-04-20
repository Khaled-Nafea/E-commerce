'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Search, Heart, ShoppingCart, User, Headphones,
  ChevronDown, Menu, X, LogOut,
  UserPlus
} from 'lucide-react'
import { Badge } from '../ui/badge'
import img from '../../../public/FreshCart Logo.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@base-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { MyDropDown } from './MyDropDown/MyDropDown'
import TopNav from './TopNav/TopNav'
import { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '@/Context/CartContext'
import { WishListContext } from '@/Context/WishListContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Brands', href: '/brands' },
]
const allowedCategories = ["Men's Fashion", "Women's Fashion", "Electronics", "Beauty & Health"];

export default function NavBar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { numberOfCartItems } = useContext(CartContext)
  const { numberOfWishListItems } = useContext(WishListContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false)
      }
    }
    if (sidebarOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sidebarOpen])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories?limit=50`)
        const data = await res.json()
        const filtered = (data.data ?? []).filter((cat: { _id: string; name: string }) =>
          allowedCategories.includes(cat.name)
        )
        setCategories(filtered)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' })
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm">

      {/* ─── Top Bar (desktop only) ─── */}
      <TopNav user={session?.user as { name: string | null; email: string | null }} />

      {/* ─── Desktop Main Nav ─── */}
      <div className="bg-white hidden lg:block">
        <div className="container mx-auto px-6 py-3 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src={img} alt="FreshCart" width={1000} height={1000} className="w-auto h-6 lg:h-8" />
          </Link>

          {/* Search */}
          <div className="flex-1 flex items-center relative max-w-xl">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full border border-gray-200 rounded-full py-2.5 px-5 pr-12 text-sm outline-none focus:border-green-500 transition-colors"
            />
            <Button className="absolute right-1 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-3 py-2 rounded hover:text-green-600 transition-colors ${pathname === link.href ? 'text-green-600' : 'text-gray-700'}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded hover:text-green-600 transition-colors cursor-pointer outline-none ${pathname.startsWith('/categories') ? 'text-green-600' : 'text-gray-700'}`}>
                Categories
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50 p-5">
                <Link href="/categories">
                  <DropdownMenuItem className="text-md text-gray-600 cursor-pointer focus:text-green-600 focus:bg-green-50">
                    All Categories
                  </DropdownMenuItem>
                </Link>
                {categories.map((cat) => (
                  <Link key={cat._id} href={`/categories/${cat._id}`}>
                    <DropdownMenuItem className="text-md text-gray-600 cursor-pointer focus:text-green-600 focus:bg-green-50">
                      {cat.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-7 ml-auto shrink-0">
            <Link href="/contact" className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400">Support</span>
                <span className="text-xs font-semibold text-gray-700">24/7 Help</span>
              </div>
            </Link>

            <Link href="/wishlist" className="relative">
              {numberOfWishListItems > 0 && (
                <Badge className="absolute -top-2 -right-2 text-xs size-4 bg-green-500 hover:bg-green-500">{numberOfWishListItems}</Badge>
              )}
              <Heart className="w-5 h-5 text-gray-600 hover:text-green-600 transition-colors" />
            </Link>

            <Link href="/cart" className="relative">
              {numberOfCartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 text-xs size-4 bg-green-500 hover:bg-green-500">{numberOfCartItems}</Badge>
              )}
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-green-600 transition-colors" />
            </Link>

            {status === "authenticated" ? (
              <MyDropDown user={session?.user as { name: string | null; email: string | null; id: string }} />
            ) : (
              <Link href="/login" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ─── Mobile Main Nav ─── */}
      <div className="lg:hidden bg-white border-b border-green-500">
        <div className="flex items-center justify-between px-4 py-3">

          <Link href="/" className="flex items-center gap-2">
            <Image src={img} alt="FreshCart" width={500} height={500} className="w-auto h-7" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              {numberOfWishListItems > 0 && (
                <Badge className="absolute -top-2 -right-2 text-xs size-4 bg-green-500 hover:bg-green-500">{numberOfWishListItems}</Badge>
              )}
              <Heart className="w-5 h-5 text-gray-500" />
            </Link>

            <Link href="/cart" className="relative">
              {numberOfCartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 text-xs size-4 bg-green-500 hover:bg-green-500">{numberOfCartItems}</Badge>
              )}
              <ShoppingCart className="w-5 h-5 text-gray-500" />
            </Link>
            <Button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Sidebar Overlay ─── */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          ref={sidebarRef}
          className={`absolute top-0 right-0 h-full w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Link href="/" onClick={closeSidebar}>
              <Image src={img} alt="FreshCart" width={500} height={500} className="w-auto h-7" />
            </Link>
            <Button
              onClick={closeSidebar}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
              />
              <Button className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white shrink-0 cursor-pointer">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-5 py-4 flex flex-col border-b border-gray-100">
            {[...navLinks, { label: 'Categories', href: '/categories' }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`text-base py-3 font-medium transition-colors ${pathname === link.href ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Wishlist & Cart */}
          <div className="px-5 py-4 flex flex-col gap-1 border-b border-gray-100">
            <Link href="/wishlist" onClick={closeSidebar} className="flex items-center gap-3 py-2.5 text-gray-700 hover:text-green-600 transition-colors">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-base font-medium">Wishlist</span>
              {numberOfWishListItems > 0 && (
                <Badge className="ml-auto bg-green-500 hover:bg-green-500 text-xs">{numberOfWishListItems}</Badge>
              )}
            </Link>

            <Link href="/cart" onClick={closeSidebar} className="flex items-center gap-3 py-2.5 text-gray-700 hover:text-green-600 transition-colors">
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-base font-medium">Cart</span>
              {numberOfCartItems > 0 && (
                <Badge className="ml-auto bg-green-500 hover:bg-green-500 text-xs">{numberOfCartItems}</Badge>
              )}
            </Link>
          </div>

          {/* User Section */}
          <div className="px-5 py-4 flex flex-col gap-1 border-b border-gray-100">
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-3 py-2.5 text-gray-700">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-base font-medium">{session?.user?.name}</span>
                </div>
                <Button
                  onClick={() => { closeSidebar(); handleSignOut() }}
                  className="flex items-center gap-3 py-2.5 text-red-500 hover:text-red-600 transition-colors w-full cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-base font-medium">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeSidebar} className="flex items-center gap-3 py-2.5 text-gray-700 hover:text-green-600 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                    <User className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-base font-medium">Sign In</span>
                </Link>
                <Link href="/register" onClick={closeSidebar} className="flex items-center gap-3 py-2.5 text-gray-700 hover:text-green-600 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-base font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Footer — Need Help */}
          <div className="mt-auto px-5 py-4">
            <Link href="/contact" onClick={closeSidebar} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3 hover:bg-green-100 transition-colors">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-700">Need Help?</span>
                <span className="text-xs text-green-600 font-medium">Contact Support</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </header>
  )
}