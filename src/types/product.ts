import { ImageSource } from 'expo-image';

export interface Product {
  slug: string;
  name: string;
  price: number;
  category_name: string;
  category_slug: string;
  image: string | number | ImageSource;
  stock: number;
  average_rating: number;
  price_tag: string;
  technical_specifications?: Record<string, string>;

  description: string;
}

// export interface ProductCardItem extends Product {
//   quantity: number;
// }

export interface ProductCardItem {
  slug: string;
  name: string;
  price: number;
  image: string | number | ImageSource;
  price_tag: string;
  stock: number;
  // quantity: number;
}
