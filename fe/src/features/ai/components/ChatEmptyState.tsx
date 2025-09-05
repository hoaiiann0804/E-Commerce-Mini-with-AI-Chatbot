import React from 'react';
import { BotIcon } from './icons';

const ChatEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200 dark:from-primary-900/40 dark:via-primary-800/30 dark:to-primary-700/40 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-primary-100/50 dark:ring-primary-800/30">
        <BotIcon size={40} className="text-primary-600 dark:text-primary-400" />
      </div>
      <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
        Chào mừng bạn! 👋
      </h4>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
        Tôi là AI Assistant, sẵn sàng giúp bạn tìm sản phẩm và tư vấn mua hàng.
      </p>
    </div>
  );
};

export default ChatEmptyState;
