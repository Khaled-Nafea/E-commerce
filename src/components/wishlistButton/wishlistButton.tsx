"use client"
import { Button } from '@base-ui/react'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react';
import { addToWishlist, removeWishlist } from '@/services/wishlist.action';
import { IProduct, IWishlist } from '@/types/product';
import { useContext } from 'react';
import { WishListContext } from '@/Context/WishListContext';

export default function WishlistButton({inProductID, id, wishlist}: { inProductID: boolean, id: string, wishlist: IWishlist }) {
  const [wishlisted, setWishlisted] = useState(false);
  const { numberOfWishListItems, setNumberOfWishListItems } = useContext(WishListContext);

  useEffect(() => {
    const exists = wishlist?.some((item: IProduct) => item._id === id);
    setWishlisted(exists);
  }, [wishlist, id]);

  const toggleWishlist = async () => {
    if (wishlisted) {
      const response = await removeWishlist(id);
        console.log("Wishlist remove response:", response);
      if (response) {
        setWishlisted(false);
        setNumberOfWishListItems(response.data.length);
      }
    } else {
      const response = await addToWishlist(id);
      if (response) {
        setWishlisted(true);
        setNumberOfWishListItems(response.data.length);
      }
    }
  };

  return (
    !inProductID ? (
      <Button onClick={toggleWishlist} className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-0 right-0 group flex items-center justify-center hover:text-red-500" aria-label="Add to favorites">
       <Heart className={`transition-all duration-300 size-4 ${ wishlisted? 'text-red-500 fill-red-500': 'text-current group-hover:text-red-500'}`}/>
      </Button>
    ) : (
      <Button
        onClick={toggleWishlist}
        className={`w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white h-11 font-medium rounded-xl hover:border-green-500 hover:text-green-500 transition-all cursor-pointer ${wishlisted ? "bg-red-100 text-red-500 hover:border-red-500 hover:text-red-500" : ""}`}>
        <Heart size={18} className={wishlisted ? "fill-red-500 text-red-500" : ""} />
        {wishlisted ? "Wishlisted" : "Add to Wishlist"}
      </Button>
    )
  )
}