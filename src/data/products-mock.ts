import { Product } from '@/types/product';

export const BASE_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    title: 'Imperial Organic Yeast A07',
    subtitle: 'per pouch',
    price: 12.0,
    currency: '€',
    image: require('@/assets/images/products/product-1.png'),
    quantity: 1,
  },
  {
    title: 'Saaz Hops',
    subtitle: 'per 100g',
    price: 15.0,
    currency: '€',
    image: require('@/assets/images/products/product-2.png'),
    quantity: 1,
  },
  {
    title: 'West Coast IPA - All-Grain Kit',
    subtitle: 'for 5 Gallons',
    price: 20.0,
    currency: '€',
    image: require('@/assets/images/products/product-3.png'),
    quantity: 1,
  },
];

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 30 }, (_, index) => {
  const baseItem = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
  const id = String(index + 1);

  return {
    ...baseItem,
    id,
    title: `${baseItem.title} #${id}`,
  };
});
