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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AMENITIES } from '@/lib/neighborhood-data';
import { Check } from 'lucide-react';
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

// Choice cards: the radio stays a real (visually hidden) Radix radio, so arrow keys and Tab work;
// the label reacts to its focus and checked state through the `peer` sibling selector.
const choiceCard =
  'flex h-full cursor-pointer flex-col gap-1 rounded-lg border border-input bg-card p-4 pr-10 text-sm font-medium text-foreground transition-colors hover:border-primary/60 ' +
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring ' +
  'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary';
const choiceTick =
  'pointer-events-none absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border border-input bg-card text-transparent transition-colors ' +
  'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground';

const MOVING_WITH = [
  { value: 'just-me', label: 'Just me' },
  { value: 'partner', label: 'With a partner' },
  { value: 'family', label: 'With family' },
  { value: 'roommates', label: 'With roommates' },
] as const;

const VIBES = [
  { value: 'quiet', label: 'Quiet & peaceful', hint: 'Tree-lined lanes, early nights' },
  { value: 'bustling', label: 'Vibrant & bustling', hint: 'Cafes, markets, late evenings' },
  { value: 'family-friendly', label: 'Family-friendly', hint: 'Schools, parks, room to grow' },
  { value: 'upscale', label: 'Modern & upscale', hint: 'New builds, gyms, good services' },
] as const;

const questionLabel = 'font-headline text-title-sm font-semibold text-primary';
const step = (n: number) => (
  <span className="mb-2 block font-headline text-sm font-bold tabular-nums text-muted-foreground" aria-hidden="true">
    {String(n).padStart(2, '0')} / 06
  </span>
);

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
    <div className="w-full max-w-3xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-500">
      <header className="mb-10">
        <h1 className="text-title font-bold">Welcome, {user?.displayName || 'friend'}. Tell us how you live.</h1>
        <p className="mt-3 max-w-xl text-lead text-muted-foreground">
          Six quick questions shape every match score you see. You can change any answer later.
        </p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="divide-y rounded-2xl border bg-card px-6 shadow-sm md:px-10">
          {/* Question 1: Moving with */}
          <FormField
            control={form.control}
            name="movingWith"
            render={({ field }) => (
              <FormItem className="space-y-4 py-8">
                {step(1)}
                <FormLabel className={questionLabel}>Who are you moving with?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-3 md:grid-cols-4"
                  >
                    {MOVING_WITH.map((o) => (
                      <FormItem key={o.value} className="relative space-y-0">
                        <FormControl>
                          <RadioGroupItem value={o.value} className="peer sr-only" />
                        </FormControl>
                        <FormLabel className={choiceCard}>{o.label}</FormLabel>
                        <span className={choiceTick} aria-hidden="true"><Check className="h-3 w-3" strokeWidth={3} /></span>
                      </FormItem>
                    ))}
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
              <FormItem className="space-y-4 py-8">
                {step(2)}
                <FormLabel className={questionLabel}>What should the neighborhood feel like?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    {VIBES.map((v) => (
                      <FormItem key={v.value} className="relative space-y-0">
                        <FormControl>
                          <RadioGroupItem value={v.value} id={v.value} className="peer sr-only" />
                        </FormControl>
                        <Label htmlFor={v.value} className={choiceCard}>
                          <span className="text-base font-semibold">{v.label}</span>
                          <span className="font-normal text-muted-foreground">{v.hint}</span>
                        </Label>
                        <span className={choiceTick} aria-hidden="true"><Check className="h-3 w-3" strokeWidth={3} /></span>
                      </FormItem>
                    ))}
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
              <FormItem className="space-y-4 py-8">
                {step(3)}
                <div className="flex items-baseline justify-between gap-4">
                  <FormLabel className={questionLabel}>How much do you want to walk?</FormLabel>
                  <span className="font-headline text-title-sm font-bold tabular-nums text-primary">{field.value}</span>
                </div>
                <FormDescription>0 means a car is a must, 100 means you want to walk everywhere.</FormDescription>
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Question 4: Rent */}
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem className="space-y-4 py-8">
                {step(4)}
                <div className="flex items-baseline justify-between gap-4">
                  <FormLabel className={questionLabel}>Maximum monthly rent</FormLabel>
                  <span className="font-headline text-title-sm font-bold tabular-nums text-primary">₹{field.value.toLocaleString('en-IN')}</span>
                </div>
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Question 5: Amenities */}
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem className="py-8">
                {step(5)}
                <div className="mb-4">
                  <FormLabel className={questionLabel}>Which amenities are must-haves?</FormLabel>
                  <FormDescription className="mt-1">Select all that apply.</FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {AMENITIES.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-input px-3 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
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
                            <FormLabel className="flex-1 cursor-pointer font-medium capitalize">{item}</FormLabel>
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
              <FormItem className="space-y-4 py-8">
                {step(6)}
                <FormLabel className={questionLabel}>Anything else we should know?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A pet-friendly building, a furnished flat, a commute to Whitefield..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="py-8">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Finish setup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
