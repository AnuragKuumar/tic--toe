import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityHighlights = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  const achievements = [
    {
      id: 1,
      player: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        level: 'Master'
      },
      achievement: 'First Perfect Game',
      description: 'Achieved a flawless victory in under 30 seconds against a Grandmaster opponent',
      timestamp: '2 hours ago',
      icon: 'Star',
      color: 'text-warning'
    },
    {
      id: 2,
      player: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        level: 'Expert'
      },
      achievement: '100 Win Streak',
      description: 'Maintained an incredible 100-game winning streak in ranked matches',
      timestamp: '5 hours ago',
      icon: 'Flame',
      color: 'text-error'
    },
    {
      id: 3,
      player: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        level: 'Champion'
      },
      achievement: 'Tournament Victor',
      description: 'Won the Weekly Championship defeating 63 other competitors',
      timestamp: '1 day ago',
      icon: 'Trophy',
      color: 'text-success'
    }
  ];

  const memorableGames = [
    {
      id: 1,
      title: 'The Comeback King',
      players: ['Mike Park', 'Lisa Zhang'],
      description: 'An incredible turnaround where Mike recovered from a seemingly impossible position to win in the final move.',
      moves: 47,
      duration: '12:34',
      views: 2847,
      likes: 156,
      thumbnail: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Perfect Strategy',
      players: ['Anna Kim', 'David Chen'],
      description: 'A masterclass in strategic thinking where every move was calculated three steps ahead.',
      moves: 23,
      duration: '8:45',
      views: 1923,
      likes: 89,
      thumbnail: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Lightning Fast',
      players: ['Tom Wilson', 'Nina Patel'],
      description: 'The fastest recorded game in tournament history with precision moves under time pressure.',
      moves: 15,
      duration: '2:18',
      views: 3456,
      likes: 234,
      thumbnail: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?w=300&h=200&fit=crop'
    }
  ];

  const strategySpotlights = [
    {
      id: 1,
      title: 'The Corner Trap Strategy',
      author: 'Grandmaster Chen',
      description: 'Learn how to use corner positions to create unbeatable winning combinations.',
      difficulty: 'Advanced',
      readTime: '5 min read',
      likes: 342,
      bookmarks: 89,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Center Control Mastery',
      author: 'Expert Rodriguez',
      description: 'Why controlling the center square is crucial and how to leverage it for victory.',
      difficulty: 'Intermediate',
      readTime: '3 min read',
      likes: 267,
      bookmarks: 45,
      image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Defensive Positioning',
      author: 'Master Wilson',
      description: 'Transform defensive plays into winning opportunities with these proven techniques.',
      difficulty: 'Beginner',
      readTime: '4 min read',
      likes: 189,
      bookmarks: 67,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?w=300&h=200&fit=crop'
    }
  ];

  const tabs = [
    { id: 'achievements', label: 'Recent Achievements', icon: 'Award' },
    { id: 'games', label: 'Memorable Games', icon: 'Play' },
    { id: 'strategies', label: 'Strategy Spotlights', icon: 'BookOpen' }
  ];

  const renderAchievements = () => (
    <div className="space-y-6">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="bg-card rounded-lg p-6 game-board-shadow">
          <div className="flex items-start space-x-4">
            <Image 
              src={achievement.player.avatar} 
              alt={achievement.player.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={achievement.icon} size={20} className={achievement.color} />
                <h3 className="font-bold text-foreground">{achievement.achievement}</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {achievement.player.level}
                </span>
              </div>
              <p className="text-muted-foreground mb-2">{achievement.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{achievement.player.name}</span>
                <span className="text-sm text-muted-foreground">{achievement.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMemorableGames = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memorableGames.map((game) => (
        <div key={game.id} className="bg-card rounded-lg overflow-hidden game-board-shadow">
          <div className="relative">
            <Image 
              src={game.thumbnail} 
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {game.duration}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-foreground mb-2">{game.title}</h3>
            <div className="text-sm text-muted-foreground mb-2">
              {game.players.join(' vs ')}
            </div>
            <p className="text-muted-foreground text-sm mb-4">{game.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>{game.moves} moves</span>
                <span>{game.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span>{game.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStrategySpotlights = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {strategySpotlights.map((strategy) => (
        <div key={strategy.id} className="bg-card rounded-lg overflow-hidden game-board-shadow">
          <Image 
            src={strategy.image} 
            alt={strategy.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                strategy.difficulty === 'Advanced' ? 'bg-error/10 text-error' :
                strategy.difficulty === 'Intermediate'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
              }`}>
                {strategy.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">{strategy.readTime}</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">{strategy.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{strategy.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">by {strategy.author}</span>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span>{strategy.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Bookmark" size={14} />
                  <span>{strategy.bookmarks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing achievements, memorable games, and strategic insights from our vibrant gaming community.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-1 flex flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md strategic-transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'games' && renderMemorableGames()}
          {activeTab === 'strategies' && renderStrategySpotlights()}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
            Explore Community Hub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;