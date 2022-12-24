export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartProduct {
  id?: number;
  title: string;
  price: number;
  image: string;
  qty: number;
  total: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchResult {
  image: string;
  title: string;
  price: number;
  category: string;
}
