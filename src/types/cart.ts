import { ImageSource } from 'expo-image';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string | number | ImageSource;
  price_tag: string;
  quantity: number;
}
