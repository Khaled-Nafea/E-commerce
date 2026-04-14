// Brand
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Category
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Subcategory
export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product
export interface IProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  brand: IBrand;
  category: ICategory;
  subcategory: ISubcategory[];
  createdAt: string;
  updatedAt: string;
}

export type IWishlist = IProduct[]

export interface ICartItem {
  _id: string;
  count: number;
  price: number;
  product: IProduct;
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}


export interface IOrderProduct {
  product: {
    _id: string
    title: string
    imageCover: string
  }
  count: number
  price: number
  _id: string
}


export interface IOrder {
  _id: string
  id: number
  cartItems: IOrderProduct[]
  shippingAddress?: {
    city: string
    details: string
    phone: string
  }
  paymentMethodType: 'cash' | 'card'
  isDelivered: boolean
  isPaid: boolean
  totalOrderPrice: number
  createdAt: string
  shippingPrice: number
}