import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIOpponentSelector = ({ 
  selectedAI, 
  onAISelect, 
  onStartGame,
  disabled = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const aiOpponents = [
    {
      id: 'beginner',
      name: 'Rookie Bot',
      difficulty: 'Beginner',
      description: 'Perfect for learning the basics',
      personality: 'Friendly and encouraging, makes occasional mistakes',
      winRate: '25%',
      icon: 'Smile',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      features: ['Random moves', 'No strategy', 'Great for beginners']
    },
    {
      id: 'intermediate',
      name: 'Strategy Bot',
      difficulty: 'Intermediate',
      description: 'Balanced gameplay with tactical awareness',
      personality: 'Analytical thinker, plays defensively',
      winRate: '60%',
      icon: 'Brain',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      features: ['Basic strategy', 'Blocks obvious wins', 'Good practice']
    },
    {
      id: 'advanced',
      name: 'Tactical Master',
      difficulty: 'Advanced',
      description: 'Sophisticated AI with advanced patterns',
      personality: 'Calculated and precise, rarely makes errors',
      winRate: '80%',
      icon: 'Target',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      features: ['Advanced tactics', 'Pattern recognition', 'Challenging']
    },
    {
      id: 'grandmaster',
      name: 'Quantum Mind',
      difficulty: 'Grandmaster',
      description: 'Near-perfect play with optimal strategies',
      personality: 'Cold and calculating, plays optimally',
      winRate: '95%',
      icon: 'Zap',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      features: ['Perfect play', 'Minimax algorithm', 'Ultimate challenge']
    }
  ];

  const selectedOpponent = aiOpponents.find(ai => ai.id === selectedAI) || aiOpponents[0];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bot" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">AI Opponent</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Choose'}
        </Button>
      </div>

      {/* Selected AI Display */}
      <div className={`
        p-4 rounded-lg border-2 mb-4
        ${selectedOpponent.bgColor}
        border-primary bg-primary/5
      `}>
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-card border border-border">
            <Icon 
              name={selectedOpponent.icon} 
              size={24} 
              className={selectedOpponent.color}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-foreground">
                {selectedOpponent.name}
              </h4>
              <span className="px-2 py-1 rounded text-xs bg-primary text-primary-foreground">
                {selectedOpponent.difficulty}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {selectedOpponent.description}
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Win Rate:</span>
                <span className="font-mono font-medium text-foreground">
                  {selectedOpponent.winRate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Selection Grid */}
      {isExpanded && (
        <div className="grid gap-3 mb-4">
          {aiOpponents.map((ai) => (
            <button
              key={ai.id}
              onClick={() => onAISelect(ai.id)}
              disabled={disabled}
              className={`
                w-full p-3 rounded-lg border strategic-transition text-left
                ${selectedAI === ai.id 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/30'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${ai.bgColor}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-card border border-border">
                  <Icon 
                    name={ai.icon} 
                    size={20} 
                    className={selectedAI === ai.id ? 'text-primary' : ai.color}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{ai.name}</h4>
                    <span className={`
                      px-2 py-1 rounded text-xs
                      ${selectedAI === ai.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {ai.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {ai.personality}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {ai.features.map((feature, index) => (
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
      )}

      {/* Start Game Button */}
      <Button 
        variant="default" 
        size="default" 
        fullWidth
        disabled={disabled}
        iconName="Play"
        iconPosition="left"
        onClick={onStartGame}
      >
        Challenge {selectedOpponent.name}
      </Button>
    </div>
  );
};

export default AIOpponentSelector;