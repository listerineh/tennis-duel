import type { User } from '@/types';
import {createContext} from 'react';

interface AuthContextType {
  user: User | null;
  login: (username: string, password?: string) => Promise<void>; // Password optional for simplicity
  signUp: (username: string, password?: string) => Promise<void>; // Added for account creation
  logout: () => void;
  isLoading: boolean; // For initial auth state loading
  error: string | null; // For login/signup errors
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
