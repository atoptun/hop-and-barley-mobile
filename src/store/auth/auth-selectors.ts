import { RootState } from '@/store/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsGuest = (state: RootState) => state.auth.isGuest;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsRefreshing = (state: RootState) => state.auth.isRestoringToken;
