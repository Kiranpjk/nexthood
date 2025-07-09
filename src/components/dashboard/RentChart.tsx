'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { EvaluatedNeighborhood } from '@/lib/types';
import { ChartTooltipContent, ChartContainer, ChartConfig } from '@/components/ui/chart';

interface RentChartProps {
  neighborhoods: EvaluatedNeighborhood[];
}

const chartConfig = {
  avgRent: {
    label: "Avg. Rent (₹)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


export default function RentChart({ neighborhoods }: RentChartProps) {
  const chartData = neighborhoods.map(n => ({
    name: n.name,
    avgRent: n.avgRent,
  })).sort((a, b) => a.avgRent - b.avgRent);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Neighborhood Rent Comparison</CardTitle>
        <CardDescription>A quick overview of average monthly rents across different areas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                        tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        content={<ChartTooltipContent 
                            formatter={(value) => `₹${Number(value).toLocaleString()}`}
                            indicator="dot"
                        />}
                    />
                    <Bar dataKey="avgRent" fill="var(--color-avgRent)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
