import { RootState } from '@/store';

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsGuest = (state: RootState) => state.auth.isGuest;
