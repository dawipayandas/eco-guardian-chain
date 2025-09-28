// Satellite Data Service - Google Earth Engine Integration
// This service integrates with satellite imagery APIs for mangrove restoration verification

import axios from 'axios';

export interface SatelliteImagery {
  id: string;
  date: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  imageUrl: string;
  thumbnailUrl: string;
  cloudCover: number;
  resolution: number; // in meters
  source: 'SENTINEL2' | 'LANDSAT8' | 'PLANET';
}

export interface VegetationIndices {
  ndvi: number; // Normalized Difference Vegetation Index (-1 to 1)
  evi: number;  // Enhanced Vegetation Index (-1 to 1)
  savi: number; // Soil Adjusted Vegetation Index
  gndvi: number; // Green Normalized Difference Vegetation Index
  timestamp: string;
  confidence: number;
}

export interface MangroveAnalysis {
  mangroveArea: number; // in hectares
  canopyDensity: number; // percentage
  healthScore: number; // 0-100
  changeDetection: {
    areaChange: number; // percentage change
    densityChange: number;
    timeframe: string;
  };
  vegetationIndices: VegetationIndices;
  carbonSequestrationEstimate: number; // tons CO2/year
}

export interface SatelliteAnalysisResult {
  projectId: string;
  location: {
    lat: number;
    lng: number;
    radius: number; // in meters
  };
  beforeImage: SatelliteImagery;
  afterImage: SatelliteImagery;
  analysis: MangroveAnalysis;
  verificationScore: number; // 0-100
  recommendations: string[];
  generatedAt: string;
}

