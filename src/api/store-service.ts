import { BASE_PRODUCTS } from '@/data/products-mock';
import { Product } from '@/types/product';
import * as axios from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
const mediaBaseUrl = process.env.EXPO_PUBLIC_MEDIA_BASE_URL;

const client = axios.create({
  baseURL: baseUrl,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await client.get('/products');

  return data.map((p: Product) => updateProduct(p));
};

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await client.get(`/products/${slug}`);

  return updateProduct(data);
}

function updateProduct(product: Product): Product {
  // Adding remote data along with local data due to my-json-server.typicode.com restrictions

  product.image = `${mediaBaseUrl}${product.image}`;
  product.price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
  product.average_rating =
    typeof product.average_rating === 'number'
      ? product.average_rating
      : parseFloat(product.average_rating);
  const baseProduct = BASE_PRODUCTS.find(bp => bp.slug === product.slug);
  if (baseProduct) {
    product.description = product.description || baseProduct.description;
    product.technical_specifications =
      product.technical_specifications || baseProduct.technical_specifications;
  }
  return product;
}
