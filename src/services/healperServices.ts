import { ICategory, IProduct } from "@/types/product";

export async function getCategories(): Promise<ICategory[]> {
  const res = await fetch(`${process.env.BASE_URL}/categories`, {
    method: "GET",
  });
  const data = await res.json();
  return data.data;
}

export async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(`${process.env.BASE_URL}/products`, {
    method: "GET",
  });
  const data = await res.json();
  return data.data;
}

export async function getProductsByCategory(categoryId: string): Promise<IProduct[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/products?category=${categoryId}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data.data;
}