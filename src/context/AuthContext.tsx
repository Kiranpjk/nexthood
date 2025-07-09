'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { Separator } from '@/components/ui/separator';

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
           <Card className="max-w-3xl w-full shadow-lg">
              <CardHeader>
                <div className="mx-auto pb-4"><Logo /></div>
                <CardTitle className="text-2xl font-headline">Complete Your Firebase Setup</CardTitle>
                <CardDescription>
                  Authentication is not fully configured. Follow these steps in the Firebase Console and in your code.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm text-left">
                
                {/* Step 1: Enable Authentication */}
                <div>
                  <h3 className="font-bold text-lg mb-2">Step 1: Enable Authentication Methods</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Open your project in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Firebase Console</a>.</li>
                      <li>In the left-hand menu, go to <span className="font-semibold text-foreground">Build &gt; Authentication</span>.</li>
                      <li>Click the <span className="font-semibold text-foreground">"Get started"</span> button if it's your first time.</li>
                      <li>Go to the <span className="font-semibold text-foreground">"Sign-in method"</span> tab.</li>
                      <li>Click on <span className="font-semibold text-foreground">"Google"</span> in the list of providers.</li>
                      <li>Enable the toggle switch, provide a project support email, and click <span className="font-semibold text-foreground">Save</span>.</li>
                  </ol>
                </div>

                <Separator />

                {/* Step 2: Get Web App Credentials */}
                <div>
                  <h3 className="font-bold text-lg mb-2">Step 2: Get Web App Credentials</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>In your Firebase Console, go to <span className="font-semibold text-foreground">Project settings</span> (click the gear icon <code className="bg-muted px-1 py-0.5 rounded text-foreground">⚙️</code>).</li>
                      <li>Under the "General" tab, scroll to <span className="font-semibold text-foreground">"Your apps"</span>.</li>
                      <li>If you don't have a web app, click the Web icon (<code className="bg-muted px-1 py-0.5 rounded text-foreground">&lt;/&gt;</code>) to create one.</li>
                      <li>In the app settings, find the <code className="bg-muted px-1 py-0.5 rounded text-foreground">firebaseConfig</code> object and copy the values.</li>
                  </ol>
                </div>
                
                <Separator />

                {/* Step 3: Update .env file */}
                <div>
                   <h3 className="font-bold text-lg mb-2">Step 3: Update Your <code className="bg-card px-1 py-0.5 rounded text-foreground">.env</code> File</h3>
                   <p className="text-muted-foreground mb-2">Paste the credentials you copied into the <code className="bg-card px-1 py-0.5 rounded text-foreground">.env</code> file at the root of this project. Ensure all variables are set.</p>
                   <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto text-muted-foreground">
{`NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"`}
                   </pre>
                   <p className="text-muted-foreground mt-2">
                    <span className="font-bold text-destructive">Important:</span> You must restart your development server after updating the <code className="bg-card px-1 py-0.5 rounded text-foreground">.env</code> file for the changes to apply.
                   </p>
                </div>

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
