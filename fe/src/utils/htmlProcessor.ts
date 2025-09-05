/**
 * HTML Processing Utilities
 */

export const processHtmlForEditor = (content: string): string => {
  if (!content || typeof content !== 'string') return '';

  let processedContent = content;

  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = processedContent;
  processedContent = textarea.value;

  return processedContent;
};
