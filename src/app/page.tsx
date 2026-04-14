import { Van, Shield, RotateCcw, Headset, Heart, RefreshCw, Eye, Star, Plus } from "lucide-react";
import { ICategory, IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/services/healperServices";
import PromoCards from "@/components/PromoCards/PromoCards";
import { Button } from "@base-ui/react";
import Newsletter from "@/components/Newsletter/Newsletter";
import { HeroCarousel } from "@/components/homeCarousel/homeCarousel";
import AddButton from "@/components/AddButton/AddButton";
import WishlistButton from "@/components/wishlistButton/wishlistButton";
import { getLoggedUserWishlist } from "@/services/wishlist.action";

const features = [
  { icon: Van, title: "Free Shipping", description: "On all orders over $50", bgColor: "bg-[#EFF6FF]", color: "text-[#2B7FFF]" },
  { icon: Shield, title: "Secure Payment", description: "100% secure transactions", bgColor: "bg-[#ECFDF5]", color: "text-[#12B76A]" },
  { icon: RotateCcw, title: "Easy Returns", description: "14-day return policy", bgColor: "bg-[#FFF4E5]", color: "text-[#FF6900]" },
  { icon: Headset, title: "24/7 Support", description: "Dedicated support team", bgColor: "bg-[#F4F3FF]", color: "text-[#AD46FF]" },
];


export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  const wishlist = await getLoggedUserWishlist();

  return (
    <>
     <HeroCarousel />
      {/* Features Section */}
      <section className="py-8 bg-[#F9FAFB]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 items-center justify-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
    
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-7 bg-[#009966] rounded-full inline-block"></span>
              Shop By
              <span className="text-[#009966]">Category</span>
            </h2>
            <Link href="/categories" className="text-[#009966] hover:text-[#007a52] font-medium text-sm md:text-base flex items-center gap-1 transition-colors">
              View All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category: ICategory) => (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="group border border-gray-200 rounded-2xl bg-white hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="flex items-center justify-center w-25 h-25 rounded-full overflow-hidden bg-gray-50 mx-auto my-6">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    height={100}
                    width={100}
                    loading="eager"
                  />
                </div>
                <div className="px-3 py-2 flex items-center justify-center">
                  <h2 className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors truncate text-center">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Cards Section */}
      <PromoCards />

      {/* Products Section */}
      <section className="py-10 bg-white">

      <div className="container mx-auto flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-7 bg-[#009966] rounded-full inline-block"></span>
              Shop By
              <span className="text-[#009966]">Product</span>
            </h2>
      </div>
      
      <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 mx-auto">
      {products.map((product: IProduct) => (
        <div key={product._id} className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-lg hover:translate-y-[-8px] transition-all duration-400">
          <div className="relative">
            <Image src={product.imageCover} alt={product.title} className="w-full h-60 object-contain bg-white" height={320} width={320} loading="eager" />
           <WishlistButton inProductID={false} id={product._id} wishlist={wishlist} />
            <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-10 right-0 group flex items-center justify-center" aria-label="Add to cart" type="button">
              <RefreshCw className="text-gray-500 group-hover:text-green-500 transition-all duration-300" size="15" />
            </Button>
             <Link href={`/products/${product._id}`}>
              <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-20 right-0 group flex items-center justify-center" aria-label="Add to cart" type="button">
                <Eye className="text-gray-500 group-hover:text-green-500 transition-all duration-300" size="15"/>
              </Button>
             </Link>
             {product.priceAfterDiscount && (
             <div className="absolute top-0 left-0 bg-red-500 text-white px-1 py-1 rounded-tr-lg rounded-bl-lg">
            <span className="text-sm text-white block">
              -{Math.round((product.price-product.priceAfterDiscount)/product.price*100)}%
            </span>
          </div>
             )}
          </div>
            <span className="text-sm text-gray-500 mt-2 block">
              {product.category?.name}
            </span>
            <h2 title={product.title} className="text-lg my-2">
              {product.title.substring(0, 19)}...
            </h2>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, star) => star < Math.floor(product.ratingsAverage) ? (
                  <Star key={star} className="text-yellow-500 fill-yellow-500" width={20} height={20} />
                ) : (
                  <Star key={star} className="text-gray-300 fill-gray-300" width={20} height={20} />
                ),
              )}
              <span className="text-sm text-gray-500">{`(${product.ratingsAverage})`}</span>
            </div>
          <div className="flex items-center gap-3 mt-3 justify-between">
            <div className="flex items-center gap-2">
               <span className={`text-lg font-bold ${product.priceAfterDiscount ? 'text-green-600' : 'text-gray-900'}`}>{`${product.priceAfterDiscount || product.price} EGP`}</span>
             {product.priceAfterDiscount && (
              <span className="text-sm line-through text-gray-600">{product.price} EGP</span>
            )}
            </div>
            <AddButton className="bg-green-600 flex items-center justify-center gap-2 text-white px-3 py-2 h-10 w-10 rounded-full cursor-pointer hover:bg-green-700 transition-all duration-300" icon={<Plus width={15} height={15} />} id={product._id} />
          </div>
        </div>
      ))}
    </div>
    </section>

    {/* Newsletter Section */}
    <Newsletter />
    </>
  );
}