'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signUp, isLoading, error: authError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Clear previous form-specific errors

    if (isSignUp) {
      if (!username.trim()) {
        setFormError('Username cannot be empty.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters long.');
        return;
      }
      await signUp(username, password);
    } else {
      if (!username.trim()) {
        setFormError('Username cannot be empty.');
        return;
      }
      await login(username, password);
    }
  };

  const totalError = formError || authError;

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-primary">
          {isSignUp ? 'Create Account' : 'Tennis Duel'}
        </CardTitle>
        <CardDescription>
          {isSignUp ? 'Join the court!' : 'Sign in to continue'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-input"
              aria-invalid={!!totalError && username === ''}
              aria-describedby={totalError && username === '' ? "error-message" : undefined}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input"
              aria-invalid={!!totalError && (isSignUp ? password.length < 6 : false)}
              aria-describedby={totalError && (isSignUp ? password.length < 6 : false) ? "error-message" : undefined}
            />
          </div>
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-input"
                aria-invalid={!!formError && formError.includes("Passwords do not match")}
                aria-describedby={formError && formError.includes("Passwords do not match") ? "error-message" : undefined}
              />
            </div>
          )}
          {totalError && (
            <Alert variant="destructive" id="error-message">
              <Info className="h-4 w-4" />
              <AlertTitle>{formError ? 'Validation Error' : 'Action Failed'}</AlertTitle>
              <AlertDescription>{totalError}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner size={20} />
            ) : isSignUp ? (
              <UserPlus className="mr-2 h-5 w-5" />
            ) : (
              <LogIn className="mr-2 h-5 w-5" />
            )}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>
        <Button
          variant="link"
          className="mt-4 w-full"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setFormError(null); // Clear errors when switching modes
            // auth.error is not cleared here as it comes from the provider
          }}
          disabled={isLoading}
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Create One"}
        </Button>
      </CardContent>
    </Card>
  );
}
