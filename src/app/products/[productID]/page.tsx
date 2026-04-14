import QuantitySelector from "@/app/products/ProductCompo/Quantity/Quantity";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getLoggedUserWishlist } from "@/services/wishlist.action";
import { IProduct } from "@/types/product";
import { Star, Truck, RotateCcw, Shield } from "lucide-react";
import Image from "next/image";

export default async function ProductDetail({ params }: { params: Promise<{productID: string}> }) {
    const { productID } = await params;
     const res = await fetch(`${process.env.BASE_URL}/products/${productID}`,
          {method: "GET"}
        );
        const data = await res.json();
        const product: IProduct = data.data;
        const wishlist = await getLoggedUserWishlist();

  return (
    <div>
      <div className="container mx-auto px-4 py-8">

        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-gray-500 hover:text-gray-700 text-sm">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products" className="text-gray-500 hover:text-gray-700 text-sm">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-800 text-sm font-medium">{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            <div className="col-span-1 max-h-[600px] flex items-center justify-center shadow-sm border border-gray-100 rounded-lg overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image: string, index: number) => (
                    <CarouselItem key={index} className="flex items-center justify-center">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={image}
                          alt={product.title}
                          fill
                          className="object-contain"
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 cursor-pointer" />
                <CarouselNext className="right-2 cursor-pointer" />
              </Carousel>
            </div>

            <div className="p-8 flex flex-col gap-4 col-span-3 shadow-sm border border-gray-100 rounded-lg overflow-hidden">

              <div className="flex items-center gap-2 flex-wrap">
                {product.category?.name && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full border border-green-300 text-green-700 bg-green-50">
                    {product.category.name}
                  </span>
                )}
                {product.brand?.name && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full border border-gray-300 text-gray-600 bg-gray-50">
                    {product.brand.name}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>

               <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, star) => (
              star < Math.floor(product.ratingsAverage) ? (
                <Star key={star} className="text-yellow-500 fill-yellow-500" width={20} height={20} />
              ) : (
                <Star key={star} className="text-gray-300 fill-gray-300" width={20} height={20} />
              )
            ))}
            <span className="text-sm text-gray-500">{`(${product.ratingsAverage})`}</span>
          </div>

              <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {product.priceAfterDiscount ? (
                  <>
                    {product.priceAfterDiscount} <span className="text-xl font-semibold">EGP</span>
                    <span className="text-lg line-through text-gray-400">{product.price} EGP</span>
                  </>
                ) : (
                  <>
                    {product.price} <span className="text-xl font-semibold">EGP</span>
                  </>
                )}

                 {product.priceAfterDiscount && (
             <div className="bg-red-500 text-white px-2 py-1 rounded-full">
            <span className="text-sm text-white block">
              Save {Math.round((product.price-product.priceAfterDiscount)/product.price*100)}%
            </span>
          </div>
             )}
              </div>

              {product.quantity > 0 ? (
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  <span className="text-sm font-medium text-green-600">In Stock</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1 w-fit">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                  <span className="text-sm font-medium text-red-600">Out of Stock</span>
                </div>
              )}

              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {product.description}
              </p>

              <QuantitySelector price={product.price} maxQuantity={product.quantity} priceAfterDiscount={product.priceAfterDiscount || 0} id={product.id} wishlist={wishlist} />

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100 mt-1">
                {[
                  { icon: <Truck size={20} />, title: "Free Delivery", sub: "Orders over $50" },
                  { icon: <RotateCcw size={20} />, title: "30 Days Return", sub: "Money back" },
                  { icon: <Shield size={20} />, title: "Secure Payment", sub: "100% Protected" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      {item.icon}
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}