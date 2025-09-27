import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, TrendingUp, Shield, Globe } from 'lucide-react';
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
      
      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="stat-card bg-white">
              <div className="stat-number text-primary">2,470</div>
              <p className="text-muted-foreground">Carbon Credits Verified</p>
            </div>
            <div className="stat-card bg-white">
              <div className="stat-number text-secondary">230</div>
              <p className="text-muted-foreground">Hectares Restored</p>
            </div>
            <div className="stat-card bg-white">
              <div className="stat-number text-accent">145</div>
              <p className="text-muted-foreground">Community Jobs Created</p>
            </div>
            <div className="stat-card bg-white">
              <div className="stat-number text-success">$125K</div>
              <p className="text-muted-foreground">Total Funding Raised</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;