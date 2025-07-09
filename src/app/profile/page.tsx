
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateAvatarAction } from '@/actions/generateAvatar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';


const profileSchema = z.object({
    displayName: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
});


export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: {
        displayName: user?.displayName || '',
    }
  });


  React.useEffect(() => {
    if (!loading && !user) {
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    }
    if (user) {
        form.reset({ displayName: user.displayName || '' });
    }
  }, [user, loading, router, form, pathname]);
  
  const handleGenerateAvatar = async () => {
    if (!user) return;
    setIsGenerating(true);
    try {
        const imageDataUri = await generateAvatarAction();
        await updateProfile(user, { photoURL: imageDataUri });
        toast({
            title: 'Avatar Generated!',
            description: 'Your new AI-powered avatar has been set.',
        });
        await auth.currentUser?.reload();
        router.refresh(); 
    } catch (error: any) {
        toast({
            title: 'Avatar Generation Failed',
            description: error.message,
            variant: 'destructive',
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    setIsSaving(true);
    try {
        await updateProfile(user, { displayName: values.displayName });
        toast({
            title: 'Profile Updated',
            description: 'Your profile information has been saved.',
        });
        router.refresh();
    } catch (error: any) {
        toast({
            title: 'Update Failed',
            description: error.message,
            variant: 'destructive'
        });
    } finally {
        setIsSaving(false);
    }
  };


  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
             <div className="relative w-24 h-24 mx-auto mb-4 group">
                 <Avatar className="w-24 h-24 text-4xl">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                 <Button 
                    onClick={handleGenerateAvatar}
                    disabled={isGenerating}
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 group-hover:opacity-100 opacity-70 transition-opacity"
                 >
                    {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    <span className="sr-only">Generate AI Avatar</span>
                </Button>
            </div>
           
            <CardTitle className="text-3xl font-headline">{form.watch('displayName') || 'User Profile'}</CardTitle>
            <CardDescription>View and manage your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="displayName">Username</Label>
                                <FormControl>
                                    <Input id="displayName" placeholder="Your username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={user.email || 'N/A'} readOnly disabled />
                    </div>
                    <Button type="submit" disabled={isSaving} className="w-full">
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
