import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import Empty from '@/components/Empty/Empty';
import { Button } from '@/components/ui/button';
import { IBrand, IProduct } from '@/types/product';
import { Eye, Heart, PackageOpen, Plus, RefreshCw, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/services/healperServices';
import { getLoggedUserWishlist } from '@/services/wishlist.action';
import AddButton from '@/components/AddButton/AddButton';
import WishlistButton from '@/components/wishlistButton/wishlistButton';


export default async function CategoryDetail({ params }: { params: Promise<{ categoriesID: string }> }) {
  const { categoriesID } = await params;

  const [categoryRes, products, wishlist] = await Promise.all([
    fetch(`${process.env.BASE_URL}/categories/${categoriesID}`).then(r => r.json()),
    getProductsByCategory(categoriesID),
    getLoggedUserWishlist(),
  ]);

  const category: IBrand = categoryRes.data;

  return (
    <>
      <BreadCrumb title={category.name} description="Browse products in this category" gradient="from-green-600 via-green-500 to-green-300" iconBg="bg-[#4AC577]" icon={PackageOpen} logo={category.image ? (
          <Image src={category.image} alt={category.name} width={64} height={64} className="w-full h-full object-contain" />
        ) : undefined}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      {products.length === 0 ? (
        <Empty title="No products found" description="This category doesn't have any products yet." actionHref="/categories" actionLabel="Browse Categories"/> 
      ) : (
        <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 mx-auto">
          {products.map((product: IProduct) => (
            <div key={product._id} className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-lg hover:translate-y-[-8px] transition-all duration-400">
              <div className="relative">
                <Image src={product.imageCover} alt={product.title} className="w-full h-60 object-contain bg-white" height={320} width={320} loading="eager" />
                <WishlistButton inProductID={false} id={product._id} wishlist={wishlist} />
                <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-10 right-0 group" type="button">
                  <RefreshCw className="text-gray-500 group-hover:text-green-500 transition-all duration-300" />
                </Button>
                <Link href={`/products/${product._id}`}>
                  <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-20 right-0 group" type="button">
                    <Eye className="text-gray-500 group-hover:text-green-500 transition-all duration-300" />
                  </Button>
                </Link>
                {product.priceAfterDiscount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-1 py-1 rounded-tr-lg rounded-bl-lg">
                    <span className="text-sm block">
                      -{Math.round((product.price - product.priceAfterDiscount) / product.price * 100)}%
                    </span>
                  </div>
                )}
              </div>
              <h2 title={product.title} className="text-lg my-2">
                {product.title.substring(0, 19)}...
              </h2>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, star) =>
                  star < Math.floor(product.ratingsAverage) ? (
                    <Star key={star} className="text-yellow-500 fill-yellow-500" width={20} height={20} />
                  ) : (
                    <Star key={star} className="text-gray-300 fill-gray-300" width={20} height={20} />
                  )
                )}
                <span className="text-sm text-gray-500 pl-2">({product.ratingsAverage})</span>
                <span className="text-sm text-gray-500">({product.ratingsQuantity})</span>
              </div>
              <div className="flex items-center mt-3 justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${product.priceAfterDiscount ? 'text-green-600' : 'text-gray-900'}`}>
                    {product.priceAfterDiscount || product.price} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <span className="text-sm line-through text-gray-600">{product.price} EGP</span>
                  )}
                </div>
                <AddButton
                  className="bg-green-600 flex items-center justify-center gap-2 text-white px-3 py-2 h-10 w-10 rounded-full cursor-pointer hover:bg-green-700 transition-all duration-300"
                  icon={<Plus width={15} height={15} />}
                  id={product._id}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
