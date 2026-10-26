import React from 'react';
import type { Book } from '../../../types/book';

export interface BookCardProps {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  onSelectBook?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = React.memo(
  function BookCard({ book, isBorrowed, onBorrow, onReturn, onSelectBook }) {
    const isOutOfStock = book.availableCopies <= 0;

    const getCategoryClass = (category: string) => {
      switch (category) {
        case 'CNTT':
          return 'badge-cntt';
        case 'Kinh tế':
          return 'badge-kinhte';
        case 'Ngoại ngữ':
          return 'badge-ngoaingu';
        default:
          return 'badge-cntt';
      }
    };

    return (
      <div className="book-card" data-testid={`book-card-${book.id}`}>
        <div
          className="book-card-cover"
          onClick={() => onSelectBook?.(book)}
          title={`Xem chi tiết cuốn ${book.title}`}
        >
          <img src={book.coverUrl} alt={book.title} loading="lazy" />
          <div className="book-spine-effect" />
        </div>

        <div className="book-card-info">
          <div className="book-card-header">
            <h3
              className="book-card-title"
              onClick={() => onSelectBook?.(book)}
              title={book.title}
            >
              {book.title}
            </h3>
            <p className="book-card-author">{book.author}</p>
          </div>

          <div className="book-card-meta">
            <span className={`badge ${getCategoryClass(book.category)}`}>
              {book.category}
            </span>
            <span className="badge" style={{ backgroundColor: 'var(--bg-pill)' }}>
              Năm: {book.publishYear}
            </span>
            <span
              className={`badge badge-copies ${isOutOfStock ? 'out' : ''}`}
            >
              {isOutOfStock ? 'Hết bản' : `Còn ${book.availableCopies} bản`}
            </span>
          </div>

          <div className="book-card-actions">
            {isBorrowed ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onReturn(book.id)}
                aria-label={`Trả sách ${book.title}`}
              >
                Trả sách
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onBorrow(book.id)}
                disabled={isOutOfStock}
                aria-label={`Mượn sách ${book.title}`}
              >
                Mượn
              </button>
            )}

            {onSelectBook && (
              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 10px' }}
                onClick={() => onSelectBook(book)}
              >
                Chi tiết
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.book.id === nextProps.book.id &&
    prevProps.book.availableCopies === nextProps.book.availableCopies &&
    prevProps.isBorrowed === nextProps.isBorrowed &&
    prevProps.onBorrow === nextProps.onBorrow &&
    prevProps.onReturn === nextProps.onReturn
);
