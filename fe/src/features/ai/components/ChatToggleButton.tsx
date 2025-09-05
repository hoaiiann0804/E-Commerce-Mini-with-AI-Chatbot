import React from 'react';
import { useTranslation } from 'react-i18next';
import { BotIcon, CloseIcon, SparkleIcon, StatusIcon } from './icons';
import { geminiService } from '../services/geminiService';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: (event?: React.MouseEvent) => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  isOpen,
  onClick,
}) => {
  const { t } = useTranslation();
  const isAIReady = geminiService.isReady();

  return (
    <button
      onClick={onClick}
      className="chat-toggle-button group relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 text-white rounded-full p-4 shadow-2xl hover:shadow-primary-500/25 transform hover:scale-110 transition-all duration-300 flex items-center justify-center ring-4 ring-primary-500/20 hover:ring-primary-500/40"
      aria-label={isOpen ? t('chat.closeChat') : t('chat.openChat')}
    >
      {/* Pulse animation when closed */}
      {!isOpen && (
        <>
          <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-30" />
          <div className="absolute inset-0 rounded-full bg-primary-300 animate-ping opacity-20 animation-delay-75" />
        </>
      )}

      {/* AI Status indicator */}
      <div className="absolute -top-1 -right-1">
        <StatusIcon
          size={20}
          status={isAIReady ? 'online' : 'loading'}
          className="bg-white rounded-full p-1 shadow-lg"
        />
      </div>

      {/* Main Icon */}
      <div className="relative">
        {isOpen ? (
          <CloseIcon
            size={28}
            className="transform transition-transform duration-300 rotate-180"
          />
        ) : (
          <>
            <BotIcon
              size={28}
              className="transform transition-transform duration-300 group-hover:scale-110"
            />
            {/* AI sparkle effect */}
            <div className="absolute -top-1 -right-1">
              <SparkleIcon
                size={12}
                className="text-yellow-300 animate-pulse"
              />
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default ChatToggleButton;
