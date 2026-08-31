import { ImageSource } from 'expo-image';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  image: string | number | ImageSource;
}
