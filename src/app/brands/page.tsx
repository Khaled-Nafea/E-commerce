import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { IBrand } from '@/types/product';
import { Tags } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Brands() {
  const res = await fetch(`${process.env.BASE_URL}/brands`,
    {method: "GET"}
  );
  const data = await res.json();
  const brands = data.data;

  return (
    <>
      <BreadCrumb title="Top Brands" description="Shop from your favorite brands" gradient="from-purple-800 via-purple-600 to-purple-400"
       iconBg="bg-[#A067FF]" icon={Tags} breadcrumbs={[{ label: "Home", href: "/" },{ label: "Brands" }]} />
      
        <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 p-5 mx-auto">
        {brands.map((brand: IBrand) => (
          <Link href={`/brands/${brand._id}`} key={brand._id} className="group relative border border-gray-200 rounded-2xl bg-white hover:shadow-md hover:translate-y-[-4px] transition-all duration-400 overflow-hidden cursor-pointer">
            <div className="flex items-center justify-center p-4 sm:p-5 h-44 sm:h-50 bg-gray-50 rounded-t-2xl">
              <Image
                src={brand.image}
                alt={brand.name}
                className="object-contain w-full h-full hover:scale-110 transition-transform duration-300"
                height={160}
                width={160}
                loading="eager"
              />
            </div>

            <div className="px-3 py-2 min-h-[52px] flex flex-col items-center justify-center text-cente grup">
              <h2 className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors truncate w-full text-center">
                {brand.name}
              </h2>

              <div className="group-hover:flex flex-col items-center gap-0.5">
                <p className="hidden group-hover:block text-xs text-purple-400 hover:text-purple-800 transition-colors">
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
