import React from 'react';
import Icon from '../../../components/AppIcon';

const MoveHistory = ({ 
  moves = [], 
  currentMoveIndex = -1,
  onMoveClick 
}) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp).toLocaleTimeString([], { 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getMoveDescription = (move) => {
    const positions = [
      'Top Left', 'Top Center', 'Top Right',
      'Middle Left', 'Center', 'Middle Right',
      'Bottom Left', 'Bottom Center', 'Bottom Right'
    ];
    return positions[move.position] || `Position ${move.position + 1}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="History" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Move History</h3>
        <span className="text-sm text-muted-foreground font-mono">
          ({moves.length} moves)
        </span>
      </div>

      {moves.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Clock" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No moves yet</p>
          <p className="text-sm text-muted-foreground">Game history will appear here</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
          {moves.map((move, index) => (
            <button
              key={index}
              onClick={() => onMoveClick && onMoveClick(index)}
              className={`
                w-full p-3 rounded-lg border strategic-transition text-left
                ${index === currentMoveIndex 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/30 hover:bg-muted/50'
                }
                ${onMoveClick ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div className="flex items-center space-x-1">
                      {move.player === 'X' ? (
                        <Icon name="X" size={16} className="text-primary" strokeWidth={3} />
                      ) : (
                        <Icon name="Circle" size={16} className="text-secondary" strokeWidth={3} />
                      )}
                      <span className="font-medium text-foreground">
                        {move.player}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {getMoveDescription(move)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatTime(move.timestamp)}
                  </span>
                  {move.moveTime && (
                    <span className="text-xs font-mono text-muted-foreground">
                      ({move.moveTime}s)
                    </span>
                  )}
                </div>
              </div>
              
              {move.isWinningMove && (
                <div className="flex items-center space-x-1 mt-2 text-xs text-success">
                  <Icon name="Trophy" size={12} />
                  <span>Winning move</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {moves.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground">X Moves</div>
              <div className="font-mono font-medium text-foreground">
                {moves.filter(m => m.player === 'X').length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">O Moves</div>
              <div className="font-mono font-medium text-foreground">
                {moves.filter(m => m.player === 'O').length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveHistory;