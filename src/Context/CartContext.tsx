"use client"

import { getCart } from "@/services/cart.action";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

interface CartContextType {
  numberOfCartItems: number;
  setNumberOfCartItems: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType>({
  numberOfCartItems: 0,
  setNumberOfCartItems: () => {},
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
     const { data: session, status } = useSession();
    async function getCartFromAPI() {
        try {
      const res = await getCart();
      setNumberOfCartItems(res.numOfCartItems);
      return res;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    if (status === "authenticated") {
      getCartFromAPI();
    }
  }, [status]);
  return (
    <CartContext.Provider value={{numberOfCartItems,setNumberOfCartItems}}>
      {children}
    </CartContext.Provider>
  )
}
