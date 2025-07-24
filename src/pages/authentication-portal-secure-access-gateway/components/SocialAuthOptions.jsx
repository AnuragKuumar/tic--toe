import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuthOptions = ({ onSocialAuth, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-gray-900 border border-border',
      description: 'Continue with Google account'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      description: 'Continue with Facebook account'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black hover:bg-gray-900 text-white',
      description: 'Continue with Apple ID'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Quick Access</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred sign-in method
        </p>
      </div>

      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSocialAuth(provider.id)}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg strategic-transition ${provider.color} ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label={provider.description}
          >
            <Icon name={provider.icon} size={20} />
            <span className="font-medium">Continue with {provider.name}</span>
            {loading && (
              <div className="ml-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">or</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Privacy Protected</h4>
            <p className="text-xs text-muted-foreground">
              We only access basic profile information and never post without your permission. 
              Your gaming data stays secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthOptions;