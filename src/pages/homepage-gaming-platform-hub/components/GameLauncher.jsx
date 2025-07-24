import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameLauncher = () => {
  const [selectedMode, setSelectedMode] = useState('quick');

  const gameModes = [
    {
      id: 'quick',
      title: 'Quick Match',
      description: 'Instant AI opponent with adaptive difficulty',
      icon: 'Zap',
      difficulty: 'Beginner to Expert',
      estimatedTime: '2-5 minutes',
      players: 'vs AI',
      color: 'bg-primary',
      features: ['Instant start', 'Adaptive AI', 'Practice mode']
    },
    {
      id: 'multiplayer',
      title: 'Multiplayer Challenge',
      description: 'Invite friends or match with random players',
      icon: 'Users',
      difficulty: 'Varies by opponent',
      estimatedTime: '3-10 minutes',
      players: 'vs Human',
      color: 'bg-accent',
      features: ['Friend invites', 'Random matching', 'Chat enabled']
    },
    {
      id: 'ranked',
      title: 'Ranked Arena',
      description: 'Competitive play with ELO rating system',
      icon: 'Trophy',
      difficulty: 'Competitive',
      estimatedTime: '5-15 minutes',
      players: 'Ranked Match',
      color: 'bg-success',
      features: ['ELO rating', 'Seasonal rewards', 'Leaderboards']
    }
  ];

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Battle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three distinct ways to test your strategic thinking. Each mode offers unique challenges and rewards.
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {gameModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => handleModeSelect(mode.id)}
              className={`relative bg-card rounded-xl p-6 cursor-pointer strategic-transition hover:scale-105 ${
                selectedMode === mode.id 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
            >
              {/* Mode Icon */}
              <div className={`w-12 h-12 ${mode.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon name={mode.icon} size={24} color="white" />
              </div>

              {/* Mode Info */}
              <h3 className="text-xl font-bold text-foreground mb-2">{mode.title}</h3>
              <p className="text-muted-foreground mb-4">{mode.description}</p>

              {/* Mode Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="text-foreground font-medium">{mode.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground font-medium">{mode.estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opponent:</span>
                  <span className="text-foreground font-medium">{mode.players}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1">
                {mode.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="text-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedMode === mode.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Launch Button */}
        <div className="text-center">
          <Link to="/game-arena-live-gameplay-interface">
            <Button 
              variant="default" 
              size="xl" 
              iconName="Play" 
              iconPosition="left"
              className="px-12"
            >
              Launch {gameModes.find(m => m.id === selectedMode)?.title}
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-4">
            No registration required for Quick Match • Create account to save progress
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">847</div>
            <div className="text-sm text-muted-foreground">Quick matches today</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">312</div>
            <div className="text-sm text-muted-foreground">Multiplayer games</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Ranked matches</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">98%</div>
            <div className="text-sm text-muted-foreground">Player satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameLauncher;