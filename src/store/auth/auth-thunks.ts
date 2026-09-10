import { authApi, AuthResponse, User } from '@/api/auth-service';
import { LoginData, RegisterData } from '@/types/auth';
import { clearToken, getToken, saveToken } from '@/utils/secure-storage';
import { createAppAsyncThunk } from '../typed-thunk';

export const registerThunk = createAppAsyncThunk<Omit<AuthResponse, 'token'>, RegisterData>(
  'auth/register',
  async (credential: RegisterData) => {
    const resp = await authApi.register(credential);
    await saveToken(resp.token);
    return resp;
  }
);

export const loginThunk = createAppAsyncThunk<Omit<AuthResponse, 'token'>, LoginData>(
  'auth/login',
  async credential => {
    const resp = await authApi.login(credential);
    await saveToken(resp.token);
    return resp;
  }
);

export const restoreSessionThunk = createAppAsyncThunk<User | null, void>(
  'auth/restoreSession',
  async () => {
    try {
      const token = await getToken();
      if (!token) return null;

      const user = await authApi.getProfile(token);
      return user;
    } catch {
      await clearToken();
      return null;
    }
  }
);

export const logoutThunk = createAppAsyncThunk<void, void>('auth/logout', async () => {
  const token = await getToken();
  if (!token) return;

  await authApi.logout(token);
  await clearToken();
  return;
});
