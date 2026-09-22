import { Product } from '@/types/product';
import { updateProduct } from '@/utils/product';

import { client } from './base-client';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await client.get('/products');

  return data.map((p: Product) => updateProduct(p));
};

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await client.get(`/products/${slug}`);

  return updateProduct(data);
}
