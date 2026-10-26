import React from 'react';
import type { Book } from '../../../types/book';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  borrowedBookIds: string[];
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  onSelectBook: (book: Book) => void;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  borrowedBookIds,
  onBorrow,
  onReturn,
  onSelectBook,
}) => {
  if (books.length === 0) {
    return (
      <div className="loading-box" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-muted)' }}>
          Không tìm thấy sách nào phù hợp với bộ lọc hiện tại.
        </p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => {
        const isBorrowed = borrowedBookIds.includes(book.id);
        return (
          <BookCard
            key={book.id}
            book={book}
            isBorrowed={isBorrowed}
            onBorrow={onBorrow}
            onReturn={onReturn}
            onSelectBook={onSelectBook}
          />
        );
      })}
    </div>
  );
};
