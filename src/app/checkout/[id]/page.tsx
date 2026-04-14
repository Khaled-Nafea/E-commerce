'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Home, CreditCard, Banknote, CheckCircle2, Shield, Truck, RotateCcw, MapPin, Phone, Info, Lock, ReceiptPoundSterling } from 'lucide-react'
import { useForm,Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutFormData, checkoutSchema } from '@/schemas/checkoutSchema'
import { Button } from '@base-ui/react'
import { useParams } from 'next/navigation'
import { cashPayment, onlinPayment } from '@/services/checkout.action'
import { getCart } from '@/services/cart.action'
import { ICartItem } from '@/types/product'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash')
  const [cartProducts, setCartProducts] = useState<ICartItem[]>([]);
  const subTotal = cartProducts.reduce((total, product) => total + (product.price * product.count), 0);
  const isFreeShipping = subTotal >= 500; 
  const shippingCost = isFreeShipping ? 0 : 50;
  const totalAmount = subTotal + shippingCost;
  const {id} = useParams()
  const form = useForm({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
        details: "",
        phone: "",
        city: "",
      },
    });

    const cartData = async () => {
       const cart = await getCart();
       setCartProducts(cart.data.products);
    }

    const handleSubmit = async (data: CheckoutFormData) => {
      if(paymentMethod === 'online'){
        const result = await onlinPayment(id as string, data,"");
        console.log("online payment result:", result);
        if(result.status === "success"){
          const addresses = JSON.parse(localStorage.getItem('shippingAddresses') || '{}');
          addresses[result.session.id] = data;
          localStorage.setItem('shippingAddresses', JSON.stringify(addresses));
          window.location.href = result.session.url;
        }
      }
      else{
        const result = await cashPayment(id as string, data);
        console.log("cash payment result:", result);
        console.log("cash payment result data:", result.data);
        if(result.status === "success"){
          const addresses = JSON.parse(localStorage.getItem('shippingAddresses') || '{}');
          addresses[result.data.id] = data;
          localStorage.setItem('shippingAddresses', JSON.stringify(addresses));
          window.location.href = `/allorders/${result.data.user}`;
        }
      }
    };

    useEffect(() => {
      cartData();
    }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">

        <p className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          {" / "}
          <Link href="/cart" className="hover:text-green-600 transition-colors">Cart</Link>
          {" / "}
          <span className="text-gray-600 font-medium">Checkout</span>
        </p>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#159745] rounded-lg flex items-center justify-center">
              <ReceiptPoundSterling className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
              <p className="text-gray-500 text-sm">Review your items and complete your purchase</p>
            </div>
          </div>
          <Link href="/cart" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Shipping Address */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-linear-to-r from-green-700 to-green-800 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-white" />
                  <h2 className="text-white font-bold text-lg">Shipping Address</h2>
                </div>
                <p className="text-green-100 text-sm mt-0.5">Where should we deliver your order?</p>
              </div>

              <div className="bg-white px-6 py-5 flex flex-col gap-5">

                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Delivery Information</p>
                    <p className="text-xs text-blue-500 mt-0.5">Please ensure your address is accurate for smooth delivery</p>
                  </div>
                </div>

                <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mb-4">
                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                            City <span className="text-red-500">*</span>
                          </FieldLabel>

                          <div className="relative mt-1">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              type="text"
                              placeholder="e.g. Cairo, Alexandria, Giza"
                              className="w-full! border! bg-white! border-gray-200! rounded-lg! py-5! pl-10! pr-4! text-sm! outline-none! focus:border-green-500! focus:ring-0! transition-colors!"
                            />
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                <div className="mb-4">
                <Controller
                  name="details"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Street Address <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        <Textarea
                          {...field}
                          id={field.name}
                          rows={3}
                          placeholder="Street name, building number, floor, apartment..."
                          className="w-full! border! bg-white! border-gray-200! rounded-xl! py-3! pl-10! pr-4! text-sm! outline-none! focus:border-green-500! focus:ring-0! transition-colors! resize-none"
                        />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                  </div>

                <div className="mb-4">
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Phone Number <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        className="w-full! border! bg-white! border-gray-200! rounded-lg! py-5! pl-10! pr-4! text-sm! outline-none! focus:border-green-500! focus:ring-0! transition-colors!"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
                  </div>

                </form>

              </div>
              
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-linear-to-r from-green-700 to-green-800 px-6 py-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-white" />
                  <h2 className="text-white font-bold text-lg">Payment Method</h2>
                </div>
                <p className="text-green-100 text-sm mt-0.5">Choose how you'd like to pay</p>
              </div>

              <div className="bg-white px-6 py-5 flex flex-col gap-4">

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-green-500' : 'bg-gray-100'}`}>
                      <Banknote className={`w-5 h-5 ${paymentMethod === 'cash' ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when your order arrives at your doorstep</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                    {paymentMethod === 'cash' && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'online' ? 'bg-linear-to-r from-green-500 via-blue-500 to-blue-600' : 'bg-gray-100'}`}>
                      <CreditCard className={`w-5 h-5 ${paymentMethod === 'online' ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Pay Online</p>
                      <p className="text-xs text-gray-500">Secure payment with Credit/Debit Card via Stripe</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">VISA</span>
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">MC</span>
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">AMEX</span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'online' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                    {paymentMethod === 'online' && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </div>
                </label>

                <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-start gap-3">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-700">Secure & Encrypted</p>
                    <p className="text-xs text-green-600 mt-0.5">Your payment info is protected with 256-bit SSL encryption</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm sticky top-24">
              <div className="bg-linear-to-r from-green-700 to-green-800 px-6 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <h2 className="text-white font-bold text-lg">Order Summary</h2>
                </div>
                <p className="text-green-100 text-sm mt-0.5">{cartProducts.length} item{cartProducts.length > 1 ? 's' : ''}</p>
              </div>

              <div className="bg-white px-6 py-5 flex flex-col gap-4">

                {/* Product */}
                <div className="h-[200px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
                  {cartProducts.map((product) => (
                    <div key={product._id} className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100 last:border-0">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                        <img
                          src={product.product.imageCover}
                          alt={product.product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">{product.product.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {product.count} × {product.price} EGP
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">{product.price * product.count}</span>
                    </div>
                  ))}
                </div>
                {/* Pricing */}
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{cartProducts.reduce((total, product) => total + (product.price * product.count), 0)} EGP</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 items-center">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                    Shipping
                  </span>
                  {isFreeShipping ? (
                    <span className="font-medium text-gray-900">free</span>
                  ) : (
                    <span className="font-medium text-gray-900">50 EGP</span>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                  <span className="font-bold text-gray-900 text-base">Total</span>
                  <span>
                    {
                      cartProducts.reduce((total, product) => total + product.count, 0) < 500 
                        ? <span className="font-bold text-green-600 text-2xl">{subTotal}</span>
                        : <span className="font-bold text-green-600 text-2xl">{totalAmount}</span>
                    }
                    <span className="text-gray-400 text-sm ml-1">EGP</span>
                  </span>
                </div>


                {/* Place Order */}
                <Button onClick={form.handleSubmit(handleSubmit)} className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                  <Lock className="w-4 h-4" />
                  Place Order
                </Button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    Secure
                  </span>
                  <div className="w-px h-3 bg-gray-200" />
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-blue-500" />
                    Fast Delivery
                  </span>
                  <div className="w-px h-3 bg-gray-200" />
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3 h-3 text-orange-400" />
                    Easy Returns
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}