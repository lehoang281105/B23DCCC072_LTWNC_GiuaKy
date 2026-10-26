import { Star, BookOpen, X } from 'lucide-react';
import type { Book } from '../../../types/book';

interface BookDetailDrawerProps {
  book: Book | null;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  onClose: () => void;
}

export const BookDetailDrawer: React.FC<BookDetailDrawerProps> = ({
  book,
  isBorrowed,
  onBorrow,
  onReturn,
  onClose,
}) => {
  if (!book) return null;

  const isOutOfStock = book.availableCopies <= 0;

  return (
    <aside className="detail-panel" aria-label="Chi tiết cuốn sách">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Đóng bảng chi tiết"
        >
          <X size={20} />
        </button>
      </div>

      <div className="detail-panel-cover">
        <img src={book.coverUrl} alt={book.title} />
      </div>

      <h2 className="detail-panel-title">{book.title}</h2>
      <p className="detail-panel-author">{book.author}</p>

      <div className="detail-panel-stats">
        <div className="stat-item">
          <div className="stat-num">{book.pages}</div>
          <div className="stat-label">Trang</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{book.rating}</span>
          </div>
          <div className="stat-label">Đánh giá</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{book.availableCopies}</div>
          <div className="stat-label">Bản còn</div>
        </div>
      </div>

      <p className="detail-panel-desc">{book.description}</p>

      <div style={{ marginTop: 'auto' }}>
        {isBorrowed ? (
          <button
            type="button"
            className="btn btn-danger"
            style={{ width: '100%', padding: '12px' }}
            onClick={() => onReturn(book.id)}
          >
            Trả sách này
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
            onClick={() => onBorrow(book.id)}
            disabled={isOutOfStock}
          >
            <BookOpen size={18} />
            <span>{isOutOfStock ? 'Đã hết bản lưu hành' : 'Mượn sách ngay'}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
