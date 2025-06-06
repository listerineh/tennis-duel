'use client';

import type { User } from '@/types';
import { AuthContext } from './AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AUTH_STORAGE_KEY = 'tennisDuelUser';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simplified mock authentication
    if (username) { // In a real app, validate username and password
      const userData: User = { username };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      router.push('/dashboard');
    } else {
      setError('Invalid username or password.'); // Generic error
    }
    setIsLoading(false);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
