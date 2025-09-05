import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  height?: number;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class EditorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('EditorErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const {
        height = 200,
        placeholder = 'Nhập nội dung...',
        value = '',
        onChange,
      } = this.props;

      return (
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            padding: '12px',
            minHeight: `${height}px`,
            backgroundColor: '#fff2f0',
            color: '#ff4d4f',
          }}
        >
          <p>
            ❌ Rich Text Editor gặp lỗi. Đang sử dụng editor đơn giản thay thế.
          </p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            Lỗi: {this.state.error?.message || 'Unknown error'}
          </p>
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            style={{
              width: '100%',
              minHeight: `${height - 80}px`,
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              backgroundColor: 'transparent',
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default EditorErrorBoundary;
