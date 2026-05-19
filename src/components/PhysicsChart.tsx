import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';

interface ChartDataPoint {
  name?: string;
  [key: string]: string | number | undefined;
}

interface PhysicsChartProps {
  type: 'line' | 'bar' | 'scatter';
  data: ChartDataPoint[];
  xKey: string;
  yKeys: string[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  colors?: string[];
}

const defaultColors = ['#7c5cff', '#1fd2b2', '#ff7a59', '#ffd166'];

export function PhysicsChart({
  type,
  data,
  xKey,
  yKeys,
  title,
  xLabel,
  yLabel,
  colors = defaultColors,
}: Readonly<PhysicsChartProps>) {
  const chartConfig = {
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
    height: 300,
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} label={{ value: xLabel || xKey, position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: yLabel || yKeys[0], angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {yKeys.map((key, idx) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[idx % colors.length]} dot={{ r: 4 }} />
            ))}
          </LineChart>
        );

      case 'scatter':
        return (
          <ScatterChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} label={{ value: xLabel || xKey, position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: yLabel || yKeys[0], angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {yKeys.map((key, idx) => (
              <Scatter key={key} dataKey={key} fill={colors[idx % colors.length]} />
            ))}
          </ScatterChart>
        );

      case 'bar':
      default:
        return (
          <BarChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} label={{ value: xLabel || xKey, position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: yLabel || yKeys[0], angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {yKeys.map((key, idx) => (
              <Bar key={key} dataKey={key} fill={colors[idx % colors.length]} />
            ))}
          </BarChart>
        );
    }
  };

  return (
    <div className="physics-chart">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={chartConfig.height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
