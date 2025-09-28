import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  AlertTriangle,
  Calendar,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { mockCarbonCredits, mockInvestorStats } from '@/data/mockData';

const InvestorPortfolio = () => {
  const [credits, setCredits] = useState(mockCarbonCredits);
  const [showRetireModal, setShowRetireModal] = useState<string | null>(null);

  const handleRetireCredit = (creditId: string) => {
    setCredits(credits.map(credit => 
      credit.id === creditId 
        ? { ...credit, status: 'retired', retiredDate: new Date() }
        : credit
    ));
    setShowRetireModal(null);
  };

  const totalPortfolioValue = credits
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.totalPrice, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/investor">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketplace
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Impact Portfolio</h1>
                <p className="text-muted-foreground">Track and manage your climate investments</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Portfolio Value"
            value={`₹${totalPortfolioValue.toLocaleString()}`}
            icon={<DollarSign className="w-8 h-8" />}
            color="primary"
          />
          <StatCard
            title="Active Credits"
            value={credits.filter(c => c.status === 'active').length}
            icon={<Leaf className="w-8 h-8" />}
            color="success"
          />
          <StatCard
            title="Retired Credits"
            value={credits.filter(c => c.status === 'retired').length}
            icon={<TrendingUp className="w-8 h-8" />}
            color="accent"
          />
          <StatCard
            title="Total CO₂ Offset"
            value={credits.reduce((sum, c) => sum + c.amount, 0)}
            suffix=" tons"
            icon={<Leaf className="w-8 h-8" />}
            color="secondary"
          />
        </div>

        {/* Portfolio Visualization */}
        <div className="card-elevated p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Carbon Offset Impact Over Time</h3>
          <div className="h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg flex items-end justify-between p-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
              <div key={month} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-primary to-secondary rounded-t"
                  style={{ height: `${20 + index * 30}px` }}
                />
                <span className="text-xs text-muted-foreground mt-2">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Credits NFTs */}
        <div className="card-elevated p-6">
          <h3 className="text-xl font-semibold mb-6">Your Carbon Credit NFTs</h3>
          
          <div className="space-y-4">
            {credits.map((credit) => (
              <div key={credit.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{credit.projectTitle}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        credit.status === 'active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {credit.status === 'active' ? 'Active' : 'Retired'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <div className="font-semibold">{credit.amount} credits</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <div className="font-semibold">₹{credit.pricePerCredit}/credit</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Value:</span>
                        <div className="font-semibold">₹{credit.totalPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">NFT Token:</span>
                        <div className="font-mono text-xs">{credit.nftTokenId}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Purchased {credit.purchaseDate.toLocaleDateString()}</span>
                      </div>
                      {credit.retiredDate && (
                        <div className="flex items-center space-x-1">
                          <Trash2 className="w-3 h-3" />
                          <span>Retired {credit.retiredDate.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    {credit.status === 'active' && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setShowRetireModal(credit.id)}
                      >
                        Retire Credit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retire Credit Modal */}
      {showRetireModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Retire Carbon Credit</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-destructive/5 rounded-lg p-4 mb-6">
              <p className="text-sm">
                <strong>Warning:</strong> Retiring this credit is a permanent action and will burn 
                the token, ensuring it cannot be resold. This action is recorded publicly on the blockchain.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowRetireModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleRetireCredit(showRetireModal)}
                className="flex-1"
              >
                Retire Credit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorPortfolio;