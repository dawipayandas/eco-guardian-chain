// Satellite Imagery Viewer Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Satellite, 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  MapPin, 
  Calendar,
  Zap,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { satelliteService, SatelliteAnalysisResult, VegetationIndices } from '@/services/satelliteService';

interface SatelliteViewerProps {
  projectId?: string;
  coordinates: { lat: number; lng: number };
  projectArea: number;
  beforeDate: string;
  afterDate: string;
  onAnalysisComplete?: (result: SatelliteAnalysisResult) => void;
}

export const SatelliteViewer: React.FC<SatelliteViewerProps> = ({
  projectId,
  coordinates,
  projectArea,
  beforeDate,
  afterDate,
  onAnalysisComplete
}) => {
  const [analysis, setAnalysis] = useState<SatelliteAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeImageView, setActiveImageView] = useState<'before' | 'after'>('after');

  useEffect(() => {
    handleAnalyzeRestoration();
  }, [coordinates, beforeDate, afterDate]);

  const handleAnalyzeRestoration = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await satelliteService.analyzeMangroveRestoration(
        coordinates,
        beforeDate,
        afterDate,
        projectArea
      );
      
      setAnalysis(result);
      onAnalysisComplete?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getChangeIndicator = (change: number) => {
    if (change > 5) return { icon: TrendingUp, color: 'text-green-600', label: 'Improved' };
    if (change < -5) return { icon: TrendingDown, color: 'text-red-600', label: 'Declined' };
    return { icon: RefreshCw, color: 'text-gray-600', label: 'Stable' };
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="w-5 h-5 animate-pulse text-blue-600" />
            <span>Analyzing Satellite Data...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing satellite imagery</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="text-center text-muted-foreground">
            <p>Fetching high-resolution satellite data...</p>
            <p className="text-xs">This may take a few moments</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Analysis Failed</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={handleAnalyzeRestoration} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Satellite className="w-5 h-5 text-blue-600" />
              <span>Satellite Analysis Results</span>
            </div>
            <Badge 
              variant="outline" 
              className={getHealthColor(analysis.verificationScore)}
            >
              Verification Score: {analysis.verificationScore}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mangrove Area */}
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">
                {analysis.analysis.mangroveArea.toFixed(1)} ha
              </div>
              <div className="text-sm text-green-600">Mangrove Coverage</div>
            </div>

            {/* Health Score */}
            <div className={`text-center p-4 rounded-lg border ${getHealthColor(analysis.analysis.healthScore)}`}>
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {analysis.analysis.healthScore}%
              </div>
              <div className="text-sm">Ecosystem Health</div>
            </div>

            {/* Carbon Sequestration */}
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">
                {analysis.analysis.carbonSequestrationEstimate.toFixed(0)} t
              </div>
              <div className="text-sm text-blue-600">CO₂/Year Potential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Satellite Imagery Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Before & After Satellite Imagery</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeImageView} onValueChange={(value) => setActiveImageView(value as 'before' | 'after')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="before" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Before ({formatDate(analysis.beforeImage.date)})</span>
              </TabsTrigger>
              <TabsTrigger value="after" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>After ({formatDate(analysis.afterImage.date)})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="before" className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                <img
                  src={analysis.beforeImage.thumbnailUrl}
                  alt="Before restoration satellite imagery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {analysis.beforeImage.source} • {analysis.beforeImage.resolution}m resolution
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {analysis.beforeImage.cloudCover.toFixed(1)}% cloud cover
                </div>
              </div>
            </TabsContent>

            <TabsContent value="after" className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                <img
                  src={analysis.afterImage.thumbnailUrl}
                  alt="After restoration satellite imagery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {analysis.afterImage.source} • {analysis.afterImage.resolution}m resolution
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {analysis.afterImage.cloudCover.toFixed(1)}% cloud cover
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Vegetation Indices & Change Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vegetation Indices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span>Vegetation Indices</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VegetationIndexCard 
              label="NDVI (Vegetation Health)" 
              value={analysis.analysis.vegetationIndices.ndvi}
              description="Normalized Difference Vegetation Index"
            />
            <VegetationIndexCard 
              label="EVI (Enhanced Vegetation)" 
              value={analysis.analysis.vegetationIndices.evi}
              description="Enhanced Vegetation Index"
            />
            <VegetationIndexCard 
              label="SAVI (Soil Adjusted)" 
              value={analysis.analysis.vegetationIndices.savi}
              description="Soil Adjusted Vegetation Index"
            />
          </CardContent>
        </Card>

        {/* Change Detection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Change Detection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <ChangeIndicatorCard
                label="Area Coverage"
                change={analysis.analysis.changeDetection.areaChange}
                unit="%"
              />
              <ChangeIndicatorCard
                label="Canopy Density"
                change={analysis.analysis.changeDetection.densityChange}
                unit="%"
              />
              <div className="text-sm text-muted-foreground">
                Analysis period: {analysis.analysis.changeDetection.timeframe}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800 text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleAnalyzeRestoration} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Analysis
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        <Button variant="outline">
          <MapPin className="w-4 h-4 mr-2" />
          View on Map
        </Button>
      </div>
    </div>
  );
};

// Helper Components
const VegetationIndexCard: React.FC<{
  label: string;
  value: number;
  description: string;
}> = ({ label, value, description }) => {
  const getIndexColor = (val: number) => {
    if (val >= 0.6) return 'text-green-600 bg-green-100';
    if (val >= 0.3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="flex justify-between items-center p-3 border rounded-lg">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <div className={`px-3 py-1 rounded-full font-mono text-sm ${getIndexColor(value)}`}>
        {value.toFixed(3)}
      </div>
    </div>
  );
};

const ChangeIndicatorCard: React.FC<{
  label: string;
  change: number;
  unit: string;
}> = ({ label, change, unit }) => {
  const indicator = getChangeIndicator(change);
  const IndicatorIcon = indicator.icon;

  return (
    <div className="flex justify-between items-center p-3 border rounded-lg">
      <div className="font-medium text-sm">{label}</div>
      <div className={`flex items-center space-x-2 ${indicator.color}`}>
        <IndicatorIcon className="w-4 h-4" />
        <span className="font-mono text-sm">
          {change > 0 ? '+' : ''}{change.toFixed(1)}{unit}
        </span>
        <span className="text-xs">{indicator.label}</span>
      </div>
    </div>
  );
};

function getChangeIndicator(change: number) {
  if (change > 5) return { icon: TrendingUp, color: 'text-green-600', label: 'Improved' };
  if (change < -5) return { icon: TrendingDown, color: 'text-red-600', label: 'Declined' };
  return { icon: RefreshCw, color: 'text-gray-600', label: 'Stable' };
}