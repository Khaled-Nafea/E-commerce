import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import Empty from '@/components/Empty/Empty';
import { Button } from '@/components/ui/button';
import { IBrand, IProduct } from '@/types/product';
import { Eye, Heart, PackageOpen, Plus, RefreshCw, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default async function BrandDetail({ params }: { params: Promise<{brandsID: string}> }) {
    const { brandsID } = await params;

    const [brandRes, productsRes] = await Promise.all([
        fetch(`${process.env.BASE_URL}/brands/${brandsID}`, { method: "GET" }),
        fetch(`${process.env.BASE_URL}/products?brand=${brandsID}`, { method: "GET" })
    ]);

    const [brandData, productsData] = await Promise.all([
        brandRes.json(),
        productsRes.json()
    ]);

    const brand: IBrand = brandData.data;
    const products: IProduct[] = productsData.data;

  return (
     <>
    <BreadCrumb title={brand.name} description="Browse our wide range of product categories" gradient="from-green-600 via-green-500 to-green-300"
     iconBg="bg-[#4AC577]"  icon={PackageOpen}  logo={brand.image ? (<Image src={brand.image} alt={brand.name} width={64} height={64} className="w-full h-full object-contain" />) : undefined} breadcrumbs={[{ label: "Home", href: "/" },{ label: "Brands", href: "/brands" },{ label: brand.name }]} />
     {products.length === 0 ? (
  <Empty 
    title="No Products Found"
    description="This brand has no products yet."
    actionLabel="View All Products"
    actionHref="/products"
  />
) : (
    <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 mx-auto">
      {products.map((product: IProduct) => (
        <div key={product._id} className="border border-gray-400 p-4 rounded-lg bg-white hover:shadow-lg hover:translate-y-[-8px] transition-all duration-400">
          <div className="relative">
            <Image src={product.imageCover} alt={product.title} className="w-full h-60 object-contain bg-white" height={320} width={320} loading="eager" />
            <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-0 right-0 group" aria-label="Add to favorites" type="button">
              <Heart className="text-gray-500 group-hover:text-red-500 transition-all duration-300" />
            </Button>
            <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-10 right-0 group" aria-label="Add to cart" type="button">
              <RefreshCw className="text-gray-500 group-hover:text-green-500 transition-all duration-300" />
            </Button>
             <Link href={`/products/${product._id}`}>
              <Button className="cursor-pointer bg-white h-8 w-8 rounded-full shadow-lg absolute top-20 right-0 group" aria-label="Add to cart" type="button">
                <Eye className="text-gray-500 group-hover:text-green-500 transition-all duration-300" />
              </Button>
             </Link>
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
            <span className="text-lg font-bold">{`${product.price} EGP`}</span>
            <Button className="bg-green-600 flex items-center justify-center gap-2 text-white px-3 py-2 h-10 w-10 rounded-full cursor-pointer hover:bg-green-700 transition-all duration-300" type="button">
              <Plus width={15} height={15} /> 
            </Button>
          </div>
        </div>
      ))}
    </div>
    )}
    </>
  )
}
