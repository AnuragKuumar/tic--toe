import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GameBoard = ({ 
  gameState, 
  onCellClick, 
  currentPlayer, 
  gameMode, 
  isGameActive, 
  winningCells,
  theme = 'classic'
}) => {
  const [animatingCells, setAnimatingCells] = useState(new Set());

  const handleCellClick = (index) => {
    if (!isGameActive || gameState[index] || animatingCells.has(index)) return;
    
    setAnimatingCells(prev => new Set([...prev, index]));
    setTimeout(() => {
      setAnimatingCells(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 300);
    
    onCellClick(index);
  };

  const getCellContent = (value, index) => {
    if (!value) return null;
    
    const isWinning = winningCells && winningCells.includes(index);
    const isAnimating = animatingCells.has(index);
    
    return (
      <div className={`
        flex items-center justify-center w-full h-full strategic-transition
        ${isAnimating ? 'victory-celebration' : ''}
        ${isWinning ? 'text-accent scale-110' : ''}
      `}>
        {value === 'X' ? (
          <Icon 
            name="X" 
            size={theme === 'neon' ? 48 : 40} 
            className={`${value === 'X' ? 'text-primary' : 'text-secondary'} font-bold`}
            strokeWidth={3}
          />
        ) : (
          <Icon 
            name="Circle" 
            size={theme === 'neon' ? 48 : 40} 
            className={`${value === 'O' ? 'text-secondary' : 'text-primary'} font-bold`}
            strokeWidth={3}
          />
        )}
      </div>
    );
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'neon':
        return {
          board: 'bg-gray-900 border-cyan-400 shadow-lg shadow-cyan-400/20',
          cell: 'bg-gray-800 border-cyan-400 hover:bg-cyan-900/30 hover:border-cyan-300',
          activeCell: 'bg-cyan-900/50 border-cyan-300'
        };
      case 'classic':
      default:
        return {
          board: 'bg-card border-border game-board-shadow',
          cell: 'bg-surface border-border hover:bg-muted hover:border-primary/30',
          activeCell: 'bg-primary/10 border-primary/50'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Game Mode Indicator */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Gamepad2" size={16} />
        <span className="font-mono uppercase tracking-wide">{gameMode} Mode</span>
        {gameMode === 'blitz' && (
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="Clock" size={14} />
            <span>Timed</span>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className={`
        grid grid-cols-3 gap-2 p-4 rounded-xl border-2 strategic-transition
        ${themeClasses.board}
      `}>
        {gameState.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!isGameActive || cell !== null}
            className={`
              w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 
              border-2 rounded-lg strategic-transition touch-manipulation
              ${themeClasses.cell}
              ${!isGameActive || cell ? 'cursor-not-allowed' : 'cursor-pointer'}
              ${currentPlayer && !cell && isGameActive ? themeClasses.activeCell : ''}
              ${winningCells && winningCells.includes(index) ? 'ring-2 ring-accent ring-opacity-50' : ''}
              disabled:opacity-50
            `}
            aria-label={`Cell ${index + 1}, ${cell || 'empty'}`}
          >
            {getCellContent(cell, index)}
          </button>
        ))}
      </div>

      {/* Current Player Indicator */}
      {isGameActive && currentPlayer && (
        <div className="flex items-center space-x-3 px-4 py-2 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            {currentPlayer === 'X' ? (
              <Icon name="X" size={20} className="text-primary" strokeWidth={3} />
            ) : (
              <Icon name="Circle" size={20} className="text-secondary" strokeWidth={3} />
            )}
            <span className="font-medium text-foreground">
              {currentPlayer}'s Turn
            </span>
          </div>
          <div className="w-2 h-2 bg-accent rounded-full pulse-indicator"></div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;