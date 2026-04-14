"use server";
import { getToken } from "../utilities";

export const addToWishlist = async (id: string) => {
   const token = await getToken();
   if (!token) {
    return [];
   }
    
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
     productId: id,
    }),
  });

   const data = await response.json(); 
  return data; 

};

export const removeWishlist = async (id: string) => {
   const token = await getToken();
   if (!token) {
    return [];
   }
    
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  });

   const data = await response.json(); 
  return data; 

};

export async function getLoggedUserWishlist() {
  const token = await getToken();
  if (!token) {
    return [];
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      "token": token as string,
    },
    next: { revalidate: 0 }
  });
  const data = await res.json();
  return data.data;
}