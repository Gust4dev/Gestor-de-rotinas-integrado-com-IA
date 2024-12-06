import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: Array<{
    date: string;
    completed: number;
    cancelled: number;
  }>;
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis 
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: 'none' }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: 'none' }}
          axisLine={{ stroke: 'none' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Bar 
          dataKey="completed" 
          fill="#5CC9ED" 
          name="Completed"
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey="cancelled" 
          fill="#7A5CED" 
          name="Cancelled"
          radius={[4, 4, 0, 0]} 
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}