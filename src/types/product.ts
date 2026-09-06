import { ImageSource } from 'expo-image';

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  price_tag: string;
  average_rating: number;
  image: string | number | ImageSource;
  technical_specifications?: Record<string, string>;
  quantity: number;
}
