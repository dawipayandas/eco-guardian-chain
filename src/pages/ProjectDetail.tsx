import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Leaf, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield,
  ExternalLink,
  Calendar,
  BarChart3
} from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import mangroveProject from '@/assets/mangrove-project.jpg';
import satelliteImage from '@/assets/satellite-mangrove.jpg';

const ProjectDetail = () => {
  const { id } = useParams();
  const [showPolygonScan, setShowPolygonScan] = useState(false);
  
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Link to="/investor">
            <Button variant="primary">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const monthlyData = [
    { month: 'Jan', co2: 20 },
    { month: 'Feb', co2: 35 },
    { month: 'Mar', co2: 55 },
    { month: 'Apr', co2: 80 },
    { month: 'May', co2: 110 },
    { month: 'Jun', co2: 150 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/investor">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketplace
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Project Details</h1>
                <p className="text-muted-foreground">Comprehensive project analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Project Hero */}
        <div className="card-elevated overflow-hidden mb-8">
          <div className="relative">
            <img
              src={mangroveProject}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${project.ngoName}&background=00796B&color=fff&size=32`}
                  alt={project.ngoName}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm opacity-90">{project.ngoName}</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
              <p className="text-lg opacity-90">{project.location}</p>
            </div>
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                project.status === 'verified' ? 'bg-success text-white' :
                project.status === 'pending' ? 'bg-pending text-white' :
                'bg-primary text-white'
              }`}>
                {project.status === 'verified' ? 'AI Verified' : 
                 project.status === 'pending' ? 'Pending Verification' : 'Fully Funded'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {project.description} This comprehensive restoration initiative combines cutting-edge 
                satellite monitoring with community-based conservation efforts to ensure long-term 
                environmental impact and socio-economic benefits for local communities.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{project.area}</div>
                  <div className="text-xs text-muted-foreground">Hectares</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Leaf className="w-6 h-6 mx-auto mb-2 text-success" />
                  <div className="font-semibold">{project.creditsAvailable}</div>
                  <div className="text-xs text-muted-foreground">Credits Available</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="font-semibold">{project.totalCO2}</div>
                  <div className="text-xs text-muted-foreground">Tons CO₂</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <div className="font-semibold">{project.communityJobs}</div>
                  <div className="text-xs text-muted-foreground">Jobs Created</div>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Impact Metrics
              </h3>
              
              {/* CO2 Sequestration Chart */}
              <div className="mb-6">
                <h4 className="font-medium mb-4">CO₂ Sequestration Over Time</h4>
                <div className="space-y-3">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <div className="w-8 text-sm text-muted-foreground">{data.month}</div>
                      <div className="flex-1">
                        <div className="bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${(data.co2 / 150) * 100}%`,
                              animationDelay: `${index * 100}ms`
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-sm font-medium text-right">{data.co2} tons</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Biodiversity Score</h4>
                  <div className="flex items-center space-x-3">
                    <Progress value={project.biodiversityScore} className="flex-1" />
                    <span className="text-sm font-medium">{project.biodiversityScore}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Project Progress</h4>
                  <div className="flex items-center space-x-3">
                    <Progress value={project.progress} className="flex-1" />
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            {project.transactionHash && (
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Blockchain Verification
                </h3>
                
                <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-4 border border-primary/20 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Certificate of Origin</h4>
                      <p className="text-sm text-muted-foreground">Verified on Polygon Network</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono text-xs bg-white rounded px-2 py-1 border">
                        {project.transactionHash}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="font-medium">Polygon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credits Issued:</span>
                      <span className="font-medium text-success">{project.creditsAvailable} BGT</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowPolygonScan(true)}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on PolygonScan
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Card */}
            <div className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per Credit:</span>
                  <span className="font-semibold">${project.pricePerCredit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Credits:</span>
                  <span className="font-semibold">{project.creditsAvailable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Value:</span>
                  <span className="font-semibold text-primary">
                    ${(project.creditsAvailable * project.pricePerCredit).toLocaleString()}
                  </span>
                </div>
              </div>
              
              {project.status === 'verified' ? (
                <Button variant="hero" size="lg" className="w-full mb-3">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Invest Now
                </Button>
              ) : (
                <Button variant="outline" size="lg" className="w-full mb-3" disabled>
                  {project.status === 'pending' ? 'Pending Verification' : 'Fully Funded'}
                </Button>
              )}
              
              <div className="text-xs text-muted-foreground text-center">
                <Calendar className="w-3 h-3 inline mr-1" />
                Listed {project.createdAt.toLocaleDateString()}
              </div>
            </div>

            {/* Satellite View */}
            <div className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Satellite View</h3>
              <img
                src={satelliteImage}
                alt="Satellite view"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <p className="text-sm text-muted-foreground">
                Real-time satellite monitoring ensures transparent progress tracking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PolygonScan Modal */}
      {showPolygonScan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">PolygonScan Transaction Details</h3>
                <Button variant="ghost" onClick={() => setShowPolygonScan(false)}>
                  ×
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 font-mono text-sm">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded">
                  <span className="font-medium">Transaction Hash:</span>
                  <span className="col-span-2 text-primary">{project.transactionHash}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded">
                  <span className="font-medium">Status:</span>
                  <span className="col-span-2 text-success">Success</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded">
                  <span className="font-medium">Block:</span>
                  <span className="col-span-2">52,847,291</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded">
                  <span className="font-medium">From:</span>
                  <span className="col-span-2">0x742d35Cc6634C0532925a3b8D4063...5f9B</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded">
                  <span className="font-medium">To:</span>
                  <span className="col-span-2">0x1a2b3c4d5e6f7890abcdef1234567...def12</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded">
                  <span className="font-medium">Token ID:</span>
                  <span className="col-span-2">BGT-{project.id}-{project.creditsAvailable}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
