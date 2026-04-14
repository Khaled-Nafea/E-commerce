'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ShoppingBag,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { getOrdersById } from '@/services/checkout.action'
import { IOrder } from '@/types/product'
import { OrderCard } from '@/app/allorders/OrderCard/OrderCard'
import Empty from '@/components/Empty/Empty'



export default function AllOrdersPage() {
  const {allordersID} = useParams()
  const [orders, setOrders] = useState<IOrder[]>([])

  const fetchOrders = async () => {
      try {
        const res = await getOrdersById(allordersID as string)
        console.log('API RESPONSE:', res)
        setOrders(res)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    if (allordersID) fetchOrders()
  }, [allordersID])

  return (
    <>
    {
      orders.length === 0 ? (
        <Empty title="No orders found" description="You haven't placed any orders yet." />
      ) : (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-gray-500 text-sm">
                Track your {orders.length} order(s)
              </p>
            </div>
          </div>

          <Link href="/" className="text-green-600 font-medium">
            Continue Shopping
          </Link>

        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

      </div>
    </div>
      )
    }
    </>
  )
}