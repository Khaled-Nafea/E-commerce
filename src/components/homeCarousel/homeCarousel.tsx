"use client";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "../../../public/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png";

const slides = [
  {
    title: "Fresh Products to your door",
    subtitle: "Get 20% off your first order",
    btn1: { label: "Shop Now", href: "/products" },
    btn2: { label: "View Deals", href: "/deals" },
    textColor: "text-green-600",
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    btn1: { label: "Shop Now", href: "/products" },
    btn2: { label: "Learn More", href: "/about" },
    textColor: "text-blue-600",
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    btn1: { label: "Order Now", href: "/products" },
    btn2: { label: "Delivery Info", href: "/delivery" },
    textColor: "text-purple-600",
  },
];


export function HeroCarousel() {
     const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="w-full relative">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full p-4 h-[320px] md:h-[420px] bg-cover bg-center" style={{ backgroundImage: `url(${Image.src})` }}>
                <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50" />
                <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20 max-w-lg">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base mb-6">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-3">
                    <Button className={`bg-white ${slide.textColor} hover:bg-gray-100 font-semibold rounded-md p-5.5 text-sm cursor-pointer`}>
                      <Link href={slide.btn1.href}>{slide.btn1.label}</Link>
                    </Button>
                    <Button variant="outline" className={`border-white text-white hover:bg-white/10 font-semibold rounded-md p-5.5 text-sm bg-transparent cursor-pointer`}>
                      <Link href={slide.btn2.href}>{slide.btn2.label}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-12 bg-white! hover:scale-110 border-none text-green-600 cursor-pointer" />
        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-12 bg-white! hover:scale-110 border-none text-green-600 cursor-pointer" />
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <div key={i} onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full bg-white transition-all cursor-pointer ${
                i === current ? "w-6 opacity-100" : "w-2 opacity-50"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

