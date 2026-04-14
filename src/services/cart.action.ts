"use server";
import { getToken } from "../utilities";

export const addToCart = async (id: string) => {
   const token = await getToken();
   if (!token) {
    return null;
   }
    
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
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

export const getCart = async () => {
  const token = await getToken();
  if (!token) {
    return null;
  }
  
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  });

  const data = await response.json(); 
  return data; 
};

export const updateCart = async (id: string, count: number) => {
  const token = await getToken();
  if (!token) {
    return null;
  }
  
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
      count: count,
    }),
  });

  const data = await response.json(); 
  return data; 
};

export const removeCartItem = async (id: string) => {
  const token = await getToken();
  if (!token) {
    return null;
  }
  
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  });

  const data = await response.json(); 
  return data; 
};

export const clearCart = async () => {
  const token = await getToken();
  if (!token) {
    return null;
  }
  
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  });

  const data = await response.json(); 
  return data; 
};


