import { authApi } from '@/api/auth-service';
import { LoginData, RegisterData } from '@/types/auth';
import { clearToken, getToken, saveToken } from '@/utils/secure-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credential: RegisterData, { rejectWithValue }) => {
    try {
      const resp = await authApi.register(credential);
      await saveToken(resp.token);
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registeration error');
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credential: LoginData, { rejectWithValue }) => {
    try {
      const resp = await authApi.login(credential);
      await saveToken(resp.token);
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login error');
    }
  }
);

export const restoreSessionThunk = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) return null;

      const user = await authApi.getProfile(token);
      return { user, token };
    } catch {
      await clearToken();
      return null;
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    if (!token) return null;

    const resp = await authApi.logout(token);
    clearToken();
    return resp;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Logout error');
  }
});
