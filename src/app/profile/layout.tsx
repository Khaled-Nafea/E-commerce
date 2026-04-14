"use client"
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { User, MapPin, Settings, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      <BreadCrumb title="My Account" icon={User} description="Manage your addresses and account settings" gradient="from-green-500 to-green-600" iconBg="bg-green-500" breadcrumbs={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
      <div className="container mx-auto flex flex-col lg:flex-row gap-5 my-10">
       <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-lg shadow-gray-200">
              <p className="text-lg font-bold text-gray-900 mb-4">My Account</p>
              <div className="space-y-2">
                <Link href="/profile/address" className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-colors ${pathname === "/profile/address" ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"}`}>
                  <span className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${pathname === "/profile/address" ? "bg-green-600" : "bg-gray-100"}`}>
                      <MapPin className={`w-4 h-4 ${pathname === "/profile/address" ? "text-white" : "text-gray-500"}`} />
                    </span>
                    <span className="font-medium">My Addresses</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link href="/profile/settings" className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-colors ${pathname === "/profile/settings" ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"}`}>
                  <span className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${pathname === "/profile/settings" ? "bg-green-600" : "bg-gray-100"}`}>
                      <Settings className={`w-4 h-4 ${pathname === "/profile/settings" ? "text-white" : "text-gray-500"}`} />
                    </span>
                    <span className="font-medium">Settings</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </aside>
          <main className="w-full lg:w-3/4">
            {children}
          </main>
      </div>
    </>
  )
}
