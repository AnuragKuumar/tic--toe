import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameModeSelector = ({ 
  currentMode, 
  onModeChange, 
  disabled = false 
}) => {
  const gameModes = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional tic-tac-toe rules',
      icon: 'Grid3X3',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      features: ['No time limit', 'Best of 1', 'Casual play']
    },
    {
      id: 'blitz',
      name: 'Blitz',
      description: 'Fast-paced with move timers',
      icon: 'Zap',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      features: ['30s per move', 'Quick matches', 'Intense gameplay']
    },
    {
      id: 'tournament',
      name: 'Tournament',
      description: 'Ranked competitive matches',
      icon: 'Trophy',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      features: ['Rating system', 'Best of 3', 'Leaderboard']
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Game Mode</h3>
      </div>
      
      <div className="grid gap-3">
        {gameModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            disabled={disabled}
            className={`
              w-full p-4 rounded-lg border-2 strategic-transition text-left
              ${currentMode === mode.id 
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/30'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${mode.bgColor}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                p-2 rounded-lg bg-card border border-border
                ${currentMode === mode.id ? 'ring-2 ring-primary/30' : ''}
              `}>
                <Icon 
                  name={mode.icon} 
                  size={20} 
                  className={currentMode === mode.id ? 'text-primary' : mode.color}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground">{mode.name}</h4>
                  {currentMode === mode.id && (
                    <div className="w-2 h-2 bg-primary rounded-full pulse-indicator"></div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {mode.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {mode.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {!disabled && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="default" 
            size="sm" 
            fullWidth
            iconName="Play"
            iconPosition="left"
            onClick={() => onModeChange(currentMode)}
          >
            Start {gameModes.find(m => m.id === currentMode)?.name} Game
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameModeSelector;