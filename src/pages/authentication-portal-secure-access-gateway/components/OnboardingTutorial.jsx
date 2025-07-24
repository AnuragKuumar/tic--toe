import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OnboardingTutorial = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to TicTacToe Arena!",
      description: "You\'ve successfully joined the ultimate strategic gaming platform. Let\'s get you started with a quick tour.",
      icon: "Trophy",
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Trophy" size={48} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Congratulations!</h3>
            <p className="text-muted-foreground">
              You're now part of a community of strategic thinkers and competitive players.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Master the Game Modes",
      description: "Explore different ways to play and challenge yourself.",
      icon: "Gamepad2",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
              <h4 className="font-medium text-foreground">Classic Mode</h4>
              <p className="text-xs text-muted-foreground">Traditional gameplay</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <Icon name="Zap" size={24} className="text-accent mx-auto mb-2" />
              <h4 className="font-medium text-foreground">Speed Mode</h4>
              <p className="text-xs text-muted-foreground">Fast-paced matches</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <Icon name="Bot" size={24} className="text-success mx-auto mb-2" />
              <h4 className="font-medium text-foreground">AI Practice</h4>
              <p className="text-xs text-muted-foreground">Train with bots</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <Icon name="Users" size={24} className="text-warning mx-auto mb-2" />
              <h4 className="font-medium text-foreground">Multiplayer</h4>
              <p className="text-xs text-muted-foreground">Play with friends</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvement and climb the leaderboards.",
      icon: "BarChart3",
      content: (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Your Stats</h4>
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">Games Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">0%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">-</div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Play your first game to start building your statistics!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Connect & Compete",
      description: "Join the community and challenge other players.",
      icon: "Users",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="UserPlus" size={20} className="text-primary" />
              <div>
                <h4 className="font-medium text-foreground">Add Friends</h4>
                <p className="text-xs text-muted-foreground">Connect with other players</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="MessageCircle" size={20} className="text-success" />
              <div>
                <h4 className="font-medium text-foreground">Chat & Interact</h4>
                <p className="text-xs text-muted-foreground">Communicate during games</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="Award" size={20} className="text-accent" />
              <div>
                <h4 className="font-medium text-foreground">Join Tournaments</h4>
                <p className="text-xs text-muted-foreground">Compete for prizes</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You\'re All Set!",
      description: "Ready to start your strategic gaming journey.",
      icon: "CheckCircle",
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={48} className="text-success" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Ready to Play!</h3>
            <p className="text-muted-foreground">
              You now have everything you need to start competing and having fun.
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Lightbulb" size={20} className="text-primary" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-primary">Pro Tip</h4>
                <p className="text-xs text-muted-foreground">
                  Start with AI practice to warm up, then challenge real players!
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentTutorial = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-game flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl shadow-xl max-w-lg w-full">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
              <button
                onClick={onSkip}
                className="text-sm text-muted-foreground hover:text-foreground strategic-transition"
              >
                Skip tutorial
              </button>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full strategic-transition"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Tutorial Content */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                {currentTutorial.title}
              </h2>
              <p className="text-muted-foreground">
                {currentTutorial.description}
              </p>
            </div>

            <div className="min-h-[200px]">
              {currentTutorial.content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full strategic-transition ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="default"
              onClick={handleNext}
              iconName={isLastStep ? "Play" : "ChevronRight"}
              iconPosition="right"
            >
              {isLastStep ? "Start Playing" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;