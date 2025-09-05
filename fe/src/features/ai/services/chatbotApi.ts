import { api } from '@/services/api';

export interface ChatbotMessage {
  message: string;
  userId?: string;
  sessionId?: string;
  context?: Record<string, any>;
}

export interface ChatbotResponse {
  response: string;
  suggestions?: string[];
  products?: ProductRecommendation[];
  actions?: ChatAction[];
  sessionId?: string;
}

export interface ChatbotApiResponse {
  status: 'success' | 'error';
  data?: ChatbotResponse;
  message?: string;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  thumbnail: string;
  inStock: boolean;
  rating: number;
  discount: number;
}

export interface ChatAction {
  type: string;
  label: string;
  url?: string;
  data?: Record<string, any>;
}

export interface ProductSearchRequest {
  query: string;
  userId?: string;
  limit?: number;
}

export interface RecommendationRequest {
  userId?: string;
  limit?: number;
  type?: 'trending' | 'personal' | 'similar' | 'deals';
}

export interface AnalyticsEvent {
  event:
    | 'message_sent'
    | 'product_clicked'
    | 'product_added_to_cart'
    | 'purchase_completed';
  userId?: string;
  sessionId?: string;
  productId?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface AddToCartRequest {
  productId: string;
  variantId?: string;
  quantity?: number;
  sessionId?: string;
}

// Enhanced chatbot API with full backend integration
export const chatbotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Send message to AI chatbot
    sendChatbotMessage: builder.mutation<ChatbotApiResponse, ChatbotMessage>({
      query: (message) => ({
        url: '/chatbot/message',
        method: 'POST',
        body: message,
      }),
    }),

    // AI-powered product search
    searchProductsWithAI: builder.mutation<
      { query: string; results: ProductRecommendation[]; total: number },
      ProductSearchRequest
    >({
      query: (searchRequest) => ({
        url: '/chatbot/products/search',
        method: 'POST',
        body: searchRequest,
      }),
    }),

    // Get personalized recommendations
    getChatbotRecommendations: builder.query<
      { recommendations: ProductRecommendation[]; type: string },
      RecommendationRequest
    >({
      query: (params) => ({
        url: '/chatbot/recommendations',
        params,
      }),
    }),

    // Track analytics
    trackChatbotAnalytics: builder.mutation<
      { message: string },
      AnalyticsEvent
    >({
      query: (event) => ({
        url: '/chatbot/analytics',
        method: 'POST',
        body: event,
      }),
    }),

    // Add to cart via chatbot
    addToCartViaChatbot: builder.mutation<
      { message: string; cartItem: any },
      AddToCartRequest
    >({
      query: (request) => ({
        url: '/chatbot/cart/add',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useSendChatbotMessageMutation,
  useSearchProductsWithAIMutation,
  useGetChatbotRecommendationsQuery,
  useTrackChatbotAnalyticsMutation,
  useAddToCartViaChatbotMutation,
} = chatbotApi;
