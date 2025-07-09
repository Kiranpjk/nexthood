'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  preferences: z.string().min(10, 'Please describe your preferences in a bit more detail.'),
});

interface PreferenceFormProps {
  onSubmit: (preferences: string) => void;
  isLoading: boolean;
}

export default function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: '',
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.preferences);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Describe Your Ideal Lifestyle</CardTitle>
        <CardDescription>
          Tell us what you're looking for in a neighborhood. Be descriptive for the best results!
          <br />
          For example: "I'm looking for a quiet, family-friendly area with lots of parks and good cafes. Walkability is a huge plus."
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Lifestyle Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., access to parks, good schools, vibrant nightlife, quiet streets..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Evaluating...' : 'Find My Match'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
