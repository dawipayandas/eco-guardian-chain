import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Camera, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Users,
  Leaf,
  Shield,
  Coins,
  User,
  Zap,
  Eye
} from 'lucide-react';
import { mockProjects, verificationSteps } from '@/data/mockData';

interface VerificationSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  submittedBy: string;
  ngoName: string;
  location: string;
  photos: File[];
  notes: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'analyzing';
  reviewedBy?: string[];
  tokensEarned?: number;
}

interface UserProfile {
  id: string;
  name: string;
  type: 'community' | 'ngo' | 'investor';
  bgtTokens: number;
  verificationsCompleted: number;
}

const CommunityVerification = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'verify'>('submit');
  const [selectedProject, setSelectedProject] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [submissions, setSubmissions] = useState<VerificationSubmission[]>([]);
  
  // Current user profile (simulated)
  const [currentUser] = useState<UserProfile>({
    id: 'user-001',
    name: 'Community Verifier',
    type: 'community',
    bgtTokens: 125,
    verificationsCompleted: 8
  });
  
  // Load submissions from localStorage and add recent projects
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('verification-submissions');
    const recentProjects = localStorage.getItem('submitted-projects');
    
    let initialSubmissions: VerificationSubmission[] = savedSubmissions ? JSON.parse(savedSubmissions) : [];
    
    // Add recently submitted projects to verification queue
    if (recentProjects) {
      const projects = JSON.parse(recentProjects);
      projects.forEach((project: any) => {
        if (!initialSubmissions.find(s => s.projectId === project.id)) {
          initialSubmissions.push({
            id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            projectId: project.id,
            projectTitle: project.title,
            submittedBy: `NGO Verifier`,
            ngoName: project.ngoName,
            location: project.location,
            photos: [],
            notes: 'Initial project verification required before community review.',
            timestamp: new Date(project.createdAt),
            status: 'pending'
          });
        }
      });
    }
    
    // Add mock submissions if none exist
    if (initialSubmissions.length === 0) {
      initialSubmissions = [
        {
          id: '1',
          projectId: '1',
          projectTitle: 'Pichavaram Mangrove Restoration',
          submittedBy: 'Community Member #1',
          ngoName: 'Coastal Conservation Alliance',
          location: 'Coordinates: 11.4270°N, 79.7729°E',
          photos: [],
          notes: 'New mangrove saplings planted as per project plan. Water levels optimal for growth.',
          timestamp: new Date('2024-03-20'),
          status: 'pending'
        },
        {
          id: '2',
          projectId: '2',
          projectTitle: 'Sundarbans Expansion Project',
          submittedBy: 'Community Member #2',
          ngoName: 'Sundarbans Foundation',
          location: 'Coordinates: 21.9497°N, 89.1833°E',
          photos: [],
          notes: 'Existing mangroves showing healthy growth. Wildlife activity increased significantly.',
          timestamp: new Date('2024-03-18'),
          status: 'approved',
          tokensEarned: 10,
          reviewedBy: ['user-002', 'user-003']
        }
      ];
    }
    
    setSubmissions(initialSubmissions);
  }, []);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setPhotos([...photos, ...files]);
      // Auto-extract GPS coordinates (simulated)
      setLocation(`Auto-detected: ${(Math.random() * 90).toFixed(4)}°N, ${(Math.random() * 180).toFixed(4)}°E`);
    }
  };

  const handleSubmitVerification = () => {
    if (!selectedProject || photos.length === 0) return;
    
    const newSubmission: VerificationSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      projectId: selectedProject,
      projectTitle: mockProjects.find(p => p.id === selectedProject)?.title || 'Unknown Project',
      submittedBy: currentUser.name,
      ngoName: mockProjects.find(p => p.id === selectedProject)?.ngoName || 'Unknown NGO',
      location,
      photos,
      notes,
      timestamp: new Date(),
      status: 'pending'
    };
    
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('verification-submissions', JSON.stringify(updatedSubmissions));
    
    // Reset form
    setSelectedProject('');
    setPhotos([]);
    setLocation('');
    setNotes('');
    
    alert('Verification submitted successfully! It will be reviewed by the community.');
  };

  const handleVerificationAction = async (submissionId: string, action: 'approve' | 'reject') => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;
    
    // Prevent NGO from reviewing their own project
    const project = mockProjects.find(p => p.id === submission.projectId);
    if (project && submission.ngoName === project.ngoName && submission.submittedBy.includes('NGO')) {
      alert('NGOs cannot review their own projects. Community members only.');
      return;
    }
    
    // Start analysis animation
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisProgress(0);
    
    // Update submission status
    const updatedSubmissions = submissions.map(s => 
      s.id === submissionId 
        ? { ...s, status: 'analyzing' as const }
        : s
    );
    setSubmissions(updatedSubmissions);
    
    // Simulate analysis process
    for (let i = 0; i < verificationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, verificationSteps[i].duration));
      setAnalysisStep(i + 1);
      setAnalysisProgress(((i + 1) / verificationSteps.length) * 100);
    }
    
    // Final result
    const tokensEarned = action === 'approve' ? Math.floor(Math.random() * 6) + 5 : 0; // 5-10 tokens
    const finalSubmissions = submissions.map(s => 
      s.id === submissionId 
        ? { 
            ...s, 
            status: action === 'approve' ? 'approved' as const : 'rejected' as const,
            tokensEarned,
            reviewedBy: [...(s.reviewedBy || []), currentUser.id]
          }
        : s
    );
    
    setSubmissions(finalSubmissions);
    localStorage.setItem('verification-submissions', JSON.stringify(finalSubmissions));
    
    // Update user tokens (simulated)
    currentUser.bgtTokens += tokensEarned;
    currentUser.verificationsCompleted += 1;
    
    setIsAnalyzing(false);
    setAnalysisStep(0);
    setAnalysisProgress(0);
    
    if (action === 'approve') {
      alert(`Verification approved! You earned ${tokensEarned} BGT tokens.`);
    } else {
      alert('Verification rejected. No tokens awarded.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-primary" />
                  Community Verification
                </h1>
                <p className="text-muted-foreground">Verify restoration work and earn BGT tokens</p>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-lg">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{currentUser.bgtTokens} BGT</span>
              </div>
              <Avatar>
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-muted-foreground">{currentUser.verificationsCompleted} verifications</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg max-w-md">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'submit'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Submit Verification
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'verify'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Peer Review
          </button>
        </div>

        {activeTab === 'submit' ? (
          // Submit Verification Tab
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Submit Field Verification</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Upload geotagged photos and evidence of restoration work to earn BGT tokens
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                  >
                    <option value="">Choose a project to verify...</option>
                    {mockProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title} - {project.location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Geotagged Photos</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload photos with GPS coordinates
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                      capture="environment"
                    />
                    <label htmlFor="photo-upload">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        <Camera className="w-4 h-4 mr-2" />
                        Choose Photos
                      </Button>
                    </label>
                    {photos.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-primary font-medium mb-2">
                          {photos.length} photo(s) selected
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative">
                              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                                <Camera className="w-6 h-6 text-muted-foreground" />
                              </div>
                              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location Coordinates</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Will be auto-extracted from geotagged photos"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Verification Notes</label>
                  <Textarea
                    placeholder="Describe what you observed (tree health, growth progress, wildlife activity, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Reward Info */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Coins className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary">Earn BGT Tokens</h4>
                      <p className="text-sm text-muted-foreground">
                        Successful verifications earn 5-10 BGT tokens based on quality and consensus
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>📸 GPS Photos Required</span>
                        <span>🌍 Location Verified</span>
                        <span>⚡ AI Analysis</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmitVerification}
                  disabled={!selectedProject || photos.length === 0}
                  className="w-full"
                >
                  Submit Verification
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Peer Review Tab
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Peer Review Queue</h2>
                <p className="text-muted-foreground">Review submissions from other community members</p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>3 Active Reviewers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Consensus Required: 2/3</span>
                </div>
              </div>
            </div>

            {/* Analysis Modal */}
            {isAnalyzing && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="w-full max-w-lg mx-4">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 animate-pulse text-primary" />
                      <span>AI Analysis in Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={analysisProgress} className="h-2" />
                    <div className="space-y-2">
                      {verificationSteps.map((step, index) => (
                        <div 
                          key={step.id} 
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                            index < analysisStep 
                              ? 'bg-success/10 text-success' 
                              : index === analysisStep 
                                ? 'bg-primary/10 text-primary animate-pulse' 
                                : 'text-muted-foreground'
                          }`}
                        >
                          {index < analysisStep ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : index === analysisStep ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-xs opacity-75">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {submissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{submission.projectTitle}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {submission.submittedBy} • {submission.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={
                      submission.status === 'approved' ? 'default' :
                      submission.status === 'rejected' ? 'destructive' : 'secondary'
                    }>
                      {submission.status === 'approved' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : submission.status === 'rejected' ? (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Location
                      </h4>
                      <p className="text-sm text-muted-foreground">{submission.location}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">NGO</h4>
                      <p className="text-sm text-muted-foreground">{submission.ngoName}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Verification Notes</h4>
                    <p className="text-sm text-muted-foreground">{submission.notes}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Camera className="w-4 h-4 mr-1" />
                      Evidence Photos ({submission.photos.length})
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {submission.photos.length > 0 ? (
                        submission.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-success/20"
                          >
                            <Camera className="w-4 h-4 text-success" />
                          </div>
                        ))
                      ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {submission.tokensEarned && (
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          Earned {submission.tokensEarned} BGT Tokens
                        </span>
                      </div>
                    </div>
                  )}

                  {submission.status === 'pending' && (
                    <div className="flex space-x-3 pt-4 border-t">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleVerificationAction(submission.id, 'approve')}
                        className="flex-1 bg-success hover:bg-success/90"
                        disabled={isAnalyzing}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Earn Tokens
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleVerificationAction(submission.id, 'reject')}
                        className="flex-1"
                        disabled={isAnalyzing}
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                  
                  {submission.status === 'analyzing' && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-center space-x-2 text-primary">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium">AI Analysis in Progress...</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityVerification;