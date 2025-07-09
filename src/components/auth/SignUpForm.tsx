'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import GoogleIcon from '../icons/GoogleIcon';
import { Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit mobile number.' }),
});

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      mobileNumber: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: values.username,
        });
      }
      // New user signup always goes to onboarding
      router.push('/onboarding');
    } catch (error: any) {
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const additionalInfo = getAdditionalUserInfo(result);
      
      if (additionalInfo?.isNewUser) {
        router.push('/onboarding');
      } else {
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath || '/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Google Sign-In Failed',
        description: error.message || 'Could not sign in with Google.',
        variant: 'destructive',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join NextHood to find your community</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
           {isGoogleLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <GoogleIcon className="mr-2 h-5 w-5" />}
          Sign up with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="username">Username</Label>
                  <FormControl>
                    <Input id="username" placeholder="Your Username" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input id="email" type="email" placeholder="m@example.com" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <FormControl>
                    <Input id="mobileNumber" placeholder="10-digit mobile number" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
               {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button variant="link" asChild className="p-0">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
