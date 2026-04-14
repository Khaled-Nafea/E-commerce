import { PackageOpen, Heart } from "lucide-react";
import Link from "next/link";

interface Props {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  wishlist?: boolean;
  cart?: boolean;
  heartIcon?: boolean;
}

export default function Empty({
  title = "No Products Found",
  description = "No products match your current filters.",
  actionLabel = "View All Products",
  actionHref = "/products",
  wishlist = false,
  cart = false,
  heartIcon = false
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="bg-gray-100 rounded-full p-6">
        {heartIcon ? (
          <Heart className="w-12 h-12 text-gray-400" />
        ) : (
          <PackageOpen className="w-12 h-12 text-gray-400" />
        )}
      </div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
      {actionHref && (
        <Link href={actionHref} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
          {actionLabel}
        </Link>
      )}
      {wishlist && (
        <Link href="/login" className="bg-white border border-gray-300 hover:bg-gray-100 text-black px-18 py-3 rounded-full font-semibold transition-colors duration-300">
          Sign In
        </Link>
      )}
      {cart && (
        <Link href="/login" className="bg-white border border-gray-300 hover:bg-gray-100 text-black px-18 py-3 rounded-full font-semibold transition-colors duration-300">
          Sign In
        </Link>
      )}
    </div>
  );
}