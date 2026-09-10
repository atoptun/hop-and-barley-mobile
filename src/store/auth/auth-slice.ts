import { User } from '@/api/auth-service';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, registerThunk, restoreSessionThunk } from './operations';

interface AuthState {
  user: User | null;
  token: string | null;
  isGuest: boolean;
  isLoading: boolean;
  isRestoringToken: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isGuest: false,
  isLoading: false,
  isRestoringToken: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsGuest: state => {
      state.isGuest = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isGuest = false;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isGuest = false;
      })
      .addCase(logoutThunk.fulfilled, (state, { payload }) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.isGuest = true;
      })

      .addCase(restoreSessionThunk.pending, state => {
        state.isRestoringToken = true;
      })
      .addCase(restoreSessionThunk.fulfilled, (state, { payload }) => {
        state.isRestoringToken = false;
        if (payload) {
          state.user = payload.user;
          state.token = payload.token;
          state.isGuest = false;
        }
      })
      .addCase(restoreSessionThunk.rejected, state => {
        state.isRestoringToken = false;
      })
      // all
      .addMatcher(isPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled, state => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error as string;
      });
  },
});

export const { loginAsGuest } = authSlice.actions;
export default authSlice.reducer;
