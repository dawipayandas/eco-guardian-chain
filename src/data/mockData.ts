// Blue Guardian Mock Data

export interface Project {
  id: string;
  title: string;
  description: string;
  ngoName: string;
  location: string;
  area: number; // in hectares
  creditsAvailable: number;
  pricePerCredit: number;
  totalCO2: number;
  status: 'pending' | 'verified' | 'funded';
  image: string;
  progress: number;
  communityJobs: number;
  biodiversityScore: number;
  transactionHash?: string;
  createdAt: Date;
}

export interface CarbonCredit {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  pricePerCredit: number;
  totalPrice: number;
  status: 'active' | 'retired';
  purchaseDate: Date;
  retiredDate?: Date;
  nftTokenId?: string;
}

export interface NGOStats {
  totalAreaRestored: number;
  verifiedCredits: number;
  projectsPending: number;
  totalFunding: number;
}

export interface InvestorStats {
  totalInvested: number;
  creditsOwned: number;
  creditsRetired: number;
  impactProjects: number;
}

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Pichavaram Mangrove Restoration',
    description: 'Large-scale mangrove restoration project in Tamil Nadu, India, focusing on coastal protection and carbon sequestration.',
    ngoName: 'Coastal Conservation Alliance',
    location: 'Tamil Nadu, India',
    area: 75,
    creditsAvailable: 1200,
    pricePerCredit: 22,
    totalCO2: 1800,
    status: 'verified',
    image: '/src/assets/mangrove-project.jpg',
    progress: 85,
    communityJobs: 45,
    biodiversityScore: 92,
    transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Sundarbans Expansion Project',
    description: 'Expanding the world\'s largest mangrove forest to combat climate change and protect coastal communities.',
    ngoName: 'Sundarbans Foundation',
    location: 'West Bengal, India',
    area: 120,
    creditsAvailable: 850,
    pricePerCredit: 28,
    totalCO2: 2400,
    status: 'pending',
    image: '/src/assets/mangrove-project.jpg',
    progress: 45,
    communityJobs: 75,
    biodiversityScore: 96,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    title: 'Maldives Reef Protection Initiative',
    description: 'Combining mangrove restoration with coral reef protection to create comprehensive marine ecosystem restoration.',
    ngoName: 'Maldivian Marine Trust',
    location: 'Maldives',
    area: 35,
    creditsAvailable: 420,
    pricePerCredit: 35,
    totalCO2: 900,
    status: 'funded',
    image: '/src/assets/mangrove-project.jpg',
    progress: 100,
    communityJobs: 25,
    biodiversityScore: 88,
    transactionHash: '0x9f8e7d6c5b4a39281726354849506172839405061',
    createdAt: new Date('2023-11-10'),
  },
];

// Mock NGO Stats
export const mockNGOStats: NGOStats = {
  totalAreaRestored: 230,
  verifiedCredits: 2470,
  projectsPending: 2,
  totalFunding: 125000,
};

// Mock Investor Stats  
export const mockInvestorStats: InvestorStats = {
  totalInvested: 45000,
  creditsOwned: 180,
  creditsRetired: 45,
  impactProjects: 8,
};

// Mock Carbon Credits Portfolio
export const mockCarbonCredits: CarbonCredit[] = [
  {
    id: '1',
    projectId: '1',
    projectTitle: 'Pichavaram Mangrove Restoration',
    amount: 50,
    pricePerCredit: 22,
    totalPrice: 1100,
    status: 'active',
    purchaseDate: new Date('2024-03-15'),
    nftTokenId: 'BGT-001-050',
  },
  {
    id: '2',
    projectId: '3',
    projectTitle: 'Maldives Reef Protection Initiative',
    amount: 25,
    pricePerCredit: 35,
    totalPrice: 875,
    status: 'retired',
    purchaseDate: new Date('2024-02-10'),
    retiredDate: new Date('2024-03-20'),
    nftTokenId: 'BGT-003-025',
  },
  {
    id: '3',
    projectId: '1',
    projectTitle: 'Pichavaram Mangrove Restoration',
    amount: 105,
    pricePerCredit: 22,
    totalPrice: 2310,
    status: 'active',
    purchaseDate: new Date('2024-04-05'),
    nftTokenId: 'BGT-001-105',
  },
];

// Enhanced Verification Steps with Satellite Analysis
export const verificationSteps = [
  {
    id: 1,
    title: '[SATELLITE] Fetching High-Resolution Imagery...',
    description: 'Accessing Sentinel-2 and Landsat data from Google Earth Engine',
    duration: 2500,
    data: { resolution: '10m', cloudCover: '5%', source: 'Sentinel-2' }
  },
  {
    id: 2,
    title: '[AI] Analyzing Vegetation Indices...',
    description: 'Computing NDVI, EVI, and SAVI from multispectral data',
    duration: 3500,
    data: { ndvi: '0.72', evi: '0.58', savi: '0.65' }
  },
  {
    id: 3,
    title: '[AI] Change Detection Analysis...',
    description: 'Comparing before/after imagery for restoration progress',
    duration: 4000,
    data: { areaIncrease: '23%', densityImprovement: '45%' }
  },
  {
    id: 4,
    title: '[AI] Carbon Sequestration Modeling...',
    description: 'Estimating CO₂ absorption based on biomass analysis',
    duration: 3000,
    data: { co2Potential: '150 tons/year', confidence: '87%' }
  },
  {
    id: 5,
    title: '[BLOCKCHAIN] Minting Verified NFT Certificate...',
    description: 'Creating immutable proof-of-restoration on Polygon',
    duration: 2500,
    data: { transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12' }
  },
  {
    id: 6,
    title: 'Success! Satellite-Verified Credits Issued',
    description: 'AI analysis complete - restoration authenticity confirmed',
    duration: 2000,
    data: { creditsIssued: 150, verificationScore: '94%' }
  }
];