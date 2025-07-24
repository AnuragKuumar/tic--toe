import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestPlayOption = ({ onGuestPlay }) => {
  const guestFeatures = [
    {
      icon: 'Play',
      title: 'Instant Play',
      description: 'Start playing immediately without registration'
    },
    {
      icon: 'Bot',
      title: 'AI Opponents',
      description: 'Practice against smart computer players'
    },
    {
      icon: 'BarChart3',
      title: 'Session Stats',
      description: 'Track your performance during the session'
    },
    {
      icon: 'Gamepad2',
      title: 'Multiple Modes',
      description: 'Access classic and timed game modes'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Zap" size={32} className="text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Try Before You Sign Up</h3>
        <p className="text-muted-foreground">
          Jump straight into the action with guest play. No commitment required!
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {guestFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={onGuestPlay}
        iconName="Play"
        iconPosition="left"
        className="mb-4"
      >
        Play as Guest
      </Button>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Guest Play Limitations</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Progress won't be saved between sessions</li>
              <li>• No access to leaderboards or tournaments</li>
              <li>• Limited to single-player modes</li>
              <li>• Can't connect with friends or join communities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Ready to unlock the full experience? 
          <span className="text-primary font-medium"> Create an account above</span>
        </p>
      </div>
    </div>
  );
};

export default GuestPlayOption;