import { Gift, LogOut, Mail, Phone, Truck, User, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@base-ui/react';

export default function TopNav({ user }: { user: { name: string | null; email: string | null } }) {
  const { status } = useSession()
   const handleSignOut = () => {
          signOut({redirect: true, callbackUrl: '/'});
      };
  return (
    <div className="bg-white border-b border-gray-100 lg:block hidden">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-green-500 " />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-green-500" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +1 (800) 123-4567
            </a>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              support@freshcart.com
            </a>
            <div className="w-px h-4 bg-gray-300" />
            {status === "authenticated" ? (
              <>
              <span className="flex items-center gap-1 hover:text-green-600 transition-colors cursor-pointer">
                <User className="w-3.5 h-3.5" />
                {user.name}
              </span>
              <Button onClick={handleSignOut} className="flex items-center gap-1 hover:text-red-600 transition-colors group cursor-pointer">
              <LogOut className="w-3.5 h-3.5 group-hover:fill-red-500" />
              Log Out
            </Button>
            </>
            ) : (
            <>
            <Link href="/login" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <User className="w-3.5 h-3.5" />
              Sign In
            </Link>
            
            <Link href="/register" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <UserPlus className="w-3.5 h-3.5 fill-green-500" />
              Sign Up
            </Link>
            </>
            )}
            
          </div>
        </div>
      </div>

  )
}
