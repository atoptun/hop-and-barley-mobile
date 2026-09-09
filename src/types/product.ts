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

export interface ProductItem extends Product {
  quantity: number;
}
