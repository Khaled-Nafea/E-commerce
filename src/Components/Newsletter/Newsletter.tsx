import { Button } from "@base-ui/react";
import { ArrowRight, Leaf, Mail, Smartphone, Tag, Van, Apple } from "lucide-react";
import Link from "next/link";

const perks = [
  { icon: <Leaf />, text: "Fresh Picks Weekly" },
  { icon: <Van />, text: "Free Delivery Codes" },
  { icon: <Tag />, text: "Members-Only Deals" },
];

export default function Newsletter() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-linear-to-br from-[#EDFDF6] to-white border border-gray-100 rounded-3xl p-8 lg:p-14 grid grid-cols-8 gap-10">

          <div className="col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 bg-[#00BC87] rounded-2xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#00BC87] font-bold text-xs uppercase tracking-widest">Newsletter</p>
                <p className="text-gray-500 text-sm">50,000+ subscribers</p>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
              Get the Freshest Updates{" "}
              <span className="text-[#00BC87]">Delivered Free</span>
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {perks.map((perk) => (
                <span key={perk.text} className="inline-flex items-center gap-1.5 border border-green-200 text-gray-700 text-xs font-medium px-4 py-2.5 rounded-full bg-white">
                  <span className="text-[#00BC87] bg-[#00BC87]/10 rounded-full p-1.5 w-7 h-7 flex items-center justify-center">{perk.icon}</span>
                  {perk.text}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <input type="email" placeholder="you@example.com" className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-400 bg-white"
              />
              <Button className="group bg-linear-to-r from-[#00BC87] to-[#00BC87]/80 hover:from-[#00BC87]/80 hover:to-[#00BC87] hover:scale-105 transition-colors text-white font-semibold text-sm px-6 py-4 rounded-2xl flex items-center gap-2 cursor-pointer">
                Subscribe <span className="group-hover:translate-x-1 transition-transform"><ArrowRight /></span>
              </Button>
            </div>
            <p className="text-gray-400 text-xs mt-2">✳️ Unsubscribe anytime. No spam, ever.</p>
          </div>

          <div className="lg:flex col-span-1 justify-center">
            <div className="w-px h-100 bg-green-200 z-10" />
          </div>

          <div className="bg-[#111828] rounded-3xl p-7 text-white relative overflow-hidden col-span-3 lg:col-span-3">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-900 opacity-30 rounded-full blur-3xl" />

            <span className="inline-flex items-center gap-1.5 bg-green-700/60 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-5">
              <Smartphone className="w-3 h-3" /> MOBILE APP
            </span>

            <h3 className="text-2xl font-extrabold text-white mb-2">Shop Faster on Our App</h3>
            <p className="text-gray-400 text-sm mb-6">
              Get app-exclusive deals & 15% off your first order.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <Link href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl px-4 py-3 hover:scale-101 duration-400">
                <span className="text-2xl"><Apple /></span>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest">Download on</p>
                  <p className="text-white font-bold text-sm">App Store</p>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl px-4 py-3 hover:scale-101 duration-400">
                <span className="text-2xl">▶</span>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest">Get it on</p>
                  <p className="text-white font-bold text-sm">Google Play</p>
                </div>
              </Link>
            </div>

            <p className="text-yellow-400 text-sm font-medium">
              ★★★★★ <span className="text-gray-400 font-normal">4.9 · 100K+ downloads</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}