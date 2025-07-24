import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameResult = ({ 
  result, 
  winner, 
  gameStats,
  onPlayAgain, 
  onBackToMenu,
  onViewAnalysis 
}) => {
  if (!result) return null;

  const getResultIcon = () => {
    switch (result) {
      case 'win':
        return 'Trophy';
      case 'lose':
        return 'X';
      case 'draw':
        return 'Equal';
      default:
        return 'Circle';
    }
  };

  const getResultColor = () => {
    switch (result) {
      case 'win':
        return 'text-success';
      case 'lose':
        return 'text-destructive';
      case 'draw':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getResultMessage = () => {
    switch (result) {
      case 'win':
        return 'Victory!';
      case 'lose':
        return 'Defeat';
      case 'draw':
        return 'Draw Game';
      default:
        return 'Game Over';
    }
  };

  const getResultDescription = () => {
    switch (result) {
      case 'win':
        return 'Congratulations! You played brilliantly.';
      case 'lose':
        return 'Good game! Better luck next time.';
      case 'draw':
        return 'Well played by both sides!';
      default:
        return 'Thanks for playing!';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-game flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-xl">
        {/* Result Header */}
        <div className="text-center mb-6">
          <div className={`
            w-20 h-20 mx-auto mb-4 rounded-full border-4 flex items-center justify-center
            ${result === 'win' ?'border-success bg-success/10' 
              : result === 'lose' ?'border-destructive bg-destructive/10' :'border-warning bg-warning/10'
            }
          `}>
            <Icon 
              name={getResultIcon()} 
              size={40} 
              className={getResultColor()}
            />
          </div>
          
          <h2 className={`text-3xl font-bold mb-2 ${getResultColor()}`}>
            {getResultMessage()}
          </h2>
          
          <p className="text-muted-foreground">
            {getResultDescription()}
          </p>
          
          {winner && winner !== 'draw' && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                {winner === 'X' ? (
                  <Icon name="X" size={20} className="text-primary" strokeWidth={3} />
                ) : (
                  <Icon name="Circle" size={20} className="text-secondary" strokeWidth={3} />
                )}
                <span className="font-semibold text-foreground">
                  Player {winner} Wins!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Game Statistics */}
        {gameStats && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-3 text-center">
              Game Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-muted-foreground">Total Moves</div>
                <div className="font-mono font-bold text-foreground text-lg">
                  {gameStats.totalMoves || 0}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-muted-foreground">Game Duration</div>
                <div className="font-mono font-bold text-foreground text-lg">
                  {gameStats.duration || '0:00'}
                </div>
              </div>
              
              {gameStats.averageMoveTime && (
                <div className="text-center col-span-2">
                  <div className="text-muted-foreground">Avg Move Time</div>
                  <div className="font-mono font-bold text-foreground text-lg">
                    {gameStats.averageMoveTime}s
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="default" 
            size="lg" 
            fullWidth
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onPlayAgain}
          >
            Play Again
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              size="default"
              iconName="BarChart3"
              iconPosition="left"
              onClick={onViewAnalysis}
            >
              Analysis
            </Button>
            
            <Button 
              variant="secondary" 
              size="default"
              iconName="Home"
              iconPosition="left"
              onClick={onBackToMenu}
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Achievement Notification */}
        {result === 'win' && (
          <div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Award" size={16} />
              <span className="text-sm font-medium">
                Achievement Unlocked: Strategic Victory!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameResult;