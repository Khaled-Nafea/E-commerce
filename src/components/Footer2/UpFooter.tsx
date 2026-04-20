import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    subtitle: 'On orders over 500 EGP',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: '14-day return policy',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    subtitle: '100% secure checkout',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Contact us anytime',
  },
]

export default function FeaturesStrip() {
  return (
    <section className="bg-green-50 border-y border-green-100">
      <div className="container mx-auto px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}