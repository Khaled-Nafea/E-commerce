"use client"
import { Button } from "@base-ui/react";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RightCart from "./rightCart/rightCart";
import { getCart, removeCartItem, updateCart, clearCart } from "@/services/cart.action";
import { useEffect, useState } from "react";
import { ICartItem } from "@/types/product";
import Empty from "@/components/Empty/Empty";
import { CartContext } from "@/Context/CartContext";
import { useContext } from "react";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { setNumberOfCartItems } = useContext(CartContext);
  const [cartLength, setCartLength] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [disabledUpdate, setDisabledUpdate] = useState<boolean>(false);
  const [disabledRemove, setDisabledRemove] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState<boolean>(false);
  const [cartID, setCartID] = useState<string | null>(null);
    const { data: session , status } = useSession();
  
  async function getCartData() {
  setIsLoading(true);
  try {
    const cart = await getCart();
    if (!cart || !cart.data || cart.status === 'error') {
      setCartLength(0);
      setCartProducts([]);
      return;
    }
    setCartLength(cart.numOfCartItems ?? 0);
    setNumberOfCartItems(cart.numOfCartItems ?? 0);
    setCartProducts(cart.data.products ?? []);
    setCartID(cart.cartId ?? null);
  } catch (error) {
    setCartLength(0);
    setCartProducts([]);
  } finally {
    setIsLoading(false);
  }
}

  async function updateCartData(id: string, count: number) {
    setIsUpdating(true);
    setDisabledUpdate(true);
    setCurrentId(id);
    const cart = await updateCart(id, count);
    setCartProducts(cart.data.products);
    setCartLength(cart.numOfCartItems);
    setNumberOfCartItems(cart.numOfCartItems);
    setIsUpdating(false);
    setDisabledUpdate(false);
  }

  async function removeFromCart(id: string) {
    setIsRemoving(true);
    setDisabledRemove(true);
    setCurrentId(id);
    const cart = await removeCartItem(id);
    setCartProducts(cart.data.products);
    setCartLength(cart.numOfCartItems);
    setNumberOfCartItems(cart.numOfCartItems);
    setIsRemoving(false);
    setDisabledRemove(false);
  }

  async function clearAllCart() {
    const cart = await clearCart();
    setCartProducts(cart.data.products);
    setCartLength(0);
    setNumberOfCartItems(0);
    setShowClearModal(false);
  }
  
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
    {isLoading ? (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    ) : cartLength > 0 ? (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">

        <p className="text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-green-600">Home</Link> /{" "}
          <span className="text-gray-600 font-medium">Shopping Cart</span>
        </p>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">
          You have <span className="text-green-600 font-semibold">{cartLength} item{cartLength > 1 ? 's' : ''}</span> in your cart
        </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col gap-4">
                {cartProducts.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-5">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                      <Image src={item.product.imageCover} alt="product" width={72} height={72} className="object-contain w-full h-full rounded-xl" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-base">{item.product.title}</h3>
                      <span className="inline-block text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 mb-2">
                        {item.product.category.name}
                      </span>
                      <p className="text-green-600 font-bold text-lg">{item.price} EGP <span className="text-gray-300 text-xs">per unit</span></p> 
                      <div className="flex items-center gap-2 mt-5">
                        <Button disabled={disabledUpdate} className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer ${disabledUpdate ? 'opacity-50' : ''}`} onClick={() => updateCartData(item.product.id, item.count - 1)}>−</Button>
                        {isUpdating && item.product.id === currentId ? (
                          <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <span className="w-6 text-center font-semibold text-gray-800">{item.count}</span>
                        )}
                        <Button disabled={disabledUpdate} className={`w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition cursor-pointer ${disabledUpdate ? 'opacity-50' : ''}`} onClick={() => updateCartData(item.product.id, item.count + 1)}>+</Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Total</p>
                        <p className="font-bold text-lg text-gray-900 mt-2">{item.price*item.count} <span className="text-gray-400 font-normal text-xs">EGP</span></p>
                      </div>
                      {isRemoving && item.product.id === currentId ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : ( 
                        <Button disabled={disabledRemove} onClick={() => removeFromCart(item.product.id)} className={`w-9 h-9 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition cursor-pointer ${disabledRemove ? 'opacity-50' : ''}`}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
                }
                <div className="flex items-center justify-between mt-2">
                  <Link href="/products" className="text-sm text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                  </Link>
                  <Button onClick={() => setShowClearModal(true)} className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4" /> Clear all items
                  </Button>
                </div>
              </div>

          <div className="lg:col-span-1">
           <RightCart products={cartProducts} cartId={cartID || ""} />
          </div>

        </div>
      </div>
    </div>
      ) :
      (
        <>
        {status === "authenticated" ? (
          <Empty title="Your cart is empty" description="Add some items to your cart to see them here" actionLabel="Start Shopping" actionHref="/products" cart={false} />
        ) : (
          <Empty title="Your cart is empty" description="Add some items to your cart to see them here.Sign in to sync your orders across devices." actionLabel="Start Shopping" actionHref="/products" cart={true} />
        )}
        </>
      )
    }
    {showClearModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingCart className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Clear Your Cart?</h2>
            <p className="text-gray-500 text-sm mb-8">
              All items will be removed from your cart. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setShowClearModal(false)} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition cursor-pointer">
                Keep Shopping
              </Button>
              <Button onClick={clearAllCart} className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition cursor-pointer">
                Yes, Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}