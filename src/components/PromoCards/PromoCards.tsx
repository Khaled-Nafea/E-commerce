// components/PromoCards.tsx

import Link from "next/link";

const promos = [
  {
    badge: { icon: "🔥", text: "Deal of the Day" },
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    buttonText: "Shop Now",
    href: "/products",
    gradient: "from-[#00B578] via-[#00A972] to-[#007D57]",
    bubbleColor: "bg-green-200",
  },
  {
    badge: { icon: "✦", text: "New Arrivals" },
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    buttonText: "Explore Now",
    href: "/products",
    gradient: "from-orange-500 via-orange-400 to-pink-500",
    bubbleColor: "bg-pink-200",
  },
];

export default function PromoCards() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map((promo) => (
          <div key={promo.title} className={`relative bg-linear-to-br ${promo.gradient} rounded-3xl p-8 overflow-hidden`}>

            <div className={`absolute top-[-70px] right-[-70px] z-0 w-40 h-40 ${promo.bubbleColor} opacity-30 rounded-full`} />
            <div className={`absolute bottom-[-50px] left-[-40px] z-0 w-28 h-28 ${promo.bubbleColor} opacity-20 rounded-full`} />

            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <span>{promo.badge.icon}</span>
              <span>{promo.badge.text}</span>
            </div>

            <h3 className="text-3xl font-extrabold text-white mb-2">{promo.title}</h3>
            <p className="text-white/80 text-sm mb-4">{promo.description}</p>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-extrabold text-white">{promo.discount}</span>
              <span className="text-white/70 text-sm">
                Use code: <span className="font-bold text-white">{promo.code}</span>
              </span>
            </div>

            <Link
              href={promo.href} className="z-20 relative inline-flex items-center gap-2 bg-white text-gray-800 font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-100 transition-colors" >
              {promo.buttonText} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}