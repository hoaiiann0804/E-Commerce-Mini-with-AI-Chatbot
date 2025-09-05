/**
 * Prompt template for product suggestions
 */
export const getProductSuggestionPrompt = (query: string) => {
  return `Bạn là trợ lý mua sắm hữu ích cho một cửa hàng thương mại điện tử.
  Người dùng đang tìm kiếm sản phẩm với yêu cầu sau: "${query}".
  Hãy gợi ý các sản phẩm phù hợp từ danh mục của chúng tôi và đặt câu hỏi làm rõ để giúp họ tìm chính xác thứ họ cần.
  Hãy trả lời một cách thân thiện và tự nhiên.`;
};

/**
 * Prompt template for general help
 * @param query User query
 * @param type Type of help (general, order, return, etc.)
 */
export const getGeneralHelpPrompt = (
  query: string,
  type: 'general' | 'order' | 'return' = 'general'
) => {
  let basePrompt = `Bạn là trợ lý mua sắm hữu ích cho một cửa hàng thương mại điện tử.
  Người dùng đã hỏi: "${query}".`;

  switch (type) {
    case 'order':
      basePrompt += `
      Hãy cung cấp thông tin hữu ích về quy trình đặt hàng, thanh toán, vận chuyển hoặc theo dõi đơn hàng.
      Nếu có thể, hãy hướng dẫn người dùng các bước cụ thể để hoàn thành việc đặt hàng.`;
      break;
    case 'return':
      basePrompt += `
      Hãy cung cấp thông tin về chính sách đổi trả, quy trình hoàn tiền, và cách thức liên hệ với bộ phận chăm sóc khách hàng.
      Đảm bảo giải thích rõ các điều kiện đổi trả và thời hạn áp dụng.`;
      break;
    default:
      basePrompt += `
      Cung cấp thông tin hữu ích về cửa hàng, sản phẩm, chính sách, hoặc hướng dẫn họ tìm sản phẩm.
      Giữ câu trả lời ngắn gọn và thân thiện.`;
  }

  return basePrompt;
};

/**
 * Prompt template for product recommendations
 */
export const getProductRecommendationPrompt = (productHistory: string[]) => {
  return `Bạn là trợ lý mua sắm hữu ích cho một cửa hàng thương mại điện tử.
  Dựa trên lịch sử xem/mua sản phẩm của người dùng: ${productHistory.join(', ')},
  hãy đề xuất một số sản phẩm khác mà họ có thể quan tâm.
  Giải thích ngắn gọn lý do tại sao bạn đề xuất những sản phẩm này.`;
};

/**
 * Prompt template for answering FAQs
 */
export const getFaqPrompt = (query: string) => {
  return `Bạn là trợ lý mua sắm hữu ích cho một cửa hàng thương mại điện tử.
  Người dùng có câu hỏi: "${query}".
  Hãy trả lời câu hỏi này dựa trên các thông tin phổ biến về cửa hàng, chính sách, và quy trình mua hàng.
  Giữ câu trả lời ngắn gọn, chính xác và hữu ích.`;
};
