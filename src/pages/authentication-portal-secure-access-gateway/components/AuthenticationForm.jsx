import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AuthenticationForm = ({ mode, onModeChange, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    skillLevel: 'beginner',
    agreeToTerms: false,
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'register') {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'text-error' };
    if (password.length < 8) return { strength: 'medium', color: 'text-warning' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return { strength: 'strong', color: 'text-success' };
    }
    return { strength: 'medium', color: 'text-warning' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Join the Arena'}
        </h2>
        <p className="text-muted-foreground">
          {mode === 'login' ?'Sign in to continue your strategic journey' :'Create your account and start competing'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'register' && (
          <Input
            label="Username"
            type="text"
            placeholder="Choose a unique username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            error={errors.username}
            required
          />
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground strategic-transition"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          
          {mode === 'register' && formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full strategic-transition ${
                      passwordStrength.strength === 'weak' ? 'w-1/3 bg-error' :
                      passwordStrength.strength === 'medium'? 'w-2/3 bg-warning' : 'w-full bg-success'
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium ${passwordStrength.color}`}>
                  {passwordStrength.strength}
                </span>
              </div>
            </div>
          )}
        </div>

        {mode === 'register' && (
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground strategic-transition"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        )}

        {mode === 'register' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skill Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['beginner', 'intermediate', 'expert'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleInputChange('skillLevel', level)}
                    className={`p-3 rounded-lg border strategic-transition ${
                      formData.skillLevel === level
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-center">
                      <Icon 
                        name={
                          level === 'beginner' ? 'Star' :
                          level === 'intermediate' ? 'Award' : 'Crown'
                        } 
                        size={20} 
                        className="mx-auto mb-1"
                      />
                      <span className="text-xs font-medium capitalize">{level}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              error={errors.agreeToTerms}
              required
            />
          </div>
        )}

        {mode === 'login' && (
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            />
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 strategic-transition"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
          iconPosition="left"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>

        <div className="text-center">
          <span className="text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
            className="text-primary hover:text-primary/80 font-medium strategic-transition"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticationForm;