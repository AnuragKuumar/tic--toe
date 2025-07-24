import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [animatedBoard, setAnimatedBoard] = useState(Array(9).fill(''));
  const [currentMove, setCurrentMove] = useState(0);

  // Animated gameplay sequence
  const gameSequence = [
    { index: 4, player: 'X' }, // Center
    { index: 0, player: 'O' }, // Top-left
    { index: 8, player: 'X' }, // Bottom-right
    { index: 2, player: 'O' }, // Top-right
    { index: 6, player: 'X' }, // Bottom-left (winning move)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentMove < gameSequence.length) {
        const move = gameSequence[currentMove];
        setAnimatedBoard(prev => {
          const newBoard = [...prev];
          newBoard[move.index] = move.player;
          return newBoard;
        });
        setCurrentMove(prev => prev + 1);
      } else {
        // Reset animation
        setTimeout(() => {
          setAnimatedBoard(Array(9).fill(''));
          setCurrentMove(0);
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentMove]);

  const renderCell = (index) => {
    const value = animatedBoard[index];
    const isWinningCell = currentMove >= gameSequence.length && [4, 6, 8].includes(index);
    
    return (
      <div
        key={index}
        className={`aspect-square bg-card border-2 border-border rounded-lg flex items-center justify-center strategic-transition ${
          isWinningCell ? 'bg-success/20 border-success' : ''
        }`}
      >
        {value && (
          <span
            className={`text-2xl font-bold victory-celebration ${
              value === 'X' ? 'text-primary' : 'text-accent'
            }`}
          >
            {value}
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-border rounded"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-success rounded-full pulse-indicator"></div>
                <span>1,247 players online now</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Where Strategy
                <span className="block text-gradient-primary">Meets Simplicity</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform the classic tic-tac-toe into a modern competitive experience. 
                Play instantly, climb rankings, and master the art of strategic thinking.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/game-arena-live-gameplay-interface">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Play" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Play Now
                </Button>
              </Link>
              
              <Link to="/authentication-portal-secure-access-gateway">
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="Users" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Join Arena
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="lg" 
                iconName="Eye" 
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Watch Tournament
              </Button>
            </div>

            {/* Stats Ticker */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24,891</div>
                <div className="text-sm text-muted-foreground">Games Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">16</div>
                <div className="text-sm text-muted-foreground">Live Tournaments</div>
              </div>
            </div>
          </div>

          {/* Animated Game Board */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-card/80 backdrop-blur-game rounded-2xl p-6 game-board-shadow">
                <div className="grid grid-cols-3 gap-3 h-full">
                  {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                Live Demo
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                Strategic Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;