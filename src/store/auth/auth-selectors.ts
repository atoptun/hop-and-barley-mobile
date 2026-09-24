import { RootState } from '@/store/store';

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthIsGuest = (state: RootState) => state.auth.isGuest;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthIsRefreshing = (state: RootState) => state.auth.isRestoringToken;
