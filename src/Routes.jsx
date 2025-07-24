import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomepageGamingPlatformHub from "pages/homepage-gaming-platform-hub";
import AuthenticationPortalSecureAccessGateway from "pages/authentication-portal-secure-access-gateway";
import GameArenaLiveGameplayInterface from "pages/game-arena-live-gameplay-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomepageGamingPlatformHub />} />
        <Route path="/homepage-gaming-platform-hub" element={<HomepageGamingPlatformHub />} />
        <Route path="/authentication-portal-secure-access-gateway" element={<AuthenticationPortalSecureAccessGateway />} />
        <Route path="/game-arena-live-gameplay-interface" element={<GameArenaLiveGameplayInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;