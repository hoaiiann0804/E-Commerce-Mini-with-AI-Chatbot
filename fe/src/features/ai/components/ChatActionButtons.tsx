import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatAction {
  type: string;
  label: string;
  url?: string;
  data?: Record<string, any>;
}

interface ChatActionButtonsProps {
  actions: ChatAction[];
  onActionClick?: (action: ChatAction) => void;
}

const ChatActionButtons: React.FC<ChatActionButtonsProps> = ({
  actions,
  onActionClick,
}) => {
  const navigate = useNavigate();

  if (!actions || actions.length === 0) {
    return null;
  }

  const handleActionClick = (action: ChatAction) => {
    onActionClick?.(action);

    if (action.url) {
      if (action.url.startsWith('http')) {
        window.open(action.url, '_blank');
      } else {
        navigate(action.url);
      }
    }
  };

  const getActionStyle = (actionType: string) => {
    switch (actionType) {
      case 'urgent_deals':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transform hover:scale-105 animate-pulse';
      case 'bestsellers':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg';
      case 'view_products':
        return 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-neutral-100 to-neutral-200 hover:from-neutral-200 hover:to-neutral-300 text-neutral-800 border border-neutral-300';
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => handleActionClick(action)}
          className={`
            w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
            ${getActionStyle(action.type)}
          `}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ChatActionButtons;
