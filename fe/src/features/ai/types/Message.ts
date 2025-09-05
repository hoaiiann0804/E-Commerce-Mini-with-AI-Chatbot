import { ProductRecommendation, ChatAction } from '../services/chatbotApi';

// Định nghĩa kiểu dữ liệu cho tin nhắn
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isLoading?: boolean;
  suggestions?: string[];
  products?: ProductRecommendation[];
  actions?: ChatAction[];
}
