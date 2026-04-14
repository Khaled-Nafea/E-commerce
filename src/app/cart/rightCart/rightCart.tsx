import { Button } from '@base-ui/react'
import { ArrowLeft, Lock, ShieldCheck, ShoppingCart, Tag, Truck, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ICartItem } from '@/types/product'

export default function RightCart({ products, cartId }: { products: ICartItem[], cartId: string }) {
    const { status } = useSession()
    const FREE_SHIPPING_THRESHOLD = 500;
    const subtotal = products.reduce((acc, item) => acc + item.price * item.count, 0);
    const shipping = 50;
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const total = isFreeShipping ? subtotal : subtotal + shipping;

    return (
        status !== "authenticated" ?
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="bg-[#0F1F1A] px-6 py-4">
                <h2 className="text-white font-bold text-lg">Order Summary</h2>
            </div>
            <div className="bg-white px-6 py-5 flex flex-col gap-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({products.length} items)</span>
                    <span className="font-medium text-gray-900">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="font-bold text-gray-900">Estimated Total</span>
                    <span className="font-bold text-green-600 text-lg">{subtotal} EGP</span>
                </div>
                <Link href="/login" className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                    <UserRound className="w-4 h-4" />
                    Login to Checkout
                </Link>
                <p className="text-center text-xs text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-green-600 hover:underline font-medium">Sign up</Link>
                </p>
                <ul className="text-xs text-gray-400 flex flex-col gap-1 mt-1">
                    <li>✓ Your cart items will be saved</li>
                    <li>✓ Track your orders easily</li>
                    <li>✓ Access exclusive member deals</li>
                </ul>
            </div>
        </div>
        : (
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="bg-green-600 px-6 py-4">
                <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <h2 className="text-white font-bold text-lg">Order Summary</h2>
                </div>
                <p className="text-green-100 text-sm mt-0.5">{products.length} item{products.length > 1 ? 's' : ''} in your cart</p>
            </div>

            <div className="bg-white px-6 py-5 flex flex-col gap-4">

                {isFreeShipping ? (
                    <div className="bg-green-50 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-green-500" />
                            <div>
                                <p className="text-sm font-semibold text-green-700">Free Shipping!</p>
                                <p className="text-xs text-green-600">You qualify for free delivery</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-orange-50 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Truck className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-700">
                                Add <span className="font-semibold">{remaining} EGP</span> for free shipping
                            </span>
                        </div>
                        <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    {isFreeShipping ? (
                        <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                        <span className="font-medium text-gray-900">{shipping} EGP</span>
                    )}
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">Total</span>
                    <span>
                        <span className="font-bold text-gray-900 text-2xl">{total}</span>
                        <span className="text-gray-400 text-sm ml-1">EGP</span>
                    </span>
                </div>

                <Button className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-gray-600 hover:border-green-500 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer">
                    <Tag className="w-4 h-4" />
                    Apply Promo Code
                </Button>
                <Link href={`/checkout/${cartId}`} className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Secure Checkout
                </Link>
                <div className="flex items-center justify-center gap-4 text:xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                        Secure Payment
                    </span>
                    <div className="w-px h-3 bg-gray-200" />
                    <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-blue-500" />
                        Fast Delivery
                    </span>
                </div>
                <Link href="/products" className="text-center text-sm text-green-600 hover:text-green-700 flex items-center justify-center gap-1 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Continue Shopping
                </Link>
            </div>
        </div>
        )
    )
}