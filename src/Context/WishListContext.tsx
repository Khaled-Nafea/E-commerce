"use client"

import { getLoggedUserWishlist } from "@/services/wishlist.action";
import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface WishListContextType {
  numberOfWishListItems: number;
  setNumberOfWishListItems: React.Dispatch<React.SetStateAction<number>>;
}

export const WishListContext = createContext<WishListContextType>({
  numberOfWishListItems: 0,
  setNumberOfWishListItems: () => {},
});

export default function WishListContextProvider({ children }: { children: React.ReactNode }) {
    const [numberOfWishListItems, setNumberOfWishListItems] = useState(0);
    const { data: session, status } = useSession();
    async function getWishListFromAPI() {
        try {
      const res = await getLoggedUserWishlist();
      setNumberOfWishListItems(res.length);
      return res;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    if (status === "authenticated") {
      getWishListFromAPI();
    }
  }, [status]);
  return (
    <WishListContext.Provider value={{numberOfWishListItems,setNumberOfWishListItems}}>
      {children}
    </WishListContext.Provider>
  )
}