import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { geminiService } from '../services/geminiService';

const AIStatusIndicator: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(geminiService.getStatus());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Cập nhật status mỗi 5 giây
    const interval = setInterval(() => {
      setStatus(geminiService.getStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (status.ready && status.hasApiKey) return 'text-green-500';
    if (status.ready && !status.hasApiKey) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (status.ready && status.hasApiKey) {
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (status.ready && !status.hasApiKey) {
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const getStatusText = () => {
    if (status.ready && status.hasApiKey) return 'Gemini AI Active';
    if (status.ready && !status.hasApiKey) return 'Demo Mode';
    return 'AI Offline';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full border ${getStatusColor()} border-current bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors`}
      >
        {getStatusIcon()}
        <span>{getStatusText()}</span>
      </button>

      {showDetails && (
        <div className="absolute bottom-full right-0 mb-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-4 z-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200">
                AI Status
              </h4>
              <button
                onClick={() => setShowDetails(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Model Ready:
                </span>
                <span
                  className={status.ready ? 'text-green-500' : 'text-red-500'}
                >
                  {status.ready ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  API Key:
                </span>
                <span
                  className={
                    status.hasApiKey ? 'text-green-500' : 'text-yellow-500'
                  }
                >
                  {status.hasApiKey ? 'Configured' : 'Demo Mode'}
                </span>
              </div>
              {status.error && (
                <div className="text-red-500 text-xs">
                  Error: {status.error}
                </div>
              )}
            </div>

            {!status.hasApiKey && (
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                <h5 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                  Enable Gemini AI
                </h5>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <p>
                    1. Get API key from{' '}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Google AI Studio
                    </a>
                  </p>
                  <p>2. Add to .env file:</p>
                  <code className="block bg-neutral-100 dark:bg-neutral-700 p-2 rounded text-xs">
                    VITE_GEMINI_API_KEY=your_api_key_here
                  </code>
                  <p>3. Restart the development server</p>
                </div>
              </div>
            )}

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
              <h5 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Features
              </h5>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      status.ready && status.hasApiKey
                        ? 'text-green-500'
                        : 'text-neutral-400'
                    }
                  >
                    {status.ready && status.hasApiKey ? '✓' : '○'}
                  </span>
                  <span>Smart product recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      status.ready && status.hasApiKey
                        ? 'text-green-500'
                        : 'text-neutral-400'
                    }
                  >
                    {status.ready && status.hasApiKey ? '✓' : '○'}
                  </span>
                  <span>Natural language understanding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      status.ready && status.hasApiKey
                        ? 'text-green-500'
                        : 'text-neutral-400'
                    }
                  >
                    {status.ready && status.hasApiKey ? '✓' : '○'}
                  </span>
                  <span>Context-aware responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Multilingual support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStatusIndicator;
