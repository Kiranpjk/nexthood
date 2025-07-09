'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { AMENITIES } from '@/lib/neighborhood-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  movingWith: z.enum(['just-me', 'partner', 'family', 'roommates'], {
    required_error: 'Please select an option.',
  }),
  vibe: z.enum(['quiet', 'bustling', 'family-friendly', 'upscale'], {
    required_error: 'Please select your ideal vibe.',
  }),
  walkability: z.number().min(0).max(100).default(50),
  rent: z.number().min(10000).max(100000).default(40000),
  amenities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one amenity.',
  }),
  other: z.string().optional(),
});

export default function OnboardingForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walkability: 50,
      rent: 40000,
      amenities: [],
      other: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this data would be saved to a database against the user's profile.
    console.log(values);
    
    toast({
      title: 'Welcome!',
      description: 'Your setup is complete. You are being redirected to the home page.',
    });
    router.push('/');
  };
  
  return (
      <Card className="w-full max-w-3xl shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <CardHeader>
            <CardTitle className="text-3xl font-headline">Welcome to NextHood, {user?.displayName || 'friend'}!</CardTitle>
            <CardDescription>To help us find your perfect neighborhood, please answer a few questions. You can always change this later.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Question 1: Moving with */}
                    <FormField
                        control={form.control}
                        name="movingWith"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-semibold">Who are you moving with?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col sm:flex-row gap-4"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="just-me" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Just me</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="partner" />
                                            </FormControl>
                                            <FormLabel className="font-normal">With a partner</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="family" />
                                            </FormControl>
                                            <FormLabel className="font-normal">With family</FormLabel>
                                        </FormItem>
                                         <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="roommates" />
                                            </FormControl>
                                            <FormLabel className="font-normal">With roommates</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Question 2: Vibe */}
                    <FormField
                        control={form.control}
                        name="vibe"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-semibold">What's your ideal neighborhood vibe?</FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                    >
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="quiet" id="quiet" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="quiet" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                                Quiet & Peaceful
                                            </Label>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="bustling" id="bustling" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="bustling" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                                Vibrant & Bustling
                                            </Label>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="family-friendly" id="family-friendly" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="family-friendly" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                                Family-Friendly
                                            </Label>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="upscale" id="upscale" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="upscale" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                                Modern & Upscale
                                            </Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Question 3: Walkability */}
                    <FormField
                        control={form.control}
                        name="walkability"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">How important is walkability?</FormLabel>
                                 <FormDescription>
                                    (0 = Car is a must, 100 = I want to walk everywhere!)
                                </FormDescription>
                                <FormControl>
                                    <Slider
                                        onValueChange={(value) => field.onChange(value[0])}
                                        value={[field.value]}
                                        min={0}
                                        max={100}
                                        step={10}
                                        className="py-4"
                                    />
                                </FormControl>
                                <div className="text-center font-bold text-primary">{field.value}</div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Question 4: Rent */}
                    <FormField
                        control={form.control}
                        name="rent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">What's your maximum monthly rent budget?</FormLabel>
                                <FormControl>
                                     <Slider
                                        onValueChange={(value) => field.onChange(value[0])}
                                        value={[field.value]}
                                        min={10000}
                                        max={100000}
                                        step={5000}
                                        className="py-4"
                                    />
                                </FormControl>
                                 <div className="text-center font-bold text-primary">₹{field.value.toLocaleString()}</div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    {/* Question 5: Amenities */}
                    <FormField
                        control={form.control}
                        name="amenities"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-lg font-semibold">Which amenities are must-haves for you?</FormLabel>
                                    <FormDescription>Select all that apply.</FormDescription>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {AMENITIES.map((item) => (
                                        <FormField
                                            key={item}
                                            control={form.control}
                                            name="amenities"
                                            render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                            ? field.onChange([...field.value, item])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                    (value) => value !== item
                                                                )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">{item}</FormLabel>
                                                </FormItem>
                                            )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Question 6: Other */}
                    <FormField
                        control={form.control}
                        name="other"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Anything else we should know?</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="e.g., I need a pet-friendly area, prefer a furnished place, or have specific commute requirements..."
                                    rows={4}
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Complete Setup & Find My Neighborhood
                    </Button>
                </form>
            </Form>
        </CardContent>
      </Card>
  );
}
