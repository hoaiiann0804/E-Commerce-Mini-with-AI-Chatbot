import React from 'react';

interface StatusIconProps {
  className?: string;
  size?: number;
  status?: 'online' | 'offline' | 'loading';
}

const StatusIcon: React.FC<StatusIconProps> = ({
  className = '',
  size = 8,
  status = 'online',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'text-green-400';
      case 'offline':
        return 'text-red-400';
      case 'loading':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-${size / 4} h-${size / 4} rounded-full ${getStatusColor()} ${
          status === 'online' || status === 'loading' ? 'animate-pulse' : ''
        }`}
        style={{ width: size, height: size }}
      />
      {status === 'online' && (
        <div
          className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping"
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
};

export default StatusIcon;
