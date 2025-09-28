// Time Series Monitoring Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Leaf, 
  BarChart3,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';
import { satelliteService } from '@/services/satelliteService';

interface TimeSeriesMonitorProps {
  coordinates: { lat: number; lng: number };
  startDate: string;
  endDate: string;
  projectName?: string;
}

type TimeInterval = 'monthly' | 'quarterly' | 'yearly';
type MetricType = 'ndvi' | 'evi' | 'area';

interface TimeSeriesData {
  date: string;
  ndvi: number;
  evi: number;
  area: number;
  formattedDate: string;
}

export const TimeSeriesMonitor: React.FC<TimeSeriesMonitorProps> = ({
  coordinates,
  startDate,
  endDate,
  projectName = 'Mangrove Restoration Project'
}) => {
  const [data, setData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState<TimeInterval>('monthly');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('ndvi');
  const [trend, setTrend] = useState<'improving' | 'stable' | 'declining'>('stable');

  useEffect(() => {
    loadTimeSeriesData();
  }, [coordinates, startDate, endDate, interval]);

  const loadTimeSeriesData = async () => {
    setLoading(true);
    try {
      const rawData = await satelliteService.getTimeSeriesAnalysis(
        coordinates,
        startDate,
        endDate,
        interval
      );

      // Format data for charts
      const formattedData: TimeSeriesData[] = rawData.map(item => ({
        ...item,
        formattedDate: new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit'
        })
      }));

      setData(formattedData);
      
      // Calculate trend
      if (formattedData.length >= 2) {
        const firstValue = formattedData[0][selectedMetric];
        const lastValue = formattedData[formattedData.length - 1][selectedMetric];
        const change = ((lastValue - firstValue) / firstValue) * 100;
        
        if (change > 10) setTrend('improving');
        else if (change < -10) setTrend('declining');
        else setTrend('stable');
      }
    } catch (error) {
      console.error('Error loading time series data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMetricConfig = (metric: MetricType) => {
    const configs = {
      ndvi: {
        label: 'NDVI (Vegetation Health)',
        color: '#22c55e',
        unit: '',
        description: 'Normalized Difference Vegetation Index',
        range: [0, 1]
      },
      evi: {
        label: 'EVI (Enhanced Vegetation)',
        color: '#3b82f6',
        unit: '',
        description: 'Enhanced Vegetation Index',
        range: [0, 1]
      },
      area: {
        label: 'Coverage Area',
        color: '#f59e0b',
        unit: '%',
        description: 'Vegetation Coverage Percentage',
        range: [0, 100]
      }
    };
    return configs[metric];
  };

  const getTrendIcon = (trendType: typeof trend) => {
    switch (trendType) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trendType: typeof trend) => {
    switch (trendType) {
      case 'improving':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declining':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateGrowthRate = () => {
    if (data.length < 2) return 0;
    const firstValue = data[0][selectedMetric];
    const lastValue = data[data.length - 1][selectedMetric];
    return ((lastValue - firstValue) / firstValue * 100);
  };

  const calculateAverageValue = () => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + item[selectedMetric], 0);
    return sum / data.length;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 animate-pulse text-blue-600" />
            <span>Loading Time Series Data...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
            <div className="text-center text-muted-foreground">
              Analyzing historical satellite data...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const metricConfig = getMetricConfig(selectedMetric);

  return (
    <div className="space-y-6">
      {/* Controls and Summary */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Restoration Progress Monitoring</span>
            </CardTitle>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as MetricType)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ndvi">NDVI (Vegetation Health)</SelectItem>
                  <SelectItem value="evi">EVI (Enhanced Vegetation)</SelectItem>
                  <SelectItem value="area">Coverage Area</SelectItem>
                </SelectContent>
              </Select>

              <Select value={interval} onValueChange={(value) => setInterval(value as TimeInterval)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {calculateAverageValue().toFixed(3)}{metricConfig.unit}
              </div>
              <div className="text-sm text-blue-600">Average {metricConfig.label}</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700 flex items-center justify-center gap-1">
                {calculateGrowthRate() > 0 ? '+' : ''}{calculateGrowthRate().toFixed(1)}%
                {getTrendIcon(trend)}
              </div>
              <div className="text-sm text-green-600">Growth Rate</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">
                {data.length}
              </div>
              <div className="text-sm text-purple-600">Data Points</div>
            </div>
          </div>

          {/* Trend Badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className={`flex items-center space-x-2 px-4 py-2 ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
              <span className="font-medium capitalize">{trend} Trend</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" style={{ color: metricConfig.color }} />
              <span>{metricConfig.label} Over Time</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadTimeSeriesData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={metricConfig.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={metricConfig.range}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  tickFormatter={(value) => `${value}${metricConfig.unit}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number) => [
                    `${value.toFixed(3)}${metricConfig.unit}`, 
                    metricConfig.label
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={metricConfig.color}
                  strokeWidth={2}
                  fill={`url(#gradient-${selectedMetric})`}
                  dot={{
                    fill: metricConfig.color,
                    strokeWidth: 2,
                    r: 4
                  }}
                  activeDot={{
                    r: 6,
                    fill: metricConfig.color,
                    strokeWidth: 2,
                    stroke: 'white'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            {metricConfig.description} • Data from {startDate} to {endDate}
          </div>
        </CardContent>
      </Card>

      {/* Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trend === 'improving' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Positive Growth Detected:</strong> The restoration project shows consistent improvement 
                  with a {calculateGrowthRate().toFixed(1)}% increase in {metricConfig.label.toLowerCase()}. 
                  This indicates successful vegetation establishment and healthy ecosystem recovery.
                </p>
              </div>
            )}
            
            {trend === 'declining' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  <strong>Declining Trend:</strong> The data shows a {Math.abs(calculateGrowthRate()).toFixed(1)}% 
                  decrease in {metricConfig.label.toLowerCase()}. Consider investigating potential causes such as 
                  disease, climate stress, or human interference.
                </p>
              </div>
            )}
            
            {trend === 'stable' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Stable Performance:</strong> The {metricConfig.label.toLowerCase()} remains relatively 
                  stable over the monitoring period. This could indicate mature vegetation or seasonal variations. 
                  Continue monitoring for long-term trends.
                </p>
              </div>
            )}
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 text-sm">
                <strong>Monitoring Recommendation:</strong> Continue {interval} monitoring to track seasonal 
                variations and long-term ecosystem health. Consider increasing monitoring frequency during 
                critical growth periods.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};