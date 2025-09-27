import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, MapPin, TreePine, Users, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ProjectSubmission {
  id: string;
  title: string;
  description: string;
  location: string;
  area: number;
  estimatedCredits: number;
  pricePerCredit: number;
  communityJobs: number;
  images: File[];
  droneFootage: File[];
  submittedAt: Date;
  verificationLevel: 'none' | 'self' | 'peer';
  status: 'draft' | 'self-verified' | 'peer-verification' | 'verified' | 'rejected';
  peerReviews?: {
    reviewerId: string;
    reviewerName: string;
    approved: boolean;
    feedback: string;
    reviewedAt: Date;
  }[];
}

interface ProjectSubmissionProps {
  onSubmit?: (project: ProjectSubmission) => void;
}

const ProjectSubmission = ({ onSubmit }: ProjectSubmissionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    area: '',
    estimatedCredits: '',
    pricePerCredit: '',
    communityJobs: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [droneFootage, setDroneFootage] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'drone') => {
    const files = Array.from(e.target.files || []);
    if (type === 'images') {
      setImages(files);
    } else {
      setDroneFootage(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.title || !formData.description || !formData.location || !formData.area) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Create project submission
    const projectSubmission: ProjectSubmission = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      area: parseFloat(formData.area),
      estimatedCredits: parseFloat(formData.estimatedCredits) || 0,
      pricePerCredit: parseFloat(formData.pricePerCredit) || 25,
      communityJobs: parseFloat(formData.communityJobs) || 0,
      images,
      droneFootage,
      submittedAt: new Date(),
      verificationLevel: 'none',
      status: 'draft',
    };

    // Store in localStorage for demo purposes
    const existingSubmissions = JSON.parse(localStorage.getItem('projectSubmissions') || '[]');
    const updatedSubmissions = [...existingSubmissions, projectSubmission];
    localStorage.setItem('projectSubmissions', JSON.stringify(updatedSubmissions));

    // Call onSubmit if provided
    onSubmit?.(projectSubmission);

    toast({
      title: "Project Submitted Successfully!",
      description: "Your project has been saved as a draft. Proceed to verification to make it live.",
    });

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    navigate('/ngo/verification');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/ngo">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Submit New Project</h1>
                <p className="text-muted-foreground">Add your restoration project for verification</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <section className="py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="w-5 h-5 text-primary" />
                  <span>Project Details</span>
                </CardTitle>
                <CardDescription>
                  Provide basic information about your restoration project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Mangrove Restoration Project"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Tamil Nadu, India"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your restoration project, its goals, and environmental impact..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-primary" />
                  <span>Impact Metrics</span>
                </CardTitle>
                <CardDescription>
                  Quantify the expected environmental and social impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (Hectares) *</Label>
                    <Input
                      id="area"
                      name="area"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g., 75"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCredits">Estimated Carbon Credits</Label>
                    <Input
                      id="estimatedCredits"
                      name="estimatedCredits"
                      type="number"
                      min="0"
                      value={formData.estimatedCredits}
                      onChange={handleInputChange}
                      placeholder="e.g., 1200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerCredit">Price per Credit ($)</Label>
                    <Input
                      id="pricePerCredit"
                      name="pricePerCredit"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.pricePerCredit}
                      onChange={handleInputChange}
                      placeholder="e.g., 25"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="communityJobs">Community Jobs Created</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="communityJobs"
                      name="communityJobs"
                      type="number"
                      min="0"
                      value={formData.communityJobs}
                      onChange={handleInputChange}
                      placeholder="e.g., 45"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Uploads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <span>Documentation</span>
                </CardTitle>
                <CardDescription>
                  Upload supporting materials for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Geotagged Photos</Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'images')}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                    />
                    {images.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {images.length} file(s) selected
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drone">Drone Footage</Label>
                    <Input
                      id="drone"
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'drone')}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                    />
                    {droneFootage.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {droneFootage.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link to="/ngo">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProjectSubmission;