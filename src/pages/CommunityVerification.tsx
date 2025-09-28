import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  Shield
} from 'lucide-react';
import { mockProjects } from '@/data/mockData';

interface VerificationSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  submittedBy: string;
  location: string;
  photos: string[];
  notes: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}

const CommunityVerification = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'verify'>('submit');
  const [selectedProject, setSelectedProject] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  // Mock verification submissions
  const mockSubmissions: VerificationSubmission[] = [
    {
      id: '1',
      projectId: '1',
      projectTitle: 'Pichavaram Mangrove Restoration',
      submittedBy: 'Local Community Member #1',
      location: 'Coordinates: 11.4270°N, 79.7729°E',
      photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
      notes: 'New mangrove saplings planted as per project plan. Water levels optimal for growth.',
      timestamp: new Date('2024-03-20'),
      status: 'pending'
    },
    {
      id: '2',
      projectId: '2',
      projectTitle: 'Sundarbans Expansion Project',
      submittedBy: 'Local Community Member #2',
      location: 'Coordinates: 21.9497°N, 89.1833°E',
      photos: ['photo4.jpg', 'photo5.jpg'],
      notes: 'Existing mangroves showing healthy growth. Wildlife activity increased significantly.',
      timestamp: new Date('2024-03-18'),
      status: 'approved'
    }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotos([...photos, ...files]);
  };

  const handleSubmitVerification = () => {
    // Mock submission
    alert('Verification submitted successfully! You will receive BGT tokens as reward.');
    setSelectedProject('');
    setPhotos([]);
    setLocation('');
    setNotes('');
  };

  const handleVerificationAction = (submissionId: string, action: 'approve' | 'reject') => {
    alert(`Verification ${action}d! Consensus reached.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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
                <h1 className="text-2xl font-bold text-foreground">Community Verification</h1>
                <p className="text-muted-foreground">Verify restoration work and earn BGT tokens</p>
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
                    />
                    <label htmlFor="photo-upload">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        Choose Photos
                      </Button>
                    </label>
                    {photos.length > 0 && (
                      <p className="text-sm text-success mt-2">
                        {photos.length} photo(s) selected
                      </p>
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
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Leaf className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success">Earn BGT Tokens</h4>
                      <p className="text-sm text-muted-foreground">
                        Successful verifications earn 5-10 BGT tokens based on quality and consensus
                      </p>
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

            {mockSubmissions.map((submission) => (
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
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {submission.location}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Verification Notes</h4>
                    <p className="text-sm text-muted-foreground">{submission.notes}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Evidence Photos</h4>
                    <div className="flex space-x-2">
                      {submission.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center"
                        >
                          <Camera className="w-6 h-6 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleVerificationAction(submission.id, 'approve')}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleVerificationAction(submission.id, 'reject')}
                        className="flex-1"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
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