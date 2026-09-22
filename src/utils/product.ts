import { BASE_PRODUCTS } from '@/data/products-mock';
import { Product } from '@/types/product';

export const mediaBaseUrl = process.env.EXPO_PUBLIC_MEDIA_BASE_URL;

export function updateProduct(product: Product): Product {
  // Adding remote data along with local data due to my-json-server.typicode.com restrictions

  const baseProduct = BASE_PRODUCTS.find(bp => bp.slug === product.slug);
  if (baseProduct) {
    product = {
      ...baseProduct,
      ...product,
    };
  }

  product.image = `${mediaBaseUrl}${product.image}`;
  product.price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
  product.average_rating =
    typeof product.average_rating === 'number'
      ? product.average_rating
      : parseFloat(product.average_rating);
  return product;
}
