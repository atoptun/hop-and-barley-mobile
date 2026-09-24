import { LoginData, RegisterData } from '@/types/auth';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LogoutResponse {
  result: boolean;
}

export interface RecoveryPasswordResponse {
  result: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  // Emulation of the server auth service API

  register: async (credentials: RegisterData): Promise<AuthResponse> => {
    await delay(1000);

    if (credentials.password === 'wrongpassword') {
      throw new Error('Wrong credentials');
    }

    return {
      user: {
        id: 'usr_42',
        name: 'Lucas Scott',
        email: credentials.email,
      },
      token: `mock_jwt_token_${Date.now()}`,
    };
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    await delay(1000);

    console.info(`Login data: ${JSON.stringify(credentials)}`);

    if (credentials.password === 'wrongpassword') {
      throw new Error('Wrong credentials');
    }

    return {
      user: {
        id: 'usr_42',
        name: 'Lucas Scott',
        email: credentials.email,
      },
      token: `mock_jwt_token_${Date.now()}`,
    };
  },

  getProfile: async (token: string): Promise<User> => {
    await delay(500);
    if (!token) throw new Error('Unauthorized');

    return {
      id: 'usr_102',
      name: 'Lucas Scott',
      email: 'lucasscott3@email.com',
    };
  },

  logout: async (token: string): Promise<LogoutResponse> => {
    await delay(500);
    if (!token) throw new Error('Unauthorized');

    return { result: true };
  },

  recoveryPassword: async (email: string): Promise<RecoveryPasswordResponse> => {
    await delay(500);

    return { result: true };
  },

  verifyCode: async (code: string): Promise<void> => {
    await delay(500);

    if (code !== '0000') {
      throw new Error('Wrong code');
    }

    return;
  },

  resendCode: async (): Promise<void> => {
    await delay(500);

    return;
  },
};
