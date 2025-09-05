export const CHAT_WIDGET_CONFIG = {
  DEFAULT_SIZE: { width: 384, height: 600 },
  MIN_SIZE: { width: 300, height: 400 },
  MAX_SIZE: { width: 800, height: 800 },
  POSITION_OFFSET: { bottom: 100 },
  STORAGE_KEYS: {
    SIZE: 'chatWidgetSize',
  },
  ANIMATION_DURATION: {
    TOGGLE: 300,
    MESSAGE: 500,
    RESIZE: 200,
  },
} as const;

export const RESIZE_HANDLE_STYLES = {
  bottom: { cursor: 's-resize', height: '10px' },
  bottomRight: { cursor: 'se-resize', width: '20px', height: '20px' },
  right: { cursor: 'e-resize', width: '10px' },
  top: { cursor: 'n-resize', height: '10px' },
  left: { cursor: 'w-resize', width: '10px' },
  topRight: { cursor: 'ne-resize', width: '20px', height: '20px' },
  bottomLeft: { cursor: 'sw-resize', width: '20px', height: '20px' },
  topLeft: { cursor: 'nw-resize', width: '20px', height: '20px' },
} as const;

export const RESIZE_HANDLE_CLASSES = {
  bottom: 'bg-transparent hover:bg-primary-500/10 transition-colors',
  bottomRight:
    'bg-transparent hover:bg-primary-500/20 transition-colors rounded-tl-lg',
  right: 'bg-transparent hover:bg-primary-500/10 transition-colors',
  top: 'bg-transparent hover:bg-primary-500/10 transition-colors',
  left: 'bg-transparent hover:bg-primary-500/10 transition-colors',
  topRight: 'bg-transparent hover:bg-primary-500/20 transition-colors',
  bottomLeft: 'bg-transparent hover:bg-primary-500/20 transition-colors',
  topLeft: 'bg-transparent hover:bg-primary-500/20 transition-colors',
} as const;

export const GREETING_MESSAGE = {
  id: 'greeting',
  text: 'Chào bạn! Tôi là trợ lý AI của Shopmini! 😊 Tôi có thể giúp bạn tìm sản phẩm, xem khuyến mãi và hỗ trợ mua hàng. Bạn cần gì nhỉ?',
  sender: 'ai' as const,
  suggestions: [
    'Tìm sản phẩm hot 🔥',
    'Xem khuyến mãi 🎉',
    'Sản phẩm bán chạy ⭐',
    'Hỗ trợ mua hàng 💬',
  ],
} as const;
