/**
 * Utility functions for text processing
 */

/**
 * Remove HTML tags and extract plain text
 */
export const stripHtml = (html: string): string => {
  if (!html) return '';

  // Create a temporary div element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Remove script and style elements
  const scripts = tempDiv.querySelectorAll('script, style');
  scripts.forEach((el) => el.remove());

  // Get text content and clean it up
  const text = tempDiv.textContent || tempDiv.innerText || '';

  // Clean up extra whitespace and newlines
  return text.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim();
};

/**
 * Extract keywords from text
 */
export const extractKeywords = (
  text: string,
  maxKeywords: number = 10
): string[] => {
  if (!text) return [];

  // Convert to lowercase and remove special characters
  const cleanText = text
    .toLowerCase()
    .replace(
      /[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();

  // Split into words
  const words = cleanText.split(' ');

  // Common stop words in Vietnamese and English
  const stopWords = new Set([
    'và',
    'của',
    'có',
    'là',
    'được',
    'cho',
    'với',
    'từ',
    'trong',
    'trên',
    'dưới',
    'về',
    'để',
    'khi',
    'nếu',
    'như',
    'sẽ',
    'đã',
    'đang',
    'các',
    'những',
    'này',
    'đó',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
    'mười',
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'from',
    'up',
    'about',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'between',
    'among',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'must',
    'can',
    'this',
    'that',
    'these',
    'those',
    'a',
    'an',
  ]);

  // Filter out stop words and short words
  const filteredWords = words.filter(
    (word) => word.length >= 3 && !stopWords.has(word) && !/^\d+$/.test(word) // Remove pure numbers
  );

  // Count word frequency
  const wordCount = new Map<string, number>();
  filteredWords.forEach((word) => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });

  // Sort by frequency and take top keywords
  const sortedWords = Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);

  return sortedWords;
};

/**
 * Generate search keywords from product data
 */
export const generateSearchKeywords = (
  name: string,
  description: string,
  shortDescription?: string,
  maxKeywords: number = 15
): string[] => {
  const allText = [
    name || '',
    shortDescription || '',
    stripHtml(description || ''),
  ].join(' ');

  const keywords = extractKeywords(allText, maxKeywords);

  // Add product name words as priority keywords
  if (name) {
    const nameWords = name
      .toLowerCase()
      .replace(
        /[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g,
        ' '
      )
      .split(' ')
      .filter((word) => word.length >= 2);

    // Merge and deduplicate
    const allKeywords = [...nameWords, ...keywords];
    const uniqueKeywords = Array.from(new Set(allKeywords));

    return uniqueKeywords.slice(0, maxKeywords);
  }

  return keywords;
};
