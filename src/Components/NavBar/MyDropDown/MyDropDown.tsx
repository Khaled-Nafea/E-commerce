import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Package, Heart, BookMarked, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
    name: string | null;
    email: string | null;
}

export function MyDropDown({ user }: { user: User }) {
   const [userId, setUserId] = useState<string | null>(null);
   
       useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("userId"); 
        signOut({redirect: true, callbackUrl: '/'});
    };
     
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 rounded-full p-2 group">
        <User className="w-5 h-5 group-hover:text-green-600 transition-colors" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-64 rounded-2xl p-0 shadow-lg" align="end">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center">
          <User className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="font-medium text-sm text-gray-900">{user.name || "User"}</p>
          <p className="text-xs text-gray-500">{user.email || "user@example.com"}</p>
        </div>
      </div>

      {/* Items */}
      <div className="py-2">
        <DropdownMenuItem>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer w-full">
          <User className="w-4 h-4 text-gray-500" />
          My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/allorders/${userId}`} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer w-full">
          <Package className="w-4 h-4 text-gray-500" />
          My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link href="/wishlist" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer w-full">
          <Heart className="w-4 h-4 text-gray-500" />
          My Wishlist
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profile/address" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer w-full">
          <BookMarked className="w-4 h-4 text-gray-500" />
          Addresses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profile/settings" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer w-full">
          <Settings className="w-4 h-4 text-gray-500" />
          Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer text-red-500 focus:text-red-500 w-full group" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 group-hover:text-red-500" />
          Sign Out
          </Link>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}