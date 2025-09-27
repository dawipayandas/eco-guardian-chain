import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Users, 
  AlertCircle, 
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProjectSubmission } from './ProjectSubmission';

const VerificationManagement = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectSubmission | null>(null);
  const [peerFeedback, setPeerFeedback] = useState('');

  useEffect(() => {
    // Load submissions from localStorage
    const saved = localStorage.getItem('projectSubmissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  }, []);

  const updateSubmission = (updatedProject: ProjectSubmission) => {
    const updated = submissions.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    setSubmissions(updated);
    localStorage.setItem('projectSubmissions', JSON.stringify(updated));
  };

  const handleSelfVerification = (project: ProjectSubmission) => {
    const updated = {
      ...project,
      verificationLevel: 'self' as const,
      status: 'self-verified' as const,
    };
    updateSubmission(updated);
    toast({
      title: "Self-Verification Complete",
      description: "Your project is now ready for peer review.",
    });
  };

  const handlePeerReview = (project: ProjectSubmission, approved: boolean) => {
    if (!peerFeedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback for your review.",
        variant: "destructive",
      });
      return;
    }

    const newReview = {
      reviewerId: 'peer-1',
      reviewerName: 'Environmental Expert',
      approved,
      feedback: peerFeedback,
      reviewedAt: new Date(),
    };

    const updated = {
      ...project,
      verificationLevel: 'peer' as const,
      status: approved ? 'verified' as const : 'rejected' as const,
      peerReviews: [...(project.peerReviews || []), newReview],
    };

    updateSubmission(updated);
    setPeerFeedback('');
    setSelectedProject(null);

    if (approved) {
      // Add to main projects list
      const existingProjects = JSON.parse(localStorage.getItem('verifiedProjects') || '[]');
      const newProject = {
        id: project.id,
        title: project.title,
        description: project.description,
        ngoName: 'Coastal Conservation Alliance',
        location: project.location,
        area: project.area,
        creditsAvailable: project.estimatedCredits,
        pricePerCredit: project.pricePerCredit,
        totalCO2: Math.round(project.estimatedCredits * 1.5),
        status: 'verified',
        image: '/src/assets/mangrove-project.jpg',
        progress: 100,
        communityJobs: project.communityJobs,
        biodiversityScore: 88 + Math.random() * 10,
        transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
        createdAt: project.submittedAt,
      };
      existingProjects.push(newProject);
      localStorage.setItem('verifiedProjects', JSON.stringify(existingProjects));
    }

    toast({
      title: approved ? "Project Approved!" : "Project Rejected",
      description: approved 
        ? "The project has been verified and is now available in the marketplace."
        : "The project has been rejected and feedback has been provided.",
    });
  };

  const getStatusBadge = (status: ProjectSubmission['status']) => {
    const variants = {
      'draft': { variant: 'secondary' as const, text: 'Draft' },
      'self-verified': { variant: 'default' as const, text: 'Self-Verified' },
      'peer-verification': { variant: 'default' as const, text: 'Peer Review' },
      'verified': { variant: 'default' as const, text: 'Verified' },
      'rejected': { variant: 'destructive' as const, text: 'Rejected' },
    };
    
    const config = variants[status];
    return (
      <Badge 
        variant={config.variant} 
        className={status === 'verified' ? 'bg-success/10 text-success' : undefined}
      >
        {config.text}
      </Badge>
    );
  };

  const getStatusIcon = (status: ProjectSubmission['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'peer-verification':
      case 'self-verified':
        return <Clock className="w-5 h-5 text-pending" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
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
                <h1 className="text-2xl font-bold text-foreground">Verification Center</h1>
                <p className="text-muted-foreground">Manage project verification workflow</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Projects Submitted</h3>
                <p className="text-muted-foreground mb-4">
                  Submit a project first to start the verification process.
                </p>
                <Link to="/ngo/submit-project">
                  <Button variant="hero">Submit New Project</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Projects List */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold">Submitted Projects</h2>
                
                {submissions.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(project.status)}
                          {getStatusBadge(project.status)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {project.area} hectares • {project.estimatedCredits} credits
                        </div>
                        
                        <div className="flex space-x-2">
                          {project.status === 'draft' && (
                            <Button
                              size="sm"
                              onClick={() => handleSelfVerification(project)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Self-Verify
                            </Button>
                          )}
                          
                          {project.status === 'self-verified' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedProject(project)}
                            >
                              <Users className="w-4 h-4 mr-1" />
                              Start Peer Review
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Verification Panel */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Verification Panel</h2>
                
                {selectedProject ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{selectedProject.title}</CardTitle>
                      <CardDescription>
                        {selectedProject.status === 'self-verified' ? 'Peer Review' : 'Project Details'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Project Info</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Location:</span> {selectedProject.location}</p>
                          <p><span className="font-medium">Area:</span> {selectedProject.area} hectares</p>
                          <p><span className="font-medium">Credits:</span> {selectedProject.estimatedCredits}</p>
                          <p><span className="font-medium">Jobs:</span> {selectedProject.communityJobs}</p>
                        </div>
                      </div>

                      {selectedProject.peerReviews && selectedProject.peerReviews.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Review History</h4>
                          {selectedProject.peerReviews.map((review, index) => (
                            <div key={index} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{review.reviewerName}</span>
                                {review.approved ? (
                                  <ThumbsUp className="w-4 h-4 text-success" />
                                ) : (
                                  <ThumbsDown className="w-4 h-4 text-destructive" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{review.feedback}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedProject.status === 'self-verified' && (
                        <div>
                          <h4 className="font-medium mb-2">Peer Review</h4>
                          <Textarea
                            placeholder="Provide your review feedback..."
                            value={peerFeedback}
                            onChange={(e) => setPeerFeedback(e.target.value)}
                            rows={4}
                          />
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              onClick={() => handlePeerReview(selectedProject, true)}
                              className="bg-success hover:bg-success/90 text-white"
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handlePeerReview(selectedProject, false)}
                            >
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Select a project to view details and manage verification
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Verification Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Verification Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <p className="font-medium">Self-Verification</p>
                        <p className="text-sm text-muted-foreground">Verify your own project data</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <p className="font-medium">Peer Review</p>
                        <p className="text-sm text-muted-foreground">Independent expert validation</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold">✓</div>
                      <div>
                        <p className="font-medium">Marketplace Ready</p>
                        <p className="text-sm text-muted-foreground">Available for investment</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VerificationManagement;