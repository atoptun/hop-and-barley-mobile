import { Product } from '@/types/product';

export const BASE_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    slug: 'imperial-organic-yeast-a07',
    name: 'Imperial Organic Yeast A07',
    description: 'Imperial Organic Yeast A07',
    price: 12.0,
    price_tag: 'per pouch',
    average_rating: 3,
    image: require('@/assets/images/products/product-1.png'),
    technical_specifications: {},
    quantity: 0,
  },
  {
    slug: 'saaz-hops',
    name: 'Saaz Hops',
    description: 'Saaz Hops',
    price: 15.0,
    price_tag: 'per 100g',
    average_rating: 4,
    image: require('@/assets/images/products/product-2.png'),
    technical_specifications: {},
    quantity: 0,
  },
  {
    slug: 'west-coast-ipa-all-grain-kit',
    name: 'West Coast IPA - All-Grain Kit',
    description: 'West Coast IPA - All-Grain Kit',
    price: 20.0,
    price_tag: 'for 5 Gallons',
    average_rating: 5,
    image: require('@/assets/images/products/product-3.png'),
    technical_specifications: {},
    quantity: 0,
  },
];

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 30 }, (_, index) => {
  const baseItem = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
  const id = String(index + 1);

  return {
    ...baseItem,
    slug: `${baseItem.slug}-${id}`,
    title: `${baseItem.name} #${id}`,
  };
});
