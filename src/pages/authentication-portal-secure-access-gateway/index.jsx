import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthenticationForm from './components/AuthenticationForm';
import SocialAuthOptions from './components/SocialAuthOptions';
import GuestPlayOption from './components/GuestPlayOption';
import SecurityFeatures from './components/SecurityFeatures';
import OnboardingTutorial from './components/OnboardingTutorial';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const AuthenticationPortal = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  // Mock credentials for testing
  const mockCredentials = {
    admin: { email: "admin@tictactoe.com", password: "admin123" },
    player: { email: "player@tictactoe.com", password: "player123" },
    guest: { email: "guest@tictactoe.com", password: "guest123" }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/homepage-gaming-platform-hub');
    }
  }, [navigate]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check mock credentials
    const isValidCredential = Object.values(mockCredentials).some(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    if (authMode === 'login') {
      if (isValidCredential) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/homepage-gaming-platform-hub');
      } else {
        alert('Invalid credentials. Try:\nAdmin: admin@tictactoe.com / admin123\nPlayer: player@tictactoe.com / player123\nGuest: guest@tictactoe.com / guest123');
      }
    } else {
      // Registration successful
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      setShowOnboarding(true);
    }
    
    setLoading(false);
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    
    // Simulate social authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', `user@${provider}.com`);
    localStorage.setItem('authProvider', provider);
    
    setLoading(false);
    navigate('/homepage-gaming-platform-hub');
  };

  const handleGuestPlay = () => {
    localStorage.setItem('isGuest', 'true');
    navigate('/game-arena-live-gameplay-interface');
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate('/homepage-gaming-platform-hub');
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    navigate('/homepage-gaming-platform-hub');
  };

  const tabs = [
    { id: 'form', label: 'Email & Password', icon: 'Mail' },
    { id: 'social', label: 'Social Login', icon: 'Users' },
    { id: 'guest', label: 'Guest Play', icon: 'Play' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-16 pb-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Shield" size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Secure Access Gateway
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of strategic thinkers in the ultimate TicTacToe experience. 
              Your journey to mastery begins here.
            </p>
            
            {/* Live Stats */}
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full pulse-indicator"></div>
                <span className="text-muted-foreground font-mono">1,247 players online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" size={16} className="text-accent" />
                <span className="text-muted-foreground font-mono">15,432 games today</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-muted-foreground font-mono">89,234 total players</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Authentication */}
            <div className="space-y-8">
              {/* Tab Navigation */}
              <div className="bg-card rounded-xl border border-border p-2">
                <div className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg strategic-transition ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Authentication Content */}
              <div className="bg-card rounded-xl border border-border p-8">
                {activeTab === 'form' && (
                  <AuthenticationForm
                    mode={authMode}
                    onModeChange={setAuthMode}
                    onSubmit={handleFormSubmit}
                    loading={loading}
                  />
                )}

                {activeTab === 'social' && (
                  <SocialAuthOptions
                    onSocialAuth={handleSocialAuth}
                    loading={loading}
                  />
                )}

                {activeTab === 'guest' && (
                  <GuestPlayOption onGuestPlay={handleGuestPlay} />
                )}
              </div>

              {/* Security Link */}
              <div className="text-center">
                <button
                  onClick={() => setShowSecurity(true)}
                  className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 strategic-transition"
                >
                  <Icon name="Settings" size={16} />
                  <span>Advanced Security Settings</span>
                </button>
              </div>
            </div>

            {/* Right Column - Features & Benefits */}
            <div className="space-y-8">
              {/* Platform Features */}
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Why Join TicTacToe Arena?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Brain" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Strategic Depth</h4>
                      <p className="text-muted-foreground">
                        Master advanced strategies and psychological gameplay techniques that go beyond basic tic-tac-toe.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Trophy" size={24} className="text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Competitive Rankings</h4>
                      <p className="text-muted-foreground">
                        Climb global leaderboards, earn achievements, and compete in seasonal tournaments with real prizes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Users" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Social Gaming</h4>
                      <p className="text-muted-foreground">
                        Connect with friends, join communities, and share your greatest strategic victories.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Zap" size={24} className="text-warning" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Multiple Game Modes</h4>
                      <p className="text-muted-foreground">
                        From classic matches to speed rounds and AI training - find your perfect challenge level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Testimonials */}
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">What Players Say</h3>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="Player testimonial"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-foreground">Alex Chen</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "This platform completely changed how I think about tic-tac-toe. The strategic depth is incredible!"
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                        alt="Player testimonial"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-foreground">Sarah Johnson</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The community is amazing and the tournaments are so much fun. Highly recommended!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-2">
                    <Icon name="Shield" size={24} className="text-success mx-auto" />
                    <h4 className="font-medium text-foreground">Secure</h4>
                    <p className="text-xs text-muted-foreground">SSL Encrypted</p>
                  </div>
                  <div className="space-y-2">
                    <Icon name="Clock" size={24} className="text-primary mx-auto" />
                    <h4 className="font-medium text-foreground">24/7 Support</h4>
                    <p className="text-xs text-muted-foreground">Always Available</p>
                  </div>
                  <div className="space-y-2">
                    <Icon name="Award" size={24} className="text-accent mx-auto" />
                    <h4 className="font-medium text-foreground">Fair Play</h4>
                    <p className="text-xs text-muted-foreground">Anti-Cheat System</p>
                  </div>
                  <div className="space-y-2">
                    <Icon name="Globe" size={24} className="text-warning mx-auto" />
                    <h4 className="font-medium text-foreground">Global</h4>
                    <p className="text-xs text-muted-foreground">Worldwide Players</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features Modal */}
      {showSecurity && (
        <SecurityFeatures onClose={() => setShowSecurity(false)} />
      )}

      {/* Onboarding Tutorial */}
      {showOnboarding && (
        <OnboardingTutorial
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  );
};

export default AuthenticationPortal;