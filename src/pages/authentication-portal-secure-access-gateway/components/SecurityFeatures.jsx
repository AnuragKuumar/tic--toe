import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = ({ onClose }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [securityQuestions, setSecurityQuestions] = useState({
    question1: '',
    answer1: '',
    question2: '',
    answer2: ''
  });

  const securityQuestionOptions = [
    "What was the name of your first pet?",
    "What city were you born in?",
    "What was your childhood nickname?",
    "What is your mother\'s maiden name?",
    "What was the name of your elementary school?",
    "What was your first car model?",
    "What is your favorite book?",
    "What was the name of your first boss?"
  ];

  const handleSecurityQuestionChange = (field, value) => {
    setSecurityQuestions(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-game flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Security Settings</h2>
                <p className="text-sm text-muted-foreground">Protect your gaming account</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Checkbox
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              />
            </div>

            {twoFactorEnabled && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Smartphone" size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">Authenticator App</h4>
                    <p className="text-sm text-muted-foreground">
                      Use Google Authenticator or similar apps
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Setup Authenticator
                </Button>
              </div>
            )}
          </div>

          {/* Account Recovery */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Account Recovery</h3>
              <p className="text-sm text-muted-foreground">
                Set up recovery options in case you lose access
              </p>
            </div>

            <Input
              label="Recovery Email"
              type="email"
              placeholder="backup@example.com"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              description="Different from your primary email"
            />

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Security Questions</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Question 1
                  </label>
                  <select
                    value={securityQuestions.question1}
                    onChange={(e) => handleSecurityQuestionChange('question1', e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                  >
                    <option value="">Select a question</option>
                    {securityQuestionOptions.map((question, index) => (
                      <option key={index} value={question}>{question}</option>
                    ))}
                  </select>
                </div>

                {securityQuestions.question1 && (
                  <Input
                    label="Answer 1"
                    type="text"
                    placeholder="Your answer"
                    value={securityQuestions.answer1}
                    onChange={(e) => handleSecurityQuestionChange('answer1', e.target.value)}
                  />
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Question 2
                  </label>
                  <select
                    value={securityQuestions.question2}
                    onChange={(e) => handleSecurityQuestionChange('question2', e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                  >
                    <option value="">Select a question</option>
                    {securityQuestionOptions
                      .filter(q => q !== securityQuestions.question1)
                      .map((question, index) => (
                        <option key={index} value={question}>{question}</option>
                      ))}
                  </select>
                </div>

                {securityQuestions.question2 && (
                  <Input
                    label="Answer 2"
                    type="text"
                    placeholder="Your answer"
                    value={securityQuestions.answer2}
                    onChange={(e) => handleSecurityQuestionChange('answer2', e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Privacy Controls</h3>
              <p className="text-sm text-muted-foreground">
                Manage your data and privacy preferences
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">Who can see your profile</p>
                </div>
                <select className="p-2 border border-border rounded bg-input text-foreground">
                  <option>Everyone</option>
                  <option>Friends Only</option>
                  <option>Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Game History</h4>
                  <p className="text-sm text-muted-foreground">Show match history to others</p>
                </div>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Online Status</h4>
                  <p className="text-sm text-muted-foreground">Show when you're online</p>
                </div>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Friend Requests</h4>
                  <p className="text-sm text-muted-foreground">Allow friend requests</p>
                </div>
                <Checkbox defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;