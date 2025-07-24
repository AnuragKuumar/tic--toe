import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlayerPanel = ({ 
  player, 
  isCurrentTurn, 
  gameMode, 
  symbol,
  position = 'left' 
}) => {
  const mockPlayerData = {
    id: player?.id || 1,
    username: player?.username || 'Player1',
    avatar: player?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rank: player?.rank || 'Silver III',
    winStreak: player?.winStreak || 5,
    totalWins: player?.totalWins || 127,
    rating: player?.rating || 1450,
    isOnline: player?.isOnline !== false,
    country: player?.country || 'US'
  };

  const getRankIcon = (rank) => {
    if (rank.includes('Bronze')) return 'Award';
    if (rank.includes('Silver')) return 'Medal';
    if (rank.includes('Gold')) return 'Crown';
    if (rank.includes('Diamond')) return 'Gem';
    return 'Trophy';
  };

  const getRankColor = (rank) => {
    if (rank.includes('Bronze')) return 'text-amber-600';
    if (rank.includes('Silver')) return 'text-gray-400';
    if (rank.includes('Gold')) return 'text-yellow-500';
    if (rank.includes('Diamond')) return 'text-blue-400';
    return 'text-purple-500';
  };

  return (
    <div className={`
      bg-card border border-border rounded-xl p-4 strategic-transition
      ${isCurrentTurn ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''}
      ${position === 'right' ? 'order-2' : 'order-1'}
    `}>
      {/* Player Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <Image
            src={mockPlayerData.avatar}
            alt={`${mockPlayerData.username} avatar`}
            className="w-12 h-12 rounded-full object-cover border-2 border-border"
          />
          {mockPlayerData.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
          )}
          {isCurrentTurn && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full pulse-indicator"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-foreground truncate">
              {mockPlayerData.username}
            </h3>
            <div className="flex items-center space-x-1">
              {symbol === 'X' ? (
                <Icon name="X" size={16} className="text-primary" strokeWidth={3} />
              ) : (
                <Icon name="Circle" size={16} className="text-secondary" strokeWidth={3} />
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon 
              name={getRankIcon(mockPlayerData.rank)} 
              size={14} 
              className={getRankColor(mockPlayerData.rank)}
            />
            <span>{mockPlayerData.rank}</span>
          </div>
        </div>
      </div>

      {/* Player Stats */}
      <div className="space-y-3">
        {gameMode === 'tournament' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rating</span>
            <span className="font-mono font-medium text-foreground">
              {mockPlayerData.rating.toLocaleString()}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Win Streak</span>
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={14} className="text-warning" />
            <span className="font-mono font-medium text-foreground">
              {mockPlayerData.winStreak}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Wins</span>
          <span className="font-mono font-medium text-foreground">
            {mockPlayerData.totalWins.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Turn Indicator */}
      {isCurrentTurn && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <Icon name="Clock" size={14} />
            <span className="font-medium">Your Turn</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPanel;