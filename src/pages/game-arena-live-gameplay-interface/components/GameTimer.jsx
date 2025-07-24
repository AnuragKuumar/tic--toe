import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GameTimer = ({ 
  gameMode, 
  isActive, 
  currentPlayer, 
  onTimeUp,
  moveTimeLimit = 30,
  totalTimeLimit = 300 
}) => {
  const [moveTime, setMoveTime] = useState(moveTimeLimit);
  const [totalTime, setTotalTime] = useState(totalTimeLimit);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive || gameMode !== 'blitz') return;

    const interval = setInterval(() => {
      setMoveTime(prev => {
        if (prev <= 1) {
          onTimeUp && onTimeUp('move');
          return moveTimeLimit;
        }
        return prev - 1;
      });

      setTotalTime(prev => {
        if (prev <= 1) {
          onTimeUp && onTimeUp('total');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, gameMode, moveTimeLimit, totalTimeLimit, onTimeUp]);

  useEffect(() => {
    setIsWarning(moveTime <= 10);
  }, [moveTime]);

  useEffect(() => {
    if (isActive) {
      setMoveTime(moveTimeLimit);
    }
  }, [currentPlayer, moveTimeLimit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (current, total) => {
    return (current / total) * 100;
  };

  if (gameMode !== 'blitz') {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Game Timer</h3>
        {isActive && (
          <div className="w-2 h-2 bg-accent rounded-full pulse-indicator"></div>
        )}
      </div>

      {/* Move Timer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Move Time</span>
          <span className={`
            font-mono font-bold text-lg
            ${isWarning ? 'text-destructive' : 'text-foreground'}
          `}>
            {moveTime}s
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className={`
              h-full strategic-transition rounded-full
              ${isWarning 
                ? 'bg-destructive animate-pulse' 
                : moveTime > 20 
                  ? 'bg-success' 
                  : moveTime > 10 
                    ? 'bg-warning' :'bg-destructive'
              }
            `}
            style={{ 
              width: `${getProgressPercentage(moveTime, moveTimeLimit)}%`,
              transition: 'width 1s linear'
            }}
          ></div>
        </div>
        
        {isWarning && (
          <div className="flex items-center space-x-1 mt-2 text-destructive">
            <Icon name="AlertTriangle" size={14} />
            <span className="text-xs font-medium">Time running out!</span>
          </div>
        )}
      </div>

      {/* Total Game Timer */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Total Time</span>
          <span className="font-mono font-medium text-foreground">
            {formatTime(totalTime)}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`
              h-full strategic-transition rounded-full
              ${totalTime > 240 
                ? 'bg-success' 
                : totalTime > 120 
                  ? 'bg-warning' :'bg-destructive'
              }
            `}
            style={{ 
              width: `${getProgressPercentage(totalTime, totalTimeLimit)}%`,
              transition: 'width 1s linear'
            }}
          ></div>
        </div>
      </div>

      {/* Timer Controls */}
      {!isActive && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Pause" size={14} />
            <span>Timer paused</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTimer;