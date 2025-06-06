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
    if (username) { // In a real app, validate username and password against stored credentials
      // For this mock, we assume if a user is stored, login is successful with any password
      // If no user is stored, or username doesn't match, this login would typically fail.
      // However, our current setup means any username "logs in" or creates a new profile.
      const userData: User = { username };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      router.push('/dashboard');
    } else {
      setError('Invalid username or password.'); // Generic error
    }
    setIsLoading(false);
  }, [router]);

  const signUp = useCallback(async (username: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call for sign up
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!username.trim()) {
      setError('Username is required.');
      setIsLoading(false);
      return;
    }
    // Basic password policy example (in a real app, this would be more robust)
    if (password && password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
    }
    // In a real app, you'd check if the username is already taken.
    // For this mock, we'll overwrite/create a new user.
    const userData: User = { username }; // Password isn't stored/used in this mock user object for auth
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
    setIsLoading(false);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
