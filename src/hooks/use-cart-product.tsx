import Toast from 'react-native-toast-message';

import { selectCartItemQuantity } from '@/store/cart/cart-selectors';
import {
  addToCart as addToCartAction,
  decQuantity as decQuantityAction,
  incQuantity as incQuantityAction,
} from '@/store/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ProductCardItem } from '@/types/product';

export function useCartProduct(product?: ProductCardItem) {
  const dispatch = useAppDispatch();

  const itemQuantity = useAppSelector(state =>
    product?.slug ? selectCartItemQuantity(product.slug)(state) : 0
  );

  const addToCart = () => {
    if (!product || (product.stock ?? 0) <= 0) return;
    dispatch(addToCartAction(product));
  };

  const incQuantity = () => {
    if (!product) return;
    if (itemQuantity >= (product.stock ?? 0)) {
      Toast.show({
        type: 'error',
        text1: 'Limit of product',
      });
      return;
    }
    dispatch(incQuantityAction(product.slug));
  };

  const decQuantity = () => {
    if (!product) return;

    dispatch(decQuantityAction(product.slug));
  };

  return {
    // data
    itemQuantity,
    // actions
    addToCart,
    incQuantity,
    decQuantity,
  };
}
