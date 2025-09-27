import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { CheckCircle, Upload, Satellite, Zap, Shield } from 'lucide-react';
import { verificationSteps } from '@/data/mockData';
import satelliteImage from '@/assets/satellite-mangrove.jpg';

const VerificationFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    if (currentStep < verificationSteps.length) {
      const step = verificationSteps[currentStep];
      const timer = setTimeout(() => {
        if (currentStep === verificationSteps.length - 1) {
          setIsComplete(true);
          setProgress(100);
          // Simulate transaction hash generation
          const chars = '0123456789abcdef';
          let hash = '0x';
          for (let i = 0; i < 40; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
          }
          setTransactionHash(hash);
        } else {
          setCurrentStep(currentStep + 1);
          setProgress(((currentStep + 1) / verificationSteps.length) * 100);
        }
      }, step.duration);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const currentStepData = verificationSteps[currentStep] || verificationSteps[verificationSteps.length - 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blue Guardian</h1>
              <p className="text-muted-foreground">AI & Blockchain Verification</p>
            </div>
            <Link to="/ngo">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {!isComplete ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Verification in Progress...</h2>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-3 mb-2" />
                <p className="text-muted-foreground">Step {currentStep + 1} of {verificationSteps.length}</p>
              </div>
            </div>

            {/* Current Step Display */}
            <div className="card-elevated p-8 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {currentStep === 0 && <Satellite className="w-6 h-6 text-primary" />}
                  {currentStep === 1 && <Zap className="w-6 h-6 text-secondary" />}
                  {currentStep === 2 && <Shield className="w-6 h-6 text-accent" />}
                  {currentStep === 3 && <CheckCircle className="w-6 h-6 text-success" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{currentStepData.title}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
              </div>

              {/* Satellite Map Visualization */}
              {currentStep < 3 && (
                <div className="relative">
                  <img
                    src={satelliteImage}
                    alt="Satellite view of mangrove project"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  {/* Animated overlay data */}
                  {currentStep === 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>Canopy Density:</span>
                          <span className="font-semibold text-primary">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vegetation Index:</span>
                          <span className="font-semibold text-primary">0.72</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary mb-2">150</div>
                          <div className="text-sm text-muted-foreground">Tons CO₂</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="blockchain-mint bg-gradient-to-r from-accent/20 to-primary/20 rounded-full p-12">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                          <Shield className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Processing Animation */}
              {currentStep < 3 && (
                <div className="mt-6 flex items-center justify-center">
                  <div className="ai-processing flex items-center space-x-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-4xl font-bold text-success mb-4">Success!</h2>
              <p className="text-xl text-muted-foreground mb-6">150 Carbon Credits Successfully Minted</p>
            </div>

            <div className="card-elevated p-8 mb-8">
              <h3 className="text-lg font-semibold mb-4">Blockchain Certificate</h3>
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="text-sm text-muted-foreground mb-1">Transaction Hash:</div>
                <div className="font-mono text-sm break-all bg-white rounded p-2 border">
                  {transactionHash}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Network:</div>
                  <div className="font-semibold">Polygon</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Credits Issued:</div>
                  <div className="font-semibold text-success">150 BGT</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <Link to="/ngo">
                <Button variant="primary" size="lg">
                  Return to Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View on PolygonScan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationFlow;