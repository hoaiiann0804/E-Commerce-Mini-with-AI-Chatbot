import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';

interface BankTransferQRProps {
  amount: number;
  orderId: string;
}

const BankTransferQR: React.FC<BankTransferQRProps> = ({ amount, orderId }) => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Tạo mã QR với thông tin chuyển khoản thực tế
  const bankInfo = {
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    accountName: 'NGUYEN VAN A',
    amount: amount,
    reference: orderId,
  };

  // Tạo nội dung QR theo chuẩn VietQR (giả lập)
  const qrContent = `Bank: ${bankInfo.bankName}
Account: ${bankInfo.accountNumber}
Name: ${bankInfo.accountName}
Amount: ${bankInfo.amount.toLocaleString('vi-VN')} VND
Reference: ${bankInfo.reference}`;

  const qrImageUrl =
    'https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&margin=10&data=' +
    encodeURIComponent(qrContent);

  // Hàm copy text
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
        {t('checkout.bankTransfer.title')}
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 mb-2">
              {t('checkout.bankTransfer.scanQRCode')}
            </p>
            <div className="bg-white p-4 rounded-lg flex justify-center">
              <img
                src={qrImageUrl}
                alt="QR Code for bank transfer"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              {t('checkout.bankTransfer.qrInstructions')}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
            {t('checkout.bankTransfer.bankDetails')}
          </h4>

          <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
            <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-700 pb-2">
              <span className="text-neutral-500 dark:text-neutral-400">
                {t('checkout.bankTransfer.bankName')}
              </span>
              <span className="font-medium">{bankInfo.bankName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-700 pb-2">
              <span className="text-neutral-500 dark:text-neutral-400">
                {t('checkout.bankTransfer.accountNumber')}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium font-mono">
                  {bankInfo.accountNumber}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(bankInfo.accountNumber, 'accountNumber')
                  }
                  className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                  title="Copy account number"
                >
                  {copiedField === 'accountNumber' ? (
                    <CheckOutlined className="text-green-500 text-sm" />
                  ) : (
                    <CopyOutlined className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-sm" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-700 pb-2">
              <span className="text-neutral-500 dark:text-neutral-400">
                {t('checkout.bankTransfer.accountName')}
              </span>
              <span className="font-medium">{bankInfo.accountName}</span>
            </div>

            <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-700 pb-2">
              <span className="text-neutral-500 dark:text-neutral-400">
                {t('checkout.bankTransfer.amount')}
              </span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {bankInfo.amount.toLocaleString('vi-VN')} VND
              </span>
            </div>

            <div className="flex justify-between items-center pb-2">
              <span className="text-neutral-500 dark:text-neutral-400">
                {t('checkout.bankTransfer.reference')}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium font-mono text-blue-600 dark:text-blue-400">
                  {bankInfo.reference}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(bankInfo.reference, 'reference')
                  }
                  className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                  title="Copy reference"
                >
                  {copiedField === 'reference' ? (
                    <CheckOutlined className="text-green-500 text-sm" />
                  ) : (
                    <CopyOutlined className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-sm" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              {t('checkout.bankTransfer.noteReference')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          {t('checkout.bankTransfer.afterPayment')}
        </h4>
        <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>{t('checkout.bankTransfer.step1')}</li>
          <li>{t('checkout.bankTransfer.step2')}</li>
          <li>{t('checkout.bankTransfer.step3')}</li>
        </ul>
      </div>
    </div>
  );
};

export default BankTransferQR;
