import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { ICategory } from '@/types/product';
import { Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getCategories } from '@/services/healperServices';

export default async function Categories() {
  const categories = await getCategories();

  return (
    <>
      <BreadCrumb title="All Categories" description="Browse our wide range of product categories" gradient="from-green-800 via-green-600 to-green-400"
       iconBg="bg-[#10B981]" icon={Layers} breadcrumbs={[{ label: "Home", href: "/" },{ label: "categories" }]} />
      
        <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 mx-auto">
        {categories.map((category: ICategory) => (
          <Link href={`/categories/${category._id}`} key={category._id} className="group relative border border-gray-200 rounded-2xl bg-white hover:shadow-md hover:translate-y-[-4px] transition-all duration-400 overflow-hidden cursor-pointer">
            <div className="flex items-center justify-center p-4 sm:p-5 h-44 sm:h-50 bg-gray-50 rounded-t-2xl">
              <Image
                src={category.image}
                alt={category.name}
                className="object-contain w-full h-full hover:scale-110 transition-transform duration-300"
                height={160}
                width={160}
                loading="eager"
              />
            </div>

            <div className="px-3 py-2 min-h-[52px] flex flex-col items-center justify-center text-cente grup">
              <h2 className="text-sm font-bold text-gray-800 group-hover:text-green-600 transition-colors truncate w-full text-center">
                {category.name}
              </h2>

              <div className="group-hover:flex flex-col items-center gap-0.5">
                <p  className="hidden group-hover:block text-xs text-green-600 hover:text-green-800 transition-colors">
                  View Products →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
