'use client'; // Required for useAuth and useRouter in children or header

import { AppHeader } from '@/components/shared/Header';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (!user) {
     // This case should ideally be caught by the useEffect, but as a fallback
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Redirecting to login...</p> 
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
