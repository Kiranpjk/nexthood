'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/ui/logo';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only subscribe to auth state changes if Firebase is configured
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // If not configured, we're not loading anymore.
      setLoading(false);
    }
  }, []);

  if (!isFirebaseConfigured) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4 text-center">
           <Card className="max-w-2xl w-full shadow-lg">
              <CardHeader>
                <div className="mx-auto pb-4"><Logo /></div>
                <CardTitle className="text-2xl font-headline">Firebase Not Configured</CardTitle>
                <CardDescription>
                  Your Firebase credentials are not set up correctly. Please follow the instructions below to configure your project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-left">
                <p className="font-semibold">To get your Firebase credentials:</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Firebase Console</a>.</li>
                    <li>Create a new project or select an existing one.</li>
                    <li>Go to Project Settings (click the gear icon), and under the "General" tab, scroll to "Your apps".</li>
                    <li>Click the Web icon (<code>&lt;/&gt;</code>) to register a new web app if you haven't already.</li>
                    <li>Find and copy the `firebaseConfig` object values into your <code className="bg-muted px-1 py-0.5 rounded text-foreground">.env</code> file at the root of your project.</li>
                    <li><strong>Important:</strong> You must restart your development server after updating the <code className="bg-muted px-1 py-0.5 rounded text-foreground">.env</code> file.</li>
                </ol>
                 <p className="font-semibold pt-2">Your <code className="bg-muted px-1 py-0.5 rounded text-foreground">.env</code> file should look like this:</p>
                 <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto text-muted-foreground">
{`NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"`}
                </pre>
              </CardContent>
            </Card>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
