import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook để tự động scroll lên đầu trang khi chuyển trang
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll lên đầu trang mỗi khi pathname thay đổi
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Thêm hiệu ứng smooth scroll
    });
  }, [pathname]);
};
