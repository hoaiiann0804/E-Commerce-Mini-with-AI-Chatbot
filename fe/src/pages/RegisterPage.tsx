import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@/components/common/Button';
import { PremiumButton } from '@/components/common';
import Input from '@/components/common/Input';
import { useRegisterMutation } from '@/services/authApi';
import { loginSuccess } from '@/features/auth/authSlice';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      phone?: string;
    } = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = 'Tên không được để trống';
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Họ không được để trống';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email không được để trống';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log('🚀 Attempting registration with:', {
        email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      const result = await register({
        email,
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || '', // Phone is optional
      }).unwrap();

      console.log('✅ Registration successful:', result);

      // Show success message to user
      setSuccessMessage(
        result.message ||
          'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.'
      );

      // Clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
      setErrors({});

      // Auto redirect after 3 seconds to give user time to read the message
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    } catch (err: any) {
      console.log('❌ Registration failed:', err);
      // Clear any previous success message
      setSuccessMessage('');
      // Error is already handled by RTK Query and displayed in UI
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              Tạo tài khoản mới
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Đăng ký để trở thành thành viên và nhận nhiều ưu đãi
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-medium">{successMessage}</p>
                  <p className="text-sm mt-1">
                    Bạn sẽ được chuyển đến trang đăng nhập sau 3 giây...
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && !successMessage && (
            <div className="mb-6 p-4 bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400 rounded-lg">
              {typeof error === 'string'
                ? error
                : (error as any)?.data?.message ||
                  (error as any)?.message ||
                  'Đăng ký thất bại. Vui lòng thử lại!'}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Input
                  type="text"
                  label="Tên *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  error={errors.firstName}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Họ *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nhập họ của bạn"
                  error={errors.lastName}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <Input
                type="email"
                label="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email"
                error={errors.email}
                required
              />
            </div>

            <div className="mb-6">
              <Input
                type="tel"
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại (không bắt buộc)"
                error={errors.phone}
              />
            </div>

            <div className="mb-6">
              <Input
                type="password"
                label="Mật khẩu *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu tối thiểu 6 ký tự"
                error={errors.password}
                required
              />
            </div>

            <div className="mb-6">
              <Input
                type="password"
                label="Xác nhận mật khẩu *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                error={errors.confirmPassword}
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  required
                />
                <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Tôi đồng ý với{' '}
                  <Link
                    to="/terms"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Điều khoản dịch vụ
                  </Link>{' '}
                  và{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Chính sách bảo mật
                  </Link>
                </span>
              </label>
            </div>

            <div className="mb-6">
              <PremiumButton
                variant="success"
                size="large"
                iconType="check"
                isProcessing={isLoading}
                processingText="Đang tạo tài khoản..."
                onClick={handleSubmit}
                className="w-full h-12"
              >
                Tạo tài khoản
              </PremiumButton>
            </div>
          </form>

          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Đã có tài khoản?{' '}
              <Link
                to="/login"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
