"use client"
import Empty from '@/components/Empty/Empty'
import { Heart, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getLoggedUserWishlist } from "@/services/wishlist.action";
import { getCart } from "@/services/cart.action";
import { IProduct, ICartItem } from '@/types/product';
import RmoveWishList from './RemoveWishList/RmoveWishList';
import AddButton from "@/components/AddButton/AddButton";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function page() {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [wishlistLength, setWishlistLength] = useState(0);
  const [cartProductIds, setCartProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session , status } = useSession();

    async function fetchData() {
      const [wishlistData, cartData] = await Promise.all([
        getLoggedUserWishlist(),
        getCart()
      ]);
      setWishlist(wishlistData);
      setCartProductIds(cartData?.data?.products?.map((item: ICartItem) => item.product._id) ?? []);
      setWishlistLength(wishlistData.length);
      setIsLoading(false);
    }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <>
    {wishlist.length === 0 ? (
      <>
      {status === "authenticated" ? (
        <Empty title="Your wishlist is empty" description="Browse products and save your favorites here." actionLabel="Browse Products" wishlist={false} heartIcon={true}/>
      ) : (
        <Empty title="Your wishlist is empty" description="Please sign in to view your wishlist. Sign in to sync your wishlist across devices." actionLabel="Browse Products" wishlist={true} heartIcon={true}/>
      )}
      </>
    ) : (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">

        <p className="text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-green-600">Home</Link> /{" "}
          <span className="text-gray-600 font-medium">Wishlist</span>
        </p>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-400 text-sm">{wishlistLength} item saved</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

          <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100 text-md text-gray-400 font-medium">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {wishlist.map((WishlistItem: IProduct) => {
            const isInCart = cartProductIds.includes(WishlistItem._id);
            return (
              <div key={WishlistItem._id} className="grid grid-cols-12 px-6 py-5 items-center border-b border-gray-300 last:border-0">

                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <Image src={WishlistItem.imageCover} alt="product" width={56} height={56} className="object-contain w-full h-full rounded-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{WishlistItem.title}</h3>
                    <p className="text-gray-400 text-md mt-0.5">{WishlistItem.category.name}</p>
                  </div>
                </div>

                {WishlistItem.priceAfterDiscount ? (
                  <div className="col-span-2 text-center">
                    <p className="font-bold text-gray-900 text-lg">{WishlistItem.priceAfterDiscount} EGP</p>
                    <p className="text-gray-400 text-md line-through">{WishlistItem.price} EGP</p>
                  </div>
                ) : (
                  <div className="col-span-2 text-center">
                    <p className="font-bold text-gray-900 text-lg">{WishlistItem.price} EGP</p>
                  </div>
                )}

                <div className="col-span-2 flex justify-center">
                  {isInCart ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                      <ShoppingCart className="w-3 h-3" /> In Cart
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> In Stock
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  {isInCart ? (
                    <Link href="/cart" className="inline-flex items-center gap-1 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg transition">
                      <Check className="w-3 h-3 text-green-500" /> View Cart
                    </Link>
                  ) : (
                    <AddButton
                      id={WishlistItem._id}
                      className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition cursor-pointer"
                      icon={<ShoppingCart className="w-3 h-3" />}
                      word="Add to Cart"
                      onSuccess={() => setCartProductIds(prev => [...prev, WishlistItem._id])}
                    />
                  )}
                  <RmoveWishList id={WishlistItem._id} onRemove={() => setWishlist(prev => prev.filter(item => item._id !== WishlistItem._id))} />
                </div>

              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Link href="/products" className="text-sm text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

      </div>
    </div>
    )}
    </>
  )
}