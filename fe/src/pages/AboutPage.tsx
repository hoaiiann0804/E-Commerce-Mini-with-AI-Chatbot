import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          About ShopMini
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          We&apos;re on a mission to provide high-quality products at affordable
          prices with exceptional customer service.
        </p>
      </div>

      {/* Our story section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
            Our Story
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Founded in 2023, ShopMini started with a simple idea: make shopping
            easier, more enjoyable, and accessible to everyone. What began as a
            small online store has grown into a platform offering thousands of
            products across multiple categories.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Our team is passionate about curating the best products and creating
            a seamless shopping experience. We carefully select each item in our
            inventory to ensure it meets our standards for quality, value, and
            sustainability.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            As we continue to grow, our commitment to customer satisfaction
            remains at the heart of everything we do. We&apos;re constantly
            improving our platform, expanding our product range, and finding new
            ways to delight our customers.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            alt="Our team working"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values section */}
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-12 mb-20">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality',
              description:
                'We never compromise on quality. Every product we offer is carefully selected and tested to ensure it meets our high standards.',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
            },
            {
              title: 'Customer First',
              description:
                'Our customers are at the center of everything we do. We strive to provide exceptional service and support at every step of your shopping journey.',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ),
            },
            {
              title: 'Innovation',
              description:
                'We&apos;re constantly looking for new ways to improve our platform and offer innovative products that make your life better and more convenient.',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              role: 'Founder & CEO',
              image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            },
            {
              name: 'Michael Chen',
              role: 'CTO',
              image:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            },
            {
              name: 'Emily Rodriguez',
              role: 'Head of Product',
              image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            },
            {
              name: 'David Kim',
              role: 'Customer Experience',
              image:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
          Explore our wide range of products and discover why thousands of
          customers choose ShopMini for their shopping needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Browse Products
          </Link>
          <Link
            to="/contact"
            className="bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 font-medium py-3 px-6 rounded-lg hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
