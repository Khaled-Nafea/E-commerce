import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin,Facebook, Twitter, Instagram, Youtube, CreditCard } from 'lucide-react'
import img from '../../../public/FreshCart Logo.png'

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Brands', href: '/brands' },
    { label: 'Electronics', href: '/categories/electronics' },
    { label: "Men's Fashion", href: '/categories/mens-fashion' },
    { label: "Women's Fashion", href: '/categories/womens-fashion' },
  ],
  Account: [
    { label: 'My Account', href: '/account' },
    { label: 'Order History', href: '/orders' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Sign In', href: '/login' },
    { label: 'Create Account', href: '/register' },
  ],
  Support: [
    { label: 'Contact Us', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns & Refunds', href: '#' },
    { label: 'Track Order', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

const socialIcons = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Twitter', icon: Twitter },
  { label: 'Instagram', icon: Instagram },
  { label: 'YouTube', icon: Youtube },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="inline-block bg-white rounded-lg px-4 py-2 mb-5">
              <Image
                src={img}
                alt="ShopMart logo"
                width={1000}
                height={1000}
                className="h-8 w-auto"
              />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            <div className="flex flex-col gap-3 text-sm mb-6">
              <a href="tel:+20109333333" className="flex items-center gap-2 hover:text-green-300 transition-colors">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span>(+20) 0109333333</span>
              </a>
              <a href="mailto:support@shopmart.com" className="flex items-center gap-2 hover:text-green-300 transition-colors">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span>support@shopmart.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-[#1e293b] border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white transition-colors text-sm"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-base mb-5">{title}</h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-green-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <span>© 2026 ShopMart. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {['Visa', 'Mastercard', 'PayPal'].map((method) => (
              <div key={method} className="flex items-center gap-1.5">
                <div>
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-gray-400 text-xs">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}