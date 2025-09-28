import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Leaf, TrendingUp, DollarSign, Users } from 'lucide-react';
import { mockProjects, mockInvestorStats } from '@/data/mockData';
import mangroveProject from '@/assets/mangrove-project.jpg';

const InvestorMarketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(mockProjects);
    } else if (filter === 'verified') {
      setFilteredProjects(mockProjects.filter(p => p.status === 'verified'));
    } else if (filter === 'high-impact') {
      setFilteredProjects(mockProjects.filter(p => p.totalCO2 > 1000));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blue Guardian</h1>
              <p className="text-muted-foreground">Investor Marketplace</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/investor/portfolio">
                <Button variant="outline">My Portfolio</Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Invest in Verifiable Climate Action</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Discover high-quality, AI-verified restoration projects with transparent blockchain certificates
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Invested"
              value={`₹${mockInvestorStats.totalInvested.toLocaleString()}`}
              icon={<DollarSign className="w-8 h-8" />}
              color="primary"
            />
            <StatCard
              title="Credits Owned"
              value={mockInvestorStats.creditsOwned}
              icon={<Leaf className="w-8 h-8" />}
              color="success"
            />
            <StatCard
              title="Credits Retired"
              value={mockInvestorStats.creditsRetired}
              icon={<TrendingUp className="w-8 h-8" />}
              color="accent"
            />
            <StatCard
              title="Impact Projects"
              value={mockInvestorStats.impactProjects}
              icon={<Users className="w-8 h-8" />}
              color="secondary"
            />
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-8">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleFilter('all')}
              >
                All Projects
              </Button>
              <Button
                variant={selectedFilter === 'verified' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleFilter('verified')}
              >
                Verified Only
              </Button>
              <Button
                variant={selectedFilter === 'high-impact' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleFilter('high-impact')}
              >
                High Impact
              </Button>
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card overflow-hidden">
                <div className="relative">
                  <img
                    src={mangroveProject}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'verified' ? 'bg-success text-white' :
                      project.status === 'pending' ? 'bg-pending text-white' :
                      'bg-primary text-white'
                    }`}>
                      {project.status === 'verified' ? 'Verified' : 
                       project.status === 'pending' ? 'Pending' : 'Funded'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${project.ngoName}&background=00796B&color=fff&size=24`}
                      alt={project.ngoName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">{project.ngoName}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Leaf className="w-4 h-4 text-success" />
                      <span>{project.creditsAvailable} Credits</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span>₹{project.pricePerCredit}/Credit</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>{project.totalCO2} Tons CO₂</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>{project.area} Hectares</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/investor/project/${project.id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    {project.status === 'verified' && (
                      <Button variant="success" size="sm">
                        Invest Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorMarketplace;