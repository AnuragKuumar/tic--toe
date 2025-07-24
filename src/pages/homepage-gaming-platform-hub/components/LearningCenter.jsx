import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningCenter = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(0);

  const strategyOfTheDay = {
    title: "The Fork Strategy",
    difficulty: "Intermediate",
    description: "Create multiple winning threats simultaneously to force your opponent into an impossible position.",
    steps: [
      "Control the center square early in the game",
      "Place your second move in a corner position",
      "Force opponent to block one threat",
      "Create a second threat they cannot block"
    ],
    boardExample: [
      ['X', '', 'O'],
      ['', 'X', ''],
      ['O', '', '']
    ],
    tips: [
      "Always think two moves ahead",
      "Look for positions that create multiple threats",
      "Force your opponent to make defensive moves"
    ]
  };

  const quickTips = [
    {
      title: "Center Control",
      description: "The center square offers the most winning combinations",
      icon: "Target",
      color: "text-primary"
    },
    {
      title: "Corner Strategy",
      description: "Corners provide strong defensive positions",
      icon: "Square",
      color: "text-accent"
    },
    {
      title: "Block & Attack",
      description: "Always block opponent threats while creating your own",
      icon: "Shield",
      color: "text-success"
    },
    {
      title: "Pattern Recognition",
      description: "Learn to spot winning patterns quickly",
      icon: "Eye",
      color: "text-warning"
    }
  ];

  const learningPaths = [
    {
      title: "Beginner Basics",
      description: "Master the fundamentals of tic-tac-toe strategy",
      lessons: 8,
      duration: "30 minutes",
      progress: 0,
      icon: "BookOpen"
    },
    {
      title: "Intermediate Tactics",
      description: "Advanced positioning and threat creation",
      lessons: 12,
      duration: "45 minutes",
      progress: 0,
      icon: "Brain"
    },
    {
      title: "Master Class",
      description: "Professional-level strategic thinking",
      lessons: 15,
      duration: "60 minutes",
      progress: 0,
      icon: "Crown"
    }
  ];

  const renderCell = (value, index) => {
    return (
      <div
        key={index}
        className="aspect-square bg-card border-2 border-border rounded-lg flex items-center justify-center text-lg font-bold"
      >
        {value && (
          <span className={value === 'X' ? 'text-primary' : 'text-accent'}>
            {value}
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learning Center
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elevate your game with strategic insights, interactive tutorials, and expert guidance from master players.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Strategy of the Day */}
          <div className="bg-card rounded-xl p-8 game-board-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Strategy of the Day</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                strategyOfTheDay.difficulty === 'Intermediate' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
              }`}>
                {strategyOfTheDay.difficulty}
              </span>
            </div>

            <h4 className="text-xl font-bold text-foreground mb-4">{strategyOfTheDay.title}</h4>
            <p className="text-muted-foreground mb-6">{strategyOfTheDay.description}</p>

            {/* Interactive Board Example */}
            <div className="mb-6">
              <h5 className="font-semibold text-foreground mb-3">Example Position:</h5>
              <div className="w-48 mx-auto">
                <div className="grid grid-cols-3 gap-2">
                  {strategyOfTheDay.boardExample.flat().map((cell, index) => 
                    renderCell(cell, index)
                  )}
                </div>
              </div>
            </div>

            {/* Strategy Steps */}
            <div className="mb-6">
              <h5 className="font-semibold text-foreground mb-3">How to Execute:</h5>
              <ol className="space-y-2">
                {strategyOfTheDay.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Button variant="default" size="sm" iconName="Play" iconPosition="left" fullWidth>
              Practice This Strategy
            </Button>
          </div>

          {/* Quick Tips & Learning Paths */}
          <div className="space-y-8">
            {/* Quick Tips */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Quick Tips</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickTips.map((tip, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={tip.icon} size={20} className={tip.color} />
                      <h4 className="font-semibold text-foreground text-sm">{tip.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Paths */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Learning Paths</h3>
              <div className="space-y-4">
                {learningPaths.map((path, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={path.icon} size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{path.title}</h4>
                          <p className="text-sm text-muted-foreground">{path.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{path.lessons} lessons</span>
                      <span>{path.duration}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full strategic-transition"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>

                    <Button variant="outline" size="sm" fullWidth>
                      Start Learning
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center">
          <Icon name="Lightbulb" size={48} className="text-warning mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4">Pro Tip of the Week</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            "The best tic-tac-toe players don't just think about their next move—they think about forcing their opponent into making the move they want them to make."
          </p>
          <p className="text-sm text-muted-foreground mb-6">- Grandmaster Chen, 3x Tournament Champion</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" iconName="BookOpen" iconPosition="left">
              View All Strategies
            </Button>
            <Button variant="outline" iconName="Users" iconPosition="left">
              Join Study Group
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningCenter;