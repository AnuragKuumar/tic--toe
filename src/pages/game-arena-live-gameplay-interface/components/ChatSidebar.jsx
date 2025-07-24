import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatSidebar = ({ 
  isOpen, 
  onToggle, 
  gameId,
  currentUser = 'Player1' 
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock chat messages
  const mockMessages = [
    {
      id: 1,
      sender: 'Player2',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      message: 'Good luck! 🎯',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: 2,
      sender: currentUser,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      message: 'Thanks! May the best strategist win 😄',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: 3,
      sender: 'Player2',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      message: 'Nice move! 👏',
      timestamp: new Date(Date.now() - 120000),
      type: 'text'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: currentUser,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleEmojiReaction = (emoji) => {
    const message = {
      id: Date.now(),
      sender: currentUser,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      message: emoji,
      timestamp: new Date(),
      type: 'emoji'
    };

    setMessages(prev => [...prev, message]);
  };

  const quickEmojis = ['👍', '😄', '🎯', '🔥', '👏', '😮', '🤔', '💪'];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={onToggle}
          className="rounded-full shadow-lg"
        >
          <Icon name="MessageCircle" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Game Chat</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
        >
          <Icon name="X" size={18} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex space-x-3 ${
              msg.sender === currentUser ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <Image
              src={msg.avatar}
              alt={`${msg.sender} avatar`}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            
            <div className={`flex-1 ${msg.sender === currentUser ? 'text-right' : ''}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {msg.sender}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              
              <div className={`
                inline-block px-3 py-2 rounded-lg max-w-xs
                ${msg.sender === currentUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
                }
                ${msg.type === 'emoji' ? 'text-2xl p-2' : ''}
              `}>
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">Player2 is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Emoji Reactions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiReaction(emoji)}
              className="p-2 text-xl hover:bg-muted rounded-lg strategic-transition"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            variant="default"
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;