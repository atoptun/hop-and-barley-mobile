import { memo } from 'react';
import { ProductCard, ProductCardProps } from '@/components/features/catalog/product-card';

export const ProductListItem = memo(function ProductListItem(props: ProductCardProps) {
  return <ProductCard {...props} />;
});
