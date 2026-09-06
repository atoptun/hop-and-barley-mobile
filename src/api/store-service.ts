import { MOCK_PRODUCTS } from '@/data/products-mock';
import { Product } from '@/types/product';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (): Promise<Product[]> => {
  await delay(500);
  return MOCK_PRODUCTS;
};

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(300);
  const found = MOCK_PRODUCTS.find(p => p.id === id);
  return found ?? null;
}
