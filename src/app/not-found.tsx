'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, House, ArrowLeft } from 'lucide-react'
import { Button } from '@base-ui/react'

const destinations = [
  { label: 'All Products', href: '/products', active: true },
  { label: 'Categories', href: '/categories' },
  { label: "Today's Deals", href: '/deals' },
  { label: 'Contact Us', href: '#' },
]

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg w-full">

 
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-44 h-44 bg-white rounded-3xl shadow-2xl shadow-green-200 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-green-50 flex items-center justify-center">
                <ShoppingCart className="w-14 h-14 text-green-500" strokeWidth={1.5} />
              </div>
            </div>
  
            <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">404</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <div className="w-8 h-3 border-b-2 border-green-400 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Oops! Nothing Here
        </h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Looks like this page went out of stock! Don't worry,<br />
          there's plenty more fresh content to explore.
        </p>


        <div className="flex items-center justify-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            <House className="w-5 h-5" />
            Go to Homepage
          </Link>
          <Button onClick={() => router.back()}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3.5 rounded-full border border-gray-200 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {destinations.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  d.active
                    ? 'border-green-500 text-green-600 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}