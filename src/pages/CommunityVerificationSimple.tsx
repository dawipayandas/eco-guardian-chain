import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const CommunityVerificationSimple = () => {
  console.log('Simple Community Verification rendering...');
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            Community Verification (Simple Test)
          </h1>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg text-green-800 mb-4">
          ✅ Component is rendering successfully!
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Test Content</h2>
          <p>This is a simplified version to test if the component renders properly.</p>
          
          <div className="mt-4 space-y-2">
            <Button className="w-full">Submit Verification</Button>
            <Button variant="outline" className="w-full">Peer Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityVerificationSimple;