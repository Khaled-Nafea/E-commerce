"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Heart } from "lucide-react";
import AddButton from "@/components/AddButton/AddButton";
import WishlistButton from "@/components/wishlistButton/wishlistButton";


import { IWishlist } from "@/types/product";

interface Props {
  price: number;
  maxQuantity: number;
  priceAfterDiscount?: number;
  id: string;
  wishlist: IWishlist;
}

export default function QuantitySelector({ price, maxQuantity, priceAfterDiscount, id, wishlist }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* Quantity */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <Button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="bg-white w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-green-600 transition-colors text-xl font-medium cursor-pointer"
              type="button">
              −
            </Button>
            <span className="w-12 text-center text-sm font-semibold text-gray-800">
              {quantity}
            </span>
            <Button
              onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
              className="bg-white w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-green-600 transition-colors text-xl font-medium cursor-pointer"
              type="button">
              +
            </Button>
          </div>
          <span className="text-sm text-gray-400">{maxQuantity} available</span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-3 border border-gray-100">
        <span className="text-sm font-medium text-gray-600">Total Price:</span>
        <span className="text-xl font-bold text-green-600">
          {(priceAfterDiscount ? priceAfterDiscount : price) * quantity} EGP
        </span>
      </div>

      <div className="flex gap-3">
        <AddButton className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-3.5 px-6 rounded-xl bg-green-600 h-11 cursor-pointer hover:bg-green-700 transition-colors" icon={<ShoppingCart size={18} />} id={id} word="Add to Cart" count={quantity} />
        <Button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl h-11 cursor-pointer hover:bg-gray-800 transition-colors">
          <Zap size={18} />
          Buy Now
        </Button>
      </div>

      {/* Wishlist */}
      <WishlistButton inProductID={true} id={id} wishlist={wishlist} />
    </>
  );
}