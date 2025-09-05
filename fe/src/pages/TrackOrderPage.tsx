import { useState } from 'react';
import Button from '@/components/common/Button';

interface TrackingStep {
  status: string;
  date: string;
  location: string;
  description: string;
  completed: boolean;
}

interface TrackingResult {
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  currentStatus: string;
  steps: TrackingStep[];
}

const TrackOrderPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(
    null
  );
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate API call to track order
    setTimeout(() => {
      setIsSubmitting(false);

      // For demo purposes, only show tracking info for a specific order number
      if (orderNumber === '10058429' && email.includes('@')) {
        setTrackingResult({
          orderNumber: '10058429',
          trackingNumber: 'TRK7891234567',
          carrier: 'Express Shipping Co.',
          estimatedDelivery: 'June 15, 2023',
          currentStatus: 'In Transit',
          steps: [
            {
              status: 'Order Placed',
              date: 'June 10, 2023 - 10:23 AM',
              location: 'Online',
              description:
                'Your order has been received and payment confirmed.',
              completed: true,
            },
            {
              status: 'Processing',
              date: 'June 11, 2023 - 9:45 AM',
              location: 'Warehouse',
              description: 'Your order is being prepared for shipment.',
              completed: true,
            },
            {
              status: 'Shipped',
              date: 'June 12, 2023 - 2:30 PM',
              location: 'Distribution Center',
              description: 'Your order has been shipped and is on its way.',
              completed: true,
            },
            {
              status: 'In Transit',
              date: 'June 13, 2023 - 11:15 AM',
              location: 'Regional Sorting Facility',
              description:
                'Your package is in transit to the delivery location.',
              completed: true,
            },
            {
              status: 'Out for Delivery',
              date: 'Pending',
              location: 'Local Delivery Center',
              description: 'Your package is out for delivery.',
              completed: false,
            },
            {
              status: 'Delivered',
              date: 'Pending',
              location: 'Delivery Address',
              description: 'Your package has been delivered.',
              completed: false,
            },
          ],
        });
      } else {
        setError(
          'We couldn&apos;t find tracking information for the provided order number and email. Please check your information and try again.'
        );
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Track Your Order
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Enter your order details below to check the current status of your
          shipment.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!trackingResult ? (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Enter Order Information
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., 10058429"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Your order number can be found in your order confirmation
                  email.
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="The email used for your order"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  For demo, use order number: 10058429
                </p>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Tracking...' : 'Track Order'}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  Order #{trackingResult.orderNumber}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Tracking Number: {trackingResult.trackingNumber}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Carrier: {trackingResult.carrier}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-1">
                  {trackingResult.currentStatus}
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Estimated Delivery: {trackingResult.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Tracking timeline */}
            <div className="relative">
              {trackingResult.steps.map((step, index) => (
                <div key={index} className="mb-8 relative">
                  {/* Vertical line connecting steps */}
                  {index < trackingResult.steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-full -ml-px ${
                        step.completed &&
                        trackingResult.steps[index + 1].completed
                          ? 'bg-primary-500'
                          : 'bg-neutral-300 dark:bg-neutral-600'
                      }`}
                    ></div>
                  )}

                  <div className="flex items-start">
                    {/* Status circle */}
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                        step.completed
                          ? 'bg-primary-500'
                          : 'bg-neutral-300 dark:bg-neutral-600'
                      } flex-shrink-0 mr-4`}
                    >
                      {step.completed && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>

                    {/* Step details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h3
                          className={`font-semibold ${
                            step.completed
                              ? 'text-neutral-900 dark:text-white'
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {step.status}
                        </h3>
                        <span
                          className={`text-sm ${
                            step.completed
                              ? 'text-neutral-600 dark:text-neutral-400'
                              : 'text-neutral-500 dark:text-neutral-500'
                          }`}
                        >
                          {step.date}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          step.completed
                            ? 'text-neutral-600 dark:text-neutral-400'
                            : 'text-neutral-500 dark:text-neutral-500'
                        }`}
                      >
                        {step.location}
                      </p>
                      <p
                        className={`mt-1 text-sm ${
                          step.completed
                            ? 'text-neutral-600 dark:text-neutral-400'
                            : 'text-neutral-500 dark:text-neutral-500'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <button
                  onClick={() => {
                    setTrackingResult(null);
                    setOrderNumber('');
                    setEmail('');
                  }}
                  className="mb-4 sm:mb-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  Track Another Order
                </button>
                <div className="flex space-x-4">
                  <Button variant="outline">Contact Support</Button>
                  <Button variant="primary">View Order Details</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help section */}
        <div className="mt-12 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Need Help?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            If you&apos;re having trouble tracking your order or have questions
            about your shipment, our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-neutral-700 dark:text-neutral-300">
                support@shopmini.com
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-neutral-700 dark:text-neutral-300">
                +1 (555) 123-4567
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
