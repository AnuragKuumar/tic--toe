import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import GameLauncher from './components/GameLauncher';
import TournamentBrackets from './components/TournamentBrackets';
import CommunityHighlights from './components/CommunityHighlights';
import LearningCenter from './components/LearningCenter';

const HomepageGamingPlatformHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <GameLauncher />
        <TournamentBrackets />
        <CommunityHighlights />
        <LearningCenter />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary-foreground"
                  >
                    <path
                      d="M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm0 8h6v6h-6v-6z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <path
                      d="M5 5h2v2H5V5zm0 8h2v2H5v-2zm8-8h2v2h-2V5zm0 8h2v2h-2v-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">TicTacToe Arena</h3>
                  <p className="text-xs text-muted-foreground">Strategic Gaming</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Where strategy meets simplicity. Join thousands of players in the ultimate tic-tac-toe experience.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground strategic-transition">Play Now</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Tournaments</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Leaderboards</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Learning Center</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground strategic-transition">Discord</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Forums</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Strategy Guides</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Player Profiles</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground strategic-transition">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Bug Reports</a></li>
                <li><a href="#" className="hover:text-foreground strategic-transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TicTacToe Arena. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full pulse-indicator"></div>
                <span>Server Status: Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomepageGamingPlatformHub;