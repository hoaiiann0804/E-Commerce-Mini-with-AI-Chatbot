const {
  Product,
  Category,
  Order,
  OrderItem,
  User,
  Cart,
  CartItem,
  sequelize,
} = require('../models');
const { Op } = require('sequelize');
const chatbotService = require('../services/chatbot.service');
const geminiChatbotService = require('../services/geminiChatbot.service');

// Initialize Gemini AI only if API key is available
let genAI = null;
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'demo-key') {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
} catch (error) {
  console.log('Google Generative AI not available, using fallback responses');
}

class ChatbotController {
  /**
   * Handle chat message with AI intelligence
   */
  async handleMessage(req, res) {
    try {
      const { message, userId, sessionId, context = {} } = req.body;
      console.log('Received chatbot message:', { message, userId, sessionId });

      if (!message?.trim()) {
        return res.status(400).json({
          status: 'error',
          message: 'Message is required',
        });
      }

      // Use Gemini AI service for intelligent response
      const response = await geminiChatbotService.handleMessage(message, {
        userId,
        sessionId,
        ...context,
      });

      res.json({
        status: 'success',
        data: response,
      });
    } catch (error) {
      console.error('Chatbot error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({
        status: 'error',
        message: 'Failed to process message',
        data: {
          response:
            'Xin lỗi, tôi đang gặp một chút vấn đề. Vui lòng thử lại sau ít phút nhé! 😅',
          suggestions: ['Xem sản phẩm hot', 'Tìm khuyến mãi', 'Liên hệ hỗ trợ'],
        },
      });
    }
  }

  /**
   * Handle product search queries
   */
  async handleProductSearch(message, intent, userProfile, context) {
    try {
      // Extract search parameters from natural language
      const searchParams = chatbotService.extractSearchParams(message);

      // Get products from database
      const products = await this.searchProducts(searchParams);

      // Generate AI response
      const aiResponse = await this.generateAIResponse(
        `Tìm sản phẩm: ${message}`,
        { products, userProfile, searchParams }
      );

      // Create product recommendations
      const productCards = products.slice(0, 5).map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        thumbnail: product.thumbnail,
        inStock: product.inStock,
        rating: product.rating || 4.5,
        discount: product.compareAtPrice
          ? Math.round(
              ((product.compareAtPrice - product.price) /
                product.compareAtPrice) *
                100
            )
          : 0,
      }));

      return {
        response: aiResponse,
        products: productCards,
        suggestions: [
          'Xem thêm sản phẩm tương tự',
          'So sánh giá',
          'Xem khuyến mãi',
          'Thêm vào giỏ hàng',
        ],
        actions:
          products.length > 0
            ? [
                {
                  type: 'view_products',
                  label: `Xem tất cả ${products.length} sản phẩm`,
                  url: `/products?search=${encodeURIComponent(message)}`,
                },
              ]
            : [],
      };
    } catch (error) {
      console.error('Product search error:', error);
      throw error;
    }
  }

  /**
   * Handle product recommendation requests
   */
  async handleProductRecommendation(message, intent, userProfile, context) {
    try {
      const recommendations =
        await chatbotService.getPersonalizedRecommendations(
          userProfile?.id,
          intent.params
        );

      const aiResponse = await this.generateAIResponse(
        `Gợi ý sản phẩm: ${message}`,
        { recommendations, userProfile }
      );

      return {
        response: aiResponse,
        products: recommendations,
        suggestions: [
          'Xem chi tiết sản phẩm',
          'So sánh các sản phẩm',
          'Tìm sản phẩm tương tự',
          'Thêm vào giỏ hàng',
        ],
      };
    } catch (error) {
      console.error('Product recommendation error:', error);
      throw error;
    }
  }

  /**
   * Handle sales pitch - the money-making magic! 💰
   */
  async handleSalesPitch(message, intent, userProfile, context) {
    try {
      // Get best deals and trending products
      const bestDeals = await this.getBestDeals();
      const trendingProducts = await this.getTrendingProducts();

      // Personalize pitch based on user profile
      const personalizedPitch = await chatbotService.generateSalesPitch({
        userProfile,
        message,
        bestDeals,
        trendingProducts,
        context,
      });

      return {
        response: personalizedPitch.text,
        products: personalizedPitch.products,
        suggestions: [
          '💳 Mua ngay - Ưu đãi có hạn!',
          '🛒 Thêm vào giỏ hàng',
          '💝 Xem thêm khuyến mãi',
          '📱 Liên hệ tư vấn',
        ],
        actions: [
          {
            type: 'urgent_deals',
            label: '🔥 Ưu đai sắp hết hạn - Mua ngay!',
            url: '/deals',
          },
          {
            type: 'bestsellers',
            label: '⭐ Sản phẩm bán chạy nhất',
            url: '/bestsellers',
          },
        ],
      };
    } catch (error) {
      console.error('Sales pitch error:', error);
      throw error;
    }
  }

  /**
   * Handle order inquiry requests
   */
  async handleOrderInquiry(message, intent, userProfile, context) {
    try {
      const aiResponse = await this.generateAIResponse(
        `Hỗ trợ đơn hàng: ${message}`,
        { userProfile }
      );

      return {
        response: aiResponse,
        suggestions: [
          'Kiểm tra trạng thái đơn hàng',
          'Thông tin giao hàng',
          'Hủy đơn hàng',
          'Liên hệ hỗ trợ',
        ],
      };
    } catch (error) {
      console.error('Order inquiry error:', error);
      throw error;
    }
  }

  /**
   * Handle support requests
   */
  async handleSupport(message, intent, userProfile, context) {
    try {
      const aiResponse = await this.generateAIResponse(
        `Hỗ trợ khách hàng: ${message}`,
        { userProfile }
      );

      return {
        response: aiResponse,
        suggestions: [
          'Chính sách đổi trả',
          'Hướng dẫn mua hàng',
          'Thông tin bảo hành',
          'Liên hệ hotline',
        ],
      };
    } catch (error) {
      console.error('Support error:', error);
      throw error;
    }
  }

  /**
   * Handle general conversation
   */
  async handleGeneral(message, intent, userProfile, context) {
    try {
      // Always try to steer conversation toward sales
      const salesOpportunity = await chatbotService.findSalesOpportunity(
        message,
        userProfile
      );

      let response;
      if (salesOpportunity.found) {
        response = await this.handleSalesPitch(
          message,
          salesOpportunity.intent,
          userProfile,
          context
        );
      } else {
        const aiResponse = await this.generateAIResponse(message, {
          userProfile,
        });
        response = {
          response: aiResponse,
          suggestions: [
            'Tìm sản phẩm hot 🔥',
            'Xem khuyến mãi 🎉',
            'Sản phẩm bán chạy ⭐',
            'Hỗ trợ mua hàng 💬',
          ],
        };
      }

      return response;
    } catch (error) {
      console.error('General conversation error:', error);
      throw error;
    }
  }

  /**
   * AI-powered product search
   */
  async aiProductSearch(req, res) {
    try {
      const { query, userId, limit = 10 } = req.body;

      if (!query?.trim()) {
        return res.status(400).json({
          status: 'error',
          message: 'Search query is required',
        });
      }

      const searchParams = chatbotService.extractSearchParams(query);
      const products = await this.searchProducts({ ...searchParams, limit });

      res.json({
        status: 'success',
        data: {
          query,
          results: products,
          total: products.length,
        },
      });
    } catch (error) {
      console.error('AI product search error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Search failed',
      });
    }
  }

  /**
   * Get personalized recommendations
   */
  async getRecommendations(req, res) {
    try {
      const { userId, limit = 5, type = 'personal' } = req.query;

      const recommendations =
        await chatbotService.getPersonalizedRecommendations(userId, {
          type,
          limit: parseInt(limit),
        });

      res.json({
        status: 'success',
        data: {
          recommendations,
          type,
        },
      });
    } catch (error) {
      console.error('Recommendations error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to get recommendations',
      });
    }
  }

  /**
   * Track chatbot analytics
   */
  async trackAnalytics(req, res) {
    try {
      const { event, userId, sessionId, productId, value, metadata } = req.body;

      await chatbotService.trackAnalytics({
        event,
        userId,
        sessionId,
        productId,
        value,
        metadata,
        timestamp: new Date(),
      });

      res.json({
        status: 'success',
        message: 'Analytics tracked successfully',
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to track analytics',
      });
    }
  }

  /**
   * Add product to cart via chatbot
   */
  async addToCart(req, res) {
    try {
      const { productId, variantId, quantity = 1, sessionId } = req.body;
      const userId = req.user.id;

      // Get or create cart
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      // Add item to cart
      const cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        variantId,
        quantity,
      });

      // Track analytics
      await chatbotService.trackAnalytics({
        event: 'product_added_to_cart',
        userId,
        sessionId,
        productId,
        metadata: { quantity, source: 'chatbot' },
        timestamp: new Date(),
      });

      res.json({
        status: 'success',
        message: 'Product added to cart successfully',
        data: { cartItem },
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to add product to cart',
      });
    }
  }

  // Helper methods
  async searchProducts(searchParams) {
    const where = {
      status: 'active',
      inStock: true,
    };

    // Add search conditions
    if (searchParams.keyword) {
      // Vietnamese to English keyword mapping
      const keywordMapping = {
        giày: ['shoes', 'shoe', 'sneaker', 'nike', 'adidas'],
        'giày thể thao': [
          'shoes',
          'sneaker',
          'running shoes',
          'nike',
          'adidas',
        ],
        'thể thao': ['sport', 'sports', 'running', 'nike', 'adidas'],
        áo: ['shirt', 'tshirt', 't-shirt'],
        'áo thun': ['tshirt', 't-shirt', 'shirt'],
        quần: ['pants', 'jeans', 'trousers'],
        túi: ['bag', 'backpack'],
        balo: ['backpack', 'bag'],
        'phụ kiện': ['accessories', 'accessory'],
        'đồng hồ': ['watch', 'watches'],
        kính: ['glasses', 'sunglasses'],
        mũ: ['hat', 'cap'],
      };

      const originalKeyword = searchParams.keyword.toLowerCase();
      let searchTerms = [originalKeyword];

      // Add mapped English terms if Vietnamese keyword is found
      Object.keys(keywordMapping).forEach((viKeyword) => {
        if (originalKeyword.includes(viKeyword)) {
          searchTerms = [...searchTerms, ...keywordMapping[viKeyword]];
        }
      });

      // Create search conditions for all terms
      const searchConditions = [];
      searchTerms.forEach((term) => {
        searchConditions.push(
          { name: { [Op.iLike]: `%${term}%` } },
          { description: { [Op.iLike]: `%${term}%` } }
        );
      });

      where[Op.or] = searchConditions;
    }

    if (searchParams.minPrice) {
      where.price = { [Op.gte]: searchParams.minPrice };
    }

    if (searchParams.maxPrice) {
      where.price = { ...where.price, [Op.lte]: searchParams.maxPrice };
    }

    if (searchParams.category) {
      // Add category filter logic
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
      limit: searchParams.limit || 20,
      order: [['createdAt', 'DESC']],
    });

    return products;
  }

  async getBestDeals() {
    return await Product.findAll({
      where: {
        status: 'active',
        inStock: true,
        compareAtPrice: { [Op.gt]: 0 },
      },
      order: [
        [
          // Order by discount percentage
          sequelize.literal(
            '((compare_at_price - price) / compare_at_price) DESC'
          ),
        ],
      ],
      limit: 10,
    });
  }

  async getTrendingProducts() {
    // This could be based on order frequency, views, etc.
    return await Product.findAll({
      where: {
        status: 'active',
        inStock: true,
        featured: true,
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });
  }

  async generateAIResponse(prompt, context = {}) {
    try {
      if (!genAI) {
        // Fallback to template response if no AI available
        return this.getTemplateResponse(prompt, context);
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const enhancedPrompt = `
        Bạn là trợ lý bán hàng thông minh của Shopmini - một cửa hàng thời trang trực tuyến.
        Mục tiêu chính của bạn là giúp khách hàng tìm và mua sản phẩm phù hợp.
        
        Ngữ cảnh: ${JSON.stringify(context)}
        Câu hỏi khách hàng: ${prompt}
        
        Hãy trả lời một cách:
        - Thân thiện và chuyên nghiệp
        - Tập trung vào việc bán hàng
        - Đề xuất sản phẩm cụ thể khi có thể
        - Tạo cảm giác cấp bách để khuyến khích mua hàng
        - Sử dụng emoji phù hợp để tạo sự thân thiện
        
        Độ dài: Khoảng 2-3 câu, ngắn gọn nhưng hiệu quả.
      `;

      const result = await model.generateContent(enhancedPrompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('AI response generation error:', error.message || error);
      return this.getTemplateResponse(prompt, context);
    }
  }

  getTemplateResponse(prompt, context) {
    const templates = [
      'Tôi hiểu bạn đang tìm kiếm sản phẩm phù hợp! 😊 Để giúp bạn tốt nhất, hãy cho tôi biết thêm chi tiết về sở thích của bạn nhé.',
      'Chào bạn! 👋 Shopmini có rất nhiều sản phẩm tuyệt vời. Bạn quan tâm đến loại sản phẩm nào nhất?',
      'Cảm ơn bạn đã quan tâm! 🌟 Tôi sẽ giúp bạn tìm những sản phẩm tốt nhất với giá ưu đãi.',
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Simple message handler for testing
   */
  async handleSimpleMessage(req, res) {
    try {
      const { message, userId, sessionId, context = {} } = req.body;
      if (process.env.NODE_ENV !== 'production') {
        console.log('Received simple message:', { message, userId, sessionId });
      }

      if (!message?.trim()) {
        return res.status(400).json({
          status: 'error',
          message: 'Message is required',
        });
      }

      // Simple response
      const response = {
        response: `Chào bạn! Bạn vừa nói: "${message}". Tôi là trợ lý AI của Shopmini! 😊`,
        suggestions: [
          'Tìm sản phẩm hot 🔥',
          'Xem khuyến mãi 🎉',
          'Sản phẩm bán chạy ⭐',
          'Hỗ trợ mua hàng 💬',
        ],
      };

      res.json({
        status: 'success',
        data: response,
      });
    } catch (error) {
      console.error('Simple message error:', error.message || error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to process simple message',
      });
    }
  }
}

module.exports = ChatbotController;
