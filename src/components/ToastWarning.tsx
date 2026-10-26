import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearBorrowWarning } from '../features/books/booksSlice';

export const ToastWarning: React.FC = () => {
  const warningMessage = useAppSelector((state) => state.books.warningMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (warningMessage) {
      const timer = setTimeout(() => {
        dispatch(clearBorrowWarning());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage, dispatch]);

  if (!warningMessage) return null;

  return (
    <div className="toast-container" role="alert" aria-live="assertive">
      <div className="toast-warning">
        <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>
            Thông báo giới hạn mượn sách
          </div>
          <div style={{ fontSize: '13px', lineHeight: 1.4 }}>{warningMessage}</div>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearBorrowWarning())}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            color: 'inherit',
            opacity: 0.7,
          }}
          aria-label="Đóng thông báo"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
