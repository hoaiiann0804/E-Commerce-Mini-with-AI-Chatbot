class KeywordGeneratorService {
  /**
   * Generate search keywords for a product
   */
  generateKeywords(productData) {
    const keywords = new Set();

    // Extract from product name
    if (productData.name) {
      const nameWords = this.extractWords(productData.name);
      nameWords.forEach((word) => keywords.add(word));
    }

    // Extract from short description
    if (productData.shortDescription) {
      const descWords = this.extractWords(productData.shortDescription);
      descWords.forEach((word) => keywords.add(word));
    }

    // Extract from description
    if (productData.description) {
      const descWords = this.extractWords(productData.description);
      descWords.forEach((word) => keywords.add(word));
    }

    // Extract from category
    if (productData.category) {
      const categoryWords = this.extractWords(productData.category);
      categoryWords.forEach((word) => keywords.add(word));
    }

    // Add brand keywords based on product name
    const brandKeywords = this.extractBrandKeywords(productData.name);
    brandKeywords.forEach((keyword) => keywords.add(keyword));

    // Add category-specific keywords
    const categoryKeywords = this.getCategoryKeywords(productData);
    categoryKeywords.forEach((keyword) => keywords.add(keyword));

    // Convert to array and filter
    return Array.from(keywords)
      .filter((keyword) => keyword.length > 2) // Remove short words
      .map((keyword) => keyword.toLowerCase())
      .slice(0, 20); // Limit to 20 keywords
  }

  /**
   * Extract meaningful words from text
   */
  extractWords(text) {
    if (!text) return [];

    // Remove special characters and split
    const words = text
      .toLowerCase()
      .replace(
        /[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g,
        ' '
      )
      .split(/\s+/)
      .filter((word) => word.length > 2);

    // Remove common stop words
    const stopWords = [
      'của',
      'với',
      'cho',
      'và',
      'hoặc',
      'the',
      'for',
      'with',
      'and',
      'or',
    ];
    return words.filter((word) => !stopWords.includes(word));
  }

  /**
   * Extract brand keywords from product name
   */
  extractBrandKeywords(productName) {
    if (!productName) return [];

    const brandMappings = {
      // Giày thể thao
      nike: ['nike', 'swoosh', 'just do it'],
      adidas: ['adidas', '3-stripes', 'three stripes'],
      converse: ['converse', 'chuck taylor', 'all star'],
      vans: ['vans', 'off the wall'],
      puma: ['puma', 'suede'],

      // Áo thun
      uniqlo: ['uniqlo', 'ut', 'heattech'],
      champion: ['champion', 'reverse weave'],

      // Túi xách
      'louis vuitton': ['lv', 'louis vuitton', 'neverfull', 'monogram'],
      gucci: ['gucci', 'gg', 'marmont'],
      'michael kors': ['mk', 'michael kors', 'jet set'],

      // Đồng hồ
      rolex: ['rolex', 'submariner', 'datejust', 'oyster'],
      casio: ['casio', 'g-shock', 'edifice'],

      // Kính mắt
      'ray-ban': ['ray-ban', 'rayban', 'aviator', 'wayfarer'],
      oakley: ['oakley', 'holbrook', 'frogskins'],
    };

    const keywords = [];
    const lowerName = productName.toLowerCase();

    for (const [brand, brandKeywords] of Object.entries(brandMappings)) {
      if (lowerName.includes(brand)) {
        keywords.push(...brandKeywords);
      }
    }

    return keywords;
  }

  /**
   * Get category-specific keywords
   */
  getCategoryKeywords(productData) {
    const keywords = [];
    const name = (productData.name || '').toLowerCase();
    const category = (productData.category || '').toLowerCase();
    const description = (productData.shortDescription || '').toLowerCase();

    // Giày thể thao
    if (
      name.includes('giày') ||
      name.includes('shoe') ||
      name.includes('sneaker') ||
      category.includes('giày') ||
      description.includes('giày')
    ) {
      keywords.push(
        'giày',
        'shoes',
        'sneaker',
        'footwear',
        'thể thao',
        'sport'
      );
    }

    // Áo thun
    if (
      name.includes('áo') ||
      name.includes('shirt') ||
      name.includes('tshirt') ||
      category.includes('áo') ||
      description.includes('áo')
    ) {
      keywords.push('áo', 'shirt', 'tshirt', 'top', 'clothing', 'fashion');
    }

    // Túi xách
    if (
      name.includes('túi') ||
      name.includes('bag') ||
      category.includes('túi') ||
      description.includes('túi')
    ) {
      keywords.push('túi', 'bag', 'handbag', 'purse', 'accessory');
    }

    // Balo
    if (
      name.includes('balo') ||
      name.includes('backpack') ||
      category.includes('balo') ||
      description.includes('balo')
    ) {
      keywords.push('balo', 'backpack', 'bag', 'school', 'travel');
    }

    // Đồng hồ
    if (
      name.includes('đồng hồ') ||
      name.includes('watch') ||
      category.includes('đồng hồ') ||
      description.includes('đồng hồ')
    ) {
      keywords.push('đồng hồ', 'watch', 'timepiece', 'accessory');
    }

    // Kính mắt
    if (
      name.includes('kính') ||
      name.includes('glasses') ||
      name.includes('sunglasses') ||
      category.includes('kính') ||
      description.includes('kính')
    ) {
      keywords.push('kính', 'glasses', 'sunglasses', 'eyewear', 'accessory');
    }

    return keywords;
  }

  /**
   * Update keywords for existing product
   */
  async updateProductKeywords(product) {
    const keywords = this.generateKeywords({
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      category: product.category,
    });

    await product.update({ searchKeywords: keywords });
    return keywords;
  }

  /**
   * Bulk update keywords for all products
   */
  async updateAllProductKeywords() {
    const { Product } = require('../models');

    try {
      const products = await Product.findAll({
        where: { status: 'active' },
      });

      console.log(`🔄 Updating keywords for ${products.length} products...`);

      for (const product of products) {
        const keywords = this.generateKeywords({
          name: product.name,
          shortDescription: product.shortDescription,
          description: product.description,
          category: product.category,
        });

        await product.update({ searchKeywords: keywords });
        console.log(`✅ Updated keywords for: ${product.name}`);
      }

      console.log('🎉 All product keywords updated successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error updating product keywords:', error);
      throw error;
    }
  }
}

module.exports = new KeywordGeneratorService();
