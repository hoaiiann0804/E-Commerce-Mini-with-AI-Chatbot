import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Header from './Header';
import Footer from './Footer';
// Không cần import ChatWidget ở đây nữa vì đã được thêm vào App.tsx
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useCartMerge } from '@/hooks/useCartMerge';

const MainLayout: React.FC = () => {
  // Sử dụng hook để scroll lên đầu trang khi chuyển trang
  useScrollToTop();

  // Get auth state for cart merging
  const { isAuthenticated, justLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  // Handle cart merge when user login
  useCartMerge(isAuthenticated, justLoggedIn);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 sm:pt-18 lg:pt-20">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      {/* ChatWidget đã được thêm vào App.tsx */}
    </div>
  );
};

export default MainLayout;
