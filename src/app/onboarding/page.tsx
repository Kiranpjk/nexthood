'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import { Loader2 } from 'lucide-react';
import OnboardingForm from '@/components/onboarding/OnboardingForm';


export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
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
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <OnboardingForm />
      </main>
    </div>
  );
}
