import { selectCartItemsList, selectCartTotalPrice } from '@/store/cart/cart-selectors';
import { checkout as checkoutAction, clearCart as clearCartAction } from '@/store/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function useCart() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItemsList);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const checkout = (): boolean => {
    // check everything
    return true;
  };

  const finishCheckout = (): boolean => {
    dispatch(checkoutAction());

    return true;
  };

  return {
    // data
    cartItems,
    totalItemsCount: cartItems.length,
    totalPrice,
    //
    clearCart,
    checkout,
    finishCheckout,
  };
}
