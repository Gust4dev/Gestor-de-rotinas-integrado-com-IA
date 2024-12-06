import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: Array<{
    date: string;
    productivity: number;
  }>;
}

export function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="productivity"
          stroke="#5C6DED"
          strokeWidth={2}
          dot={{ fill: '#5C6DED', strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}