"use client"
import { useState } from 'react'
import {
  MapPin,
  Phone,
  Package,
  Calendar,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Banknote,
  CreditCard
} from 'lucide-react'
import { IOrder } from '@/types/product'
import { Button } from '@base-ui/react'

function getOrderStatus(order: IOrder) {
  if (order.isDelivered)
    return { label: 'Delivered', color: 'text-green-700', bg: 'bg-green-50', dotColor: 'bg-green-500' }
  if (order.isPaid)
    return { label: 'On the way', color: 'text-blue-700', bg: 'bg-blue-50', dotColor: 'bg-blue-500' }
  return { label: 'Processing', color: 'text-orange-600', bg: 'bg-orange-50', dotColor: 'bg-orange-400' }
}

export function OrderCard({ order }: { order: IOrder }) {
  const [expanded, setExpanded] = useState(false)
  const status = getOrderStatus(order)
  const displayedImage = order.cartItems?.[0]?.product?.imageCover
  const extraCount = order.cartItems.length - 1
 const savedAddresses = typeof window !== 'undefined'? JSON.parse(localStorage.getItem('shippingAddresses') || '{}') : {}
const shippingAddress = order.shippingAddress ?? savedAddresses[order.id]

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const subtotal = order.totalOrderPrice - (order.shippingPrice || 0)

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 ${expanded ? 'border-green-400 ring-1 ring-green-100' : 'border-gray-100 shadow-sm'}`}>
      
      {/* Header */}
      <div className="p-5 flex flex-wrap md:flex-nowrap items-center gap-6">
        
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
            {displayedImage ? (
              <img src={displayedImage} alt="product" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <Package size={24} />
              </div>
            )}
          </div>
          {extraCount > 0 && (
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#1a202c] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
              +{extraCount}
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold ${status.bg} ${status.color}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${status.dotColor}`} />
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-900 font-extrabold text-lg">
            <span className="text-gray-300 font-light">#</span>
            {order.id.toString().slice(-3)} 
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-500 mt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              {formattedDate}
            </span>
            <span className="text-gray-200">•</span>
            <span className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-gray-400" />
              {order.cartItems.length} items
            </span>
            <span className="text-gray-200">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              {order.shippingAddress?.city}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col items-end gap-3 ml-auto">
          <Button className="p-2 bg-gray-50 rounded-lg text-gray-400" aria-label="View order details">
            {order.isPaid
              ? <CreditCard className="w-4 h-4 text-purple-500" />
              : <Banknote className="w-4 h-4 text-gray-400" />
            }
          </Button>
           
           <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xl font-black text-gray-900 leading-none">
                  {order.totalOrderPrice}
                </span>
                <span className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-wider">EGP</span>
              </div>

              <Button
                onClick={() => setExpanded(!expanded)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${expanded ? 'bg-[#10b981] text-white shadow-lg shadow-green-100' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                {expanded ? 'Hide' : 'Details'}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
           </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-50 bg-[#f9fafb]/50 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-sm">
              <ClipboardList size={16} className="text-green-600" />
              Order Items
            </div>
            <div className="grid gap-3">
              {order.cartItems.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.product.imageCover} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.product.title}</p>
                      <p className="text-xs text-gray-400 font-medium">{item.count} × {item.price} EGP</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{item.count * item.price}</p>
                    <p className="text-[10px] text-gray-400 font-bold">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Delivery Address Box */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm">
                <MapPin size={16} />
                Delivery Address
              </div>
              <p className="font-bold text-gray-800 mb-1">{shippingAddress?.city}</p>
              <p className="text-sm text-gray-500 mb-3 break-all font-medium uppercase tracking-tighter">
                {shippingAddress?.details || ''}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                <Phone size={14} className="text-gray-400" />
                {shippingAddress?.phone}
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#fffbeb] border border-orange-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold text-sm">
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                Order Summary
              </div>
              <div className="space-y-2 text-sm font-medium">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-800">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">{order.shippingPrice === 0 ? 'Free' : `${order.shippingPrice} EGP`}</span>
                </div>
                <div className="h-px bg-orange-200/50 my-2" />
                <div className="flex justify-between items-end pt-1">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <div className="text-right">
                    <span className="font-black text-gray-900 text-xl">{order.totalOrderPrice}</span>
                    <span className="text-[10px] font-bold text-gray-500 ml-1">EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}