class SatelliteService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // In production, these would come from environment variables
    this.apiKey = process.env.VITE_GOOGLE_EARTH_ENGINE_API_KEY || 'demo-key';
    this.baseUrl = 'https://earthengine.googleapis.com/v1alpha';
  }

  /**
   * Fetch satellite imagery for a specific location and date range
   */
  async getSatelliteImagery(
    coordinates: { lat: number; lng: number },
    startDate: string,
    endDate: string,
    resolution: number = 10
  ): Promise<SatelliteImagery[]> {
    try {
      // In a real implementation, this would call Google Earth Engine API
      // For now, we'll simulate the response with realistic data
      
      const mockImagery: SatelliteImagery[] = [
        {
          id: `sentinel2_${Date.now()}`,
          date: startDate,
          coordinates,
          bounds: {
            north: coordinates.lat + 0.01,
            south: coordinates.lat - 0.01,
            east: coordinates.lng + 0.01,
            west: coordinates.lng - 0.01,
          },
          imageUrl: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/${Math.random().toString(36)}/tiles/{z}/{x}/{y}`,
          thumbnailUrl: '/src/assets/satellite-mangrove.jpg',
          cloudCover: Math.random() * 20, // 0-20% cloud cover
          resolution,
          source: 'SENTINEL2'
        }
      ];

      return mockImagery;
    } catch (error) {
      console.error('Error fetching satellite imagery:', error);
      throw new Error('Failed to fetch satellite imagery');
    }
  }

  /**
   * Calculate vegetation indices from satellite data
   */
  async calculateVegetationIndices(
    coordinates: { lat: number; lng: number },
    date: string
  ): Promise<VegetationIndices> {
    try {
      // Simulate vegetation index calculation
      // In real implementation, this would use Google Earth Engine's algorithms
      
      const baseNDVI = 0.3 + (Math.random() * 0.5); // Mangroves typically have NDVI 0.3-0.8
      const baseEVI = baseNDVI * 0.8; // EVI is typically lower than NDVI
      
      return {
        ndvi: Math.round(baseNDVI * 1000) / 1000,
        evi: Math.round(baseEVI * 1000) / 1000,
        savi: Math.round((baseNDVI * 0.9) * 1000) / 1000,
        gndvi: Math.round((baseNDVI * 1.1) * 1000) / 1000,
        timestamp: date,
        confidence: 0.85 + (Math.random() * 0.15) // 85-100% confidence
      };
    } catch (error) {
      console.error('Error calculating vegetation indices:', error);
      throw new Error('Failed to calculate vegetation indices');
    }
  }

  /**
   * Perform comprehensive mangrove analysis
   */
  async analyzeMangroveRestoration(
    coordinates: { lat: number; lng: number },
    beforeDate: string,
    afterDate: string,
    projectArea: number // in hectares
  ): Promise<SatelliteAnalysisResult> {
    try {
      // Fetch before and after imagery
      const beforeImagery = await this.getSatelliteImagery(coordinates, beforeDate, beforeDate);
      const afterImagery = await this.getSatelliteImagery(coordinates, afterDate, afterDate);

      // Calculate vegetation indices for both periods
      const beforeIndices = await this.calculateVegetationIndices(coordinates, beforeDate);
      const afterIndices = await this.calculateVegetationIndices(coordinates, afterDate);

      // Simulate mangrove analysis
      const ndviImprovement = afterIndices.ndvi - beforeIndices.ndvi;
      const healthScore = Math.min(100, Math.max(0, (afterIndices.ndvi * 100) + (ndviImprovement * 50)));
      
      const analysis: MangroveAnalysis = {
        mangroveArea: projectArea * (0.7 + (afterIndices.ndvi * 0.3)), // Estimated coverage
        canopyDensity: Math.round(afterIndices.ndvi * 100),
        healthScore: Math.round(healthScore),
        changeDetection: {
          areaChange: Math.round(ndviImprovement * 100),
          densityChange: Math.round((afterIndices.ndvi - beforeIndices.ndvi) * 100),
          timeframe: `${beforeDate} to ${afterDate}`
        },
        vegetationIndices: afterIndices,
        carbonSequestrationEstimate: projectArea * afterIndices.ndvi * 25 // Rough estimate: 25 tons CO2/hectare/year for healthy mangroves
      };

      // Calculate verification score based on multiple factors
      const verificationScore = Math.round(
        (afterIndices.ndvi * 40) +           // 40% weight on current vegetation health
        (Math.max(0, ndviImprovement) * 30) + // 30% weight on improvement
        (afterIndices.confidence * 20) +      // 20% weight on data confidence
        (Math.max(0, 1 - (beforeImagery[0]?.cloudCover || 0) / 100) * 10) // 10% weight on image quality
      ) * 100;

      // Generate recommendations based on analysis
      const recommendations: string[] = [];
      if (afterIndices.ndvi < 0.4) {
        recommendations.push("Consider additional plantings to increase vegetation density");
      }
      if (ndviImprovement < 0.1) {
        recommendations.push("Monitor growth more frequently and consider soil/water quality assessment");
      }
      if (analysis.canopyDensity > 80) {
        recommendations.push("Excellent vegetation recovery detected - project performing well");
      }

      return {
        projectId: `project_${coordinates.lat}_${coordinates.lng}`,
        location: {
          lat: coordinates.lat,
          lng: coordinates.lng,
          radius: Math.sqrt(projectArea * 10000) // Convert hectares to approximate radius in meters
        },
        beforeImage: beforeImagery[0],
        afterImage: afterImagery[0],
        analysis,
        verificationScore: Math.min(100, Math.max(0, verificationScore)),
        recommendations,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing mangrove restoration:', error);
      throw new Error('Failed to analyze mangrove restoration');
    }
  }

  /**
   * Get time series data for monitoring restoration progress
   */
  async getTimeSeriesAnalysis(
    coordinates: { lat: number; lng: number },
    startDate: string,
    endDate: string,
    interval: 'monthly' | 'quarterly' | 'yearly' = 'monthly'
  ): Promise<Array<{ date: string; ndvi: number; evi: number; area: number }>> {
    try {
      const timePoints: Array<{ date: string; ndvi: number; evi: number; area: number }> = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      let current = new Date(start);
      let baseNDVI = 0.2; // Starting NDVI for restoration project
      
      while (current <= end) {
        // Simulate gradual improvement over time
        const monthsElapsed = (current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30);
        const growthFactor = 1 - Math.exp(-monthsElapsed / 12); // Exponential growth curve
        const currentNDVI = baseNDVI + (0.5 * growthFactor) + (Math.random() * 0.1 - 0.05); // Add some noise
        
        timePoints.push({
          date: current.toISOString().split('T')[0],
          ndvi: Math.round(Math.max(0, Math.min(1, currentNDVI)) * 1000) / 1000,
          evi: Math.round(currentNDVI * 0.8 * 1000) / 1000,
          area: Math.round(currentNDVI * 100 * 10) / 10 // Estimated coverage percentage
        });

        // Move to next interval
        if (interval === 'monthly') {
          current.setMonth(current.getMonth() + 1);
        } else if (interval === 'quarterly') {
          current.setMonth(current.getMonth() + 3);
        } else {
          current.setFullYear(current.getFullYear() + 1);
        }
      }
      
      return timePoints;
    } catch (error) {
      console.error('Error generating time series analysis:', error);
      throw new Error('Failed to generate time series analysis');
    }
  }

  /**
   * Validate coordinates for mangrove habitat suitability
   */
  isValidMangroveLocation(coordinates: { lat: number; lng: number }): boolean {
    // Mangroves typically exist between 30°N and 30°S latitude
    // and in coastal/estuarine areas
    return Math.abs(coordinates.lat) <= 30;
  }

  /**
   * Get recommended planting areas based on satellite analysis
   */
  async getPlantingRecommendations(
    coordinates: { lat: number; lng: number },
    radius: number // in meters
  ): Promise<Array<{ lat: number; lng: number; suitability: number; reason: string }>> {
    // This would use machine learning models in production
    // to analyze soil moisture, elevation, proximity to water, etc.
    
    const recommendations = [];
    const numRecommendations = 5;
    
    for (let i = 0; i < numRecommendations; i++) {
      const offsetLat = (Math.random() - 0.5) * (radius / 111000) * 2; // Convert meters to degrees
      const offsetLng = (Math.random() - 0.5) * (radius / (111000 * Math.cos(coordinates.lat * Math.PI / 180))) * 2;
      
      recommendations.push({
        lat: coordinates.lat + offsetLat,
        lng: coordinates.lng + offsetLng,
        suitability: 0.7 + (Math.random() * 0.3), // 70-100% suitability
        reason: [
          'Optimal soil moisture levels detected',
          'Good proximity to water source', 
          'Low salinity levels favorable for growth',
          'Protected from strong currents',
          'Suitable elevation for mangrove species'
        ][Math.floor(Math.random() * 5)]
      });
    }
    
    return recommendations.sort((a, b) => b.suitability - a.suitability);
  }
}

export const satelliteService = new SatelliteService();