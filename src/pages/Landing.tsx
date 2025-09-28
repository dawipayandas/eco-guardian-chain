import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, TrendingUp, Shield, Globe, Users, UploadCloud, BadgeCheck, AreaChart, Satellite, Cpu, LineChart } from 'lucide-react';
import heroImage from '@/assets/hero-mangrove.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Blue Guardian
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Verifiable climate restoration powered by AI and blockchain technology.
              Connect NGOs with investors for transparent, impactful environmental projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/ngo">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Leaf className="w-5 h-5" />
                  I'm an NGO/Restorer
                </Button>
              </Link>
              <Link to="/investor">
                <Button variant="glassmorphism" size="xl" className="w-full sm:w-auto">
                  <TrendingUp className="w-5 h-5" />
                  I'm an Investor
                </Button>
              </Link>
              <Link to="/community-verification">
                <Button variant="outline" size="xl" className="w-full sm:w-auto text-white border-white/30 bg-transparent hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  <Users className="w-5 h-5" />
                  Community Verifier
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center animate-float">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
              <h3 className="text-lg font-semibold mb-2">AI Verification</h3>
              <p className="text-white/80">Satellite imagery analysis ensures authentic restoration</p>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
              <Globe className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
              <p className="text-white/80">Immutable certificates on Polygon network</p>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '2s' }}>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">Verified Impact</h3>
              <p className="text-white/80">Real-time tracking of environmental outcomes</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">A Transparent Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Our platform connects on-the-ground action with global investors through a simple, verifiable process.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="feature-card">
                    <UploadCloud className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">1. Submit & Verify</h3>
                    <p className="text-muted-foreground">NGOs submit project data. Our AI analyzes satellite imagery to verify real-world progress.</p>
                </div>
                <div className="feature-card">
                    <BadgeCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">2. Mint & Secure</h3>
                    <p className="text-muted-foreground">Verified restoration milestones are minted as secure, traceable carbon credits on the blockchain.</p>
                </div>
                <div className="feature-card">
                    <AreaChart className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">3. Invest & Track</h3>
                    <p className="text-muted-foreground">Investors confidently fund projects and track their environmental impact in real-time.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Impact by the Numbers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="stat-card bg-white p-8 rounded-xl shadow-md">
              <div className="stat-number text-primary">2,470</div>
              <p className="text-muted-foreground mt-2">Carbon Credits Verified</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-md">
              <div className="stat-number text-secondary">230</div>
              <p className="text-muted-foreground mt-2">Hectares Restored</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-md">
              <div className="stat-number text-accent">145</div>
              <p className="text-muted-foreground mt-2">Community Jobs Created</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-md">
              <div className="stat-number text-success">$125K</div>
              <p className="text-muted-foreground mt-2">Total Funding Raised</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">NASA-Grade Satellite Verification</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">We use the same caliber of satellite technology as the world's leading climate science agencies to provide undeniable proof of restoration.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="feature-card">
                    <Satellite className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Data Sources</h3>
                    <p className="text-muted-foreground">Utilizing high-resolution, multi-spectral imagery from Sentinel-2 & Landsat-8 satellite constellations.</p>
                </div>
                <div className="feature-card">
                    <Cpu className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Scientific Algorithms</h3>
                    <p className="text-muted-foreground">Applying peer-reviewed vegetation indices like NDVI, EVI, and SAVI to accurately measure ecosystem health.</p>
                </div>
                <div className="feature-card">
                    <LineChart className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Time-Series Analysis</h3>
                    <p className="text-muted-foreground">Tracking changes over time to monitor growth, calculate carbon sequestration, and verify long-term impact.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Powered by Leading Technology</h2>
              <p className="text-muted-foreground mt-4">We use a robust, modern stack to ensure security, scalability, and transparency.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="tech-card bg-white p-6 rounded-xl shadow-md transition-colors duration-300 hover:bg-green-50">
              <h3 className="text-lg font-bold text-foreground mb-2">Frontend</h3>
              <p className="font-semibold text-primary">React Native</p>
              <p className="text-sm text-muted-foreground mt-2">Cross-platform mobile apps for iOS & Android.</p>
            </div>
            <div className="tech-card bg-white p-6 rounded-xl shadow-md transition-colors duration-300 hover:bg-green-50">
              <h3 className="text-lg font-bold text-foreground mb-2">Backend</h3>
              <p className="font-semibold text-primary">Node.js & Express</p>
              <p className="text-sm text-muted-foreground mt-2">Manages data, users, and blockchain interactions.</p>
            </div>
            <div className="tech-card bg-white p-6 rounded-xl shadow-md transition-colors duration-300 hover:bg-green-50">
              <h3 className="text-lg font-bold text-foreground mb-2">Databases</h3>
              <p className="font-semibold text-primary">PostgreSQL & IPFS</p>
              <p className="text-sm text-muted-foreground mt-2">For structured data and decentralized file storage.</p>
            </div>
            <div className="tech-card bg-white p-6 rounded-xl shadow-md transition-colors duration-300 hover:bg-green-50">
              <h3 className="text-lg font-bold text-foreground mb-2">AI & ML</h3>
              <p className="font-semibold text-primary">TensorFlow / PyTorch</p>
              <p className="text-sm text-muted-foreground mt-2">Core engine for satellite image analysis and verification.</p>
            </div>
            <div className="tech-card bg-white p-6 rounded-xl shadow-md transition-colors duration-300 hover:bg-green-50">
              <h3 className="text-lg font-bold text-foreground mb-2">Blockchain</h3>
              <p className="font-semibold text-primary">Polygon</p>
              <p className="text-sm text-muted-foreground mt-2">Mints verified credits as secure, transparent NFTs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;