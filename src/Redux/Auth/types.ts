export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  message: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface changePasswordCredentials {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  role: string;
}
export interface ApiErrors {
  message: string;
}
