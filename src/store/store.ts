import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import reactotron from '@/config/reactotron';
import { baseApi } from '@/store/api/base-api';
import authReducer from '@/store/auth/auth-slice';
import cartReducer from '@/store/cart/cart-slice';
import { productsFilterReducer } from '@/store/products/products-filter-slice';
import { recipesFilterReducer } from '@/store/recipes/recipes-filter-slice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
  // blacklist: ['isLoading', 'error'],
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['items'],
  // blacklist: ['isLoading', 'error'],
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  [baseApi.reducerPath]: baseApi.reducer,
  recipesFilter: recipesFilterReducer,
  productsFilter: productsFilterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  enhancers: getDefaultEnhancers => {
    if (__DEV__ && reactotron.createEnhancer) {
      return getDefaultEnhancers().concat(reactotron.createEnhancer());
    }
    return getDefaultEnhancers();
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
