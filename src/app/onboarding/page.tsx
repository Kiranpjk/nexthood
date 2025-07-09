'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Welcome!',
      description: 'Your setup is complete. You are being redirected to the home page.',
    });
    router.push('/');
  };
  
  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Welcome to NeighborWise, {user.displayName || 'friend'}!</CardTitle>
            <CardDescription>To help us find your perfect neighborhood, tell us what you're looking for. You can always change this later.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="preferences">Your lifestyle preferences</Label>
                <Textarea
                  id="preferences"
                  placeholder="e.g., quiet, family-friendly with parks, or a vibrant area with nightlife and cafes..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                Complete Setup & Go to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
