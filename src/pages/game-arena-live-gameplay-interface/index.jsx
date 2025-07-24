import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all components
import GameBoard from './components/GameBoard';
import PlayerPanel from './components/PlayerPanel';
import GameModeSelector from './components/GameModeSelector';
import ChatSidebar from './components/ChatSidebar';
import MoveHistory from './components/MoveHistory';
import AIOpponentSelector from './components/AIOpponentSelector';
import GameTimer from './components/GameTimer';
import GameResult from './components/GameResult';

const GameArena = () => {
  // Game state
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMode, setGameMode] = useState('classic');
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState(null);
  const [selectedAI, setSelectedAI] = useState('intermediate');
  const [theme, setTheme] = useState('classic');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [moves, setMoves] = useState([]);
  const [gameStats, setGameStats] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);

  // Mock players data
  const players = {
    human: {
      id: 1,
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rank: 'Gold II',
      winStreak: 7,
      totalWins: 89,
      rating: 1650,
      isOnline: true
    },
    ai: {
      id: 2,
      username: 'Strategy Bot',
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop&crop=face',
      rank: 'Silver III',
      winStreak: 12,
      totalWins: 234,
      rating: 1450,
      isOnline: true
    }
  };

  // Check for winner
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }

    if (board.every(cell => cell !== null)) {
      return { winner: 'draw', line: null };
    }

    return null;
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (!isGameActive || gameState[index]) return;

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    // Add move to history
    const newMove = {
      player: currentPlayer,
      position: index,
      timestamp: new Date(),
      moveTime: gameMode === 'blitz' ? Math.floor(Math.random() * 15) + 5 : null
    };
    setMoves(prev => [...prev, newMove]);

    // Check for winner
    const result = checkWinner(newGameState);
    if (result) {
      setWinner(result.winner);
      setWinningCells(result.line);
      setIsGameActive(false);
      
      // Set game result based on winner
      if (result.winner === 'draw') {
        setGameResult('draw');
      } else if (result.winner === 'X') {
        setGameResult('win'); // Assuming X is human player
      } else {
        setGameResult('lose');
      }

      // Calculate game stats
      const endTime = new Date();
      const duration = Math.floor((endTime - gameStartTime) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      
      setGameStats({
        totalMoves: moves.length + 1,
        duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
        averageMoveTime: gameMode === 'blitz' ? Math.floor(duration / (moves.length + 1)) : null
      });
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Start new game
  const startNewGame = () => {
    setGameState(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsGameActive(true);
    setGameResult(null);
    setWinner(null);
    setWinningCells(null);
    setMoves([]);
    setGameStats(null);
    setGameStartTime(new Date());
  };

  // Handle game mode change
  const handleModeChange = (mode) => {
    setGameMode(mode);
    if (isGameActive) {
      startNewGame();
    }
  };

  // Handle AI selection
  const handleAISelect = (aiId) => {
    setSelectedAI(aiId);
  };

  // Handle timer events
  const handleTimeUp = (type) => {
    if (type === 'move') {
      // Auto-play random move for current player
      const emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
      if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleCellClick(randomIndex);
      }
    } else if (type === 'total') {
      setIsGameActive(false);
      setGameResult('lose');
    }
  };

  // Handle game result actions
  const handlePlayAgain = () => {
    startNewGame();
  };

  const handleBackToMenu = () => {
    setIsGameActive(false);
    setGameResult(null);
  };

  const handleViewAnalysis = () => {
    // Mock analysis view
    console.log('View game analysis');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Gamepad2" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Game Arena</h1>
                <p className="text-muted-foreground">Live Gameplay Interface</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full pulse-indicator"></div>
                <span>1,247 players online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Trophy" size={14} />
                <span>342 active tournaments</span>
              </div>
            </div>
          </div>

          {/* Game Layout */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Game Controls */}
            <div className="lg:col-span-3 space-y-6">
              {!isGameActive && (
                <>
                  <GameModeSelector
                    currentMode={gameMode}
                    onModeChange={handleModeChange}
                    disabled={isGameActive}
                  />
                  
                  <AIOpponentSelector
                    selectedAI={selectedAI}
                    onAISelect={handleAISelect}
                    onStartGame={startNewGame}
                    disabled={isGameActive}
                  />
                </>
              )}

              {isGameActive && gameMode === 'blitz' && (
                <GameTimer
                  gameMode={gameMode}
                  isActive={isGameActive}
                  currentPlayer={currentPlayer}
                  onTimeUp={handleTimeUp}
                />
              )}

              <MoveHistory
                moves={moves}
                onMoveClick={(index) => console.log('View move', index)}
              />
            </div>

            {/* Center - Game Board */}
            <div className="lg:col-span-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                {/* Player Panels */}
                <div className="flex justify-between items-center mb-8">
                  <PlayerPanel
                    player={players.human}
                    isCurrentTurn={currentPlayer === 'X' && isGameActive}
                    gameMode={gameMode}
                    symbol="X"
                    position="left"
                  />
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <span className="text-sm font-mono">VS</span>
                  </div>
                  
                  <PlayerPanel
                    player={players.ai}
                    isCurrentTurn={currentPlayer === 'O' && isGameActive}
                    gameMode={gameMode}
                    symbol="O"
                    position="right"
                  />
                </div>

                {/* Game Board */}
                <GameBoard
                  gameState={gameState}
                  onCellClick={handleCellClick}
                  currentPlayer={currentPlayer}
                  gameMode={gameMode}
                  isGameActive={isGameActive}
                  winningCells={winningCells}
                  theme={theme}
                />

                {/* Game Controls */}
                {!isGameActive && !gameResult && (
                  <div className="mt-8 text-center">
                    <Button
                      variant="default"
                      size="lg"
                      iconName="Play"
                      iconPosition="left"
                      onClick={startNewGame}
                    >
                      Start Game
                    </Button>
                  </div>
                )}

                {isGameActive && (
                  <div className="mt-8 flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="default"
                      iconName="Pause"
                      iconPosition="left"
                      onClick={() => setIsGameActive(false)}
                    >
                      Pause
                    </Button>
                    
                    <Button
                      variant="secondary"
                      size="default"
                      iconName="RotateCcw"
                      iconPosition="left"
                      onClick={startNewGame}
                    >
                      Restart
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Theme & Settings */}
            <div className="lg:col-span-3 space-y-6">
              {/* Theme Selector */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Palette" size={20} className="text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Board Theme</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme('classic')}
                    className={`
                      p-3 rounded-lg border strategic-transition
                      ${theme === 'classic' ?'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/30'
                      }
                    `}
                  >
                    <div className="text-sm font-medium text-foreground">Classic</div>
                    <div className="text-xs text-muted-foreground">Traditional</div>
                  </button>
                  
                  <button
                    onClick={() => setTheme('neon')}
                    className={`
                      p-3 rounded-lg border strategic-transition
                      ${theme === 'neon' ?'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/30'
                      }
                    `}
                  >
                    <div className="text-sm font-medium text-foreground">Neon</div>
                    <div className="text-xs text-muted-foreground">Cyberpunk</div>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => setIsChatOpen(true)}
                  >
                    Open Chat
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Users"
                    iconPosition="left"
                  >
                    Spectator Mode
                  </Button>
                  
                  <Link to="/homepage-gaming-platform-hub">
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      iconName="Home"
                      iconPosition="left"
                    >
                      Back to Hub
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Sidebar */}
      <ChatSidebar
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        gameId="game-123"
        currentUser="You"
      />

      {/* Game Result Modal */}
      <GameResult
        result={gameResult}
        winner={winner}
        gameStats={gameStats}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}
        onViewAnalysis={handleViewAnalysis}
      />
    </div>
  );
};

export default GameArena;