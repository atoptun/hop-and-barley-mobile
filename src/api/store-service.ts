import { Product } from '@/types/product';
import { client } from './base-client';
import { updateProduct } from '@/utils/product';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await client.get('/products');

  return data.map((p: Product) => updateProduct(p));
};

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await client.get(`/products/${slug}`);

  return updateProduct(data);
}
