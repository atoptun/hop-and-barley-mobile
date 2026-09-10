import { User } from '@/api/auth-service';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, registerThunk, restoreSessionThunk } from './auth-thunks';

interface AuthState {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  isRestoringToken: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
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
        state.isGuest = false;
      })

      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isGuest = false;
      })

      .addCase(logoutThunk.fulfilled, state => {
        state.user = null;
        state.error = null;
        state.isGuest = true;
      })

      .addCase(restoreSessionThunk.pending, state => {
        state.isRestoringToken = true;
      })

      .addCase(restoreSessionThunk.fulfilled, (state, { payload }) => {
        state.isRestoringToken = false;
        if (payload) {
          state.user = payload;
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
        state.error = error.message || null;
      });
  },
});

export const { loginAsGuest } = authSlice.actions;
export default authSlice.reducer;
