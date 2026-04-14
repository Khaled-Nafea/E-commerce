"use server"
import { CheckoutFormData } from "@/schemas/checkoutSchema";
import { getToken } from "../utilities";


export async function getAllOrders() {
    const token = await getToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  })
  const data = await response.json();
  return data;
}

export async function getOrdersById(id: string) {
    const token = await getToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  })
  const data = await response.json();
  return data;
}

export async function onlinPayment(cartId: string,addressData: CheckoutFormData,url: string = process.env.NEXT_PUBLIC_BASE_URL!) {
    const token = await getToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
      shipping_address: addressData
    })
  })
  const data = await response.json();
  return data;
}

export async function cashPayment(cartId: string,addressData: CheckoutFormData) {
    const token = await getToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
      shipping_address: addressData
    })
  })
  const data = await response.json();
  return data;
}



