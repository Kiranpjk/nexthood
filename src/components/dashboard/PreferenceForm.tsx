'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
    <section className="rounded-2xl bg-secondary p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div>
          <h1 className="text-title font-bold">Describe the life you want to move into</h1>
          <p className="mt-4 leading-relaxed text-foreground/80">
            Be specific. &ldquo;Quiet street, a park for morning runs, cafes I can walk to, under ₹40,000&rdquo; works far better than &ldquo;nice area&rdquo;.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Lifestyle preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Parks, good schools, quiet streets, a short metro ride to work..."
                      rows={4}
                      className="bg-card text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? 'Scoring neighborhoods...' : 'Score neighborhoods'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
