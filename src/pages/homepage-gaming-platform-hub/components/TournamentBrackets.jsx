import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TournamentBrackets = () => {
  const [selectedTournament, setSelectedTournament] = useState('weekly');

  const tournaments = {
    weekly: {
      name: 'Weekly Championship',
      status: 'Semifinals',
      prize: '$500',
      participants: 64,
      timeLeft: '2h 34m',
      matches: [
        {
          id: 1,
          player1: { name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 1847 },
          player2: { name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', rating: 1923 },
          status: 'live',
          round: 'Semifinal 1'
        },
        {
          id: 2,
          player1: { name: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', rating: 1756 },
          player2: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 1834 },
          status: 'upcoming',
          round: 'Semifinal 2',
          startTime: '15:30'
        }
      ]
    },
    monthly: {
      name: 'Monthly Masters',
      status: 'Quarterfinals',
      prize: '$2,000',
      participants: 256,
      timeLeft: '5d 12h',
      matches: [
        {
          id: 3,
          player1: { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', rating: 2156 },
          player2: { name: 'Lisa Zhang', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', rating: 2089 },
          status: 'completed',
          winner: 'player1',
          round: 'Quarterfinal 1'
        },
        {
          id: 4,
          player1: { name: 'Tom Anderson', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face', rating: 1987 },
          player2: { name: 'Nina Patel', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', rating: 2034 },
          status: 'live',
          round: 'Quarterfinal 2'
        }
      ]
    }
  };

  const currentTournament = tournaments[selectedTournament];

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-success';
      case 'upcoming': return 'text-warning';
      case 'completed': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'live': return 'Radio';
      case 'upcoming': return 'Clock';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Tournaments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch the best players compete in real-time tournaments. Join the next bracket and climb your way to victory.
          </p>
        </div>

        {/* Tournament Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 flex">
            {Object.entries(tournaments).map(([key, tournament]) => (
              <button
                key={key}
                onClick={() => setSelectedTournament(key)}
                className={`px-6 py-2 rounded-md strategic-transition ${
                  selectedTournament === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tournament.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Info */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{currentTournament.prize}</div>
              <div className="text-sm text-muted-foreground">Prize Pool</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{currentTournament.participants}</div>
              <div className="text-sm text-muted-foreground">Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{currentTournament.status}</div>
              <div className="text-sm text-muted-foreground">Current Round</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{currentTournament.timeLeft}</div>
              <div className="text-sm text-muted-foreground">Time Remaining</div>
            </div>
          </div>
        </div>

        {/* Match Brackets */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {currentTournament.matches.map((match) => (
            <div key={match.id} className="bg-card rounded-xl p-6 game-board-shadow">
              {/* Match Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(match.status)} 
                    size={16} 
                    className={getStatusColor(match.status)} 
                  />
                  <span className={`text-sm font-medium ${getStatusColor(match.status)}`}>
                    {match.status === 'live' ? 'LIVE' : 
                     match.status === 'upcoming' ? `Starts ${match.startTime}` : 
                     'COMPLETED'}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {match.round}
                </span>
              </div>

              {/* Players */}
              <div className="space-y-4">
                {/* Player 1 */}
                <div className={`flex items-center justify-between p-4 rounded-lg ${
                  match.winner === 'player1' ? 'bg-success/10 border border-success/20' : 'bg-muted/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <Image 
                      src={match.player1.avatar} 
                      alt={match.player1.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{match.player1.name}</div>
                      <div className="text-sm text-muted-foreground">Rating: {match.player1.rating}</div>
                    </div>
                  </div>
                  {match.winner === 'player1' && (
                    <Icon name="Crown" size={20} className="text-warning" />
                  )}
                </div>

                {/* VS Divider */}
                <div className="text-center">
                  <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    VS
                  </span>
                </div>

                {/* Player 2 */}
                <div className={`flex items-center justify-between p-4 rounded-lg ${
                  match.winner === 'player2' ? 'bg-success/10 border border-success/20' : 'bg-muted/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <Image 
                      src={match.player2.avatar} 
                      alt={match.player2.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{match.player2.name}</div>
                      <div className="text-sm text-muted-foreground">Rating: {match.player2.rating}</div>
                    </div>
                  </div>
                  {match.winner === 'player2' && (
                    <Icon name="Crown" size={20} className="text-warning" />
                  )}
                </div>
              </div>

              {/* Match Actions */}
              <div className="mt-6 flex justify-center">
                {match.status === 'live' ? (
                  <Button variant="default" size="sm" iconName="Eye" iconPosition="left">
                    Watch Live
                  </Button>
                ) : match.status === 'upcoming' ? (
                  <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
                    Set Reminder
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" iconName="RotateCcw" iconPosition="left">
                    View Replay
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Join Tournament CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Compete?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join the next tournament and test your skills against the best players in the arena.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" iconName="Trophy" iconPosition="left">
              Join Next Tournament
            </Button>
            <Button variant="outline" size="lg" iconName="Calendar" iconPosition="left">
              View Schedule
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentBrackets;