import React from 'react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { mockNGOStats, mockProjects } from '@/data/mockData';
import mangroveProject from '@/assets/mangrove-project.jpg';

const NGODashboard = () => {
  const userProjects = mockProjects.slice(0, 2); // Show first 2 projects for this NGO

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blue Guardian</h1>
              <p className="text-muted-foreground">NGO Dashboard</p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-8 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome, Coastal Conservation Alliance</h2>
            <p className="text-xl opacity-90">Your mission control for climate restoration projects</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Area Restored"
              value={mockNGOStats.totalAreaRestored}
              suffix=" Hectares"
              icon={<MapPin className="w-8 h-8" />}
              color="primary"
            />
            <StatCard
              title="Verified Carbon Credits"
              value={mockNGOStats.verifiedCredits}
              suffix=" BGT"
              icon={<CheckCircle className="w-8 h-8" />}
              color="success"
            />
            <StatCard
              title="Projects Pending"
              value={mockNGOStats.projectsPending}
              icon={<Clock className="w-8 h-8" />}
              color="pending"
            />
          </div>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <Link to="/ngo/submit-project">
              <Button variant="hero" size="xl">
                <Plus className="w-5 h-5" />
                Submit New Restoration Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Management */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Project Management</h3>
          
          <div className="space-y-4">
            {userProjects.map((project) => (
              <div key={project.id} className="project-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <img
                      src={mangroveProject}
                      alt={project.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                      <p className="text-muted-foreground mb-3 max-w-2xl">{project.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{project.area} hectares</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>{project.creditsAvailable} credits</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <span>${(project.creditsAvailable * project.pricePerCredit).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'verified' ? 'bg-success/10 text-success' :
                      project.status === 'pending' ? 'bg-pending/10 text-pending' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {project.status === 'verified' ? 'Verified' : 
                       project.status === 'pending' ? 'Pending' : 'Funded'}
                    </span>
                    <div className="mt-2">
                      <div className="text-xs text-muted-foreground mb-1">Progress</div>
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{project.progress}%</div>
                    </div>
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

export default NGODashboard;