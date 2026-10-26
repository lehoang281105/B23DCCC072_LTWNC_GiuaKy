import React from 'react';
import type { Book } from '../../../types/book';

interface RecommendedSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  books,
  onSelectBook,
}) => {
  const featuredBooks = books.slice(0, 4);

  if (featuredBooks.length === 0) return null;

  return (
    <section style={{ marginBottom: '36px' }}>
      <div className="section-header">
        <h2 className="section-title">Sách Đề Xuất Nổi Bật</h2>
        <span className="section-link">Xem tất cả</span>
      </div>

      <div className="recommended-grid">
        {featuredBooks.map((book) => (
          <div
            key={book.id}
            className="recommended-card"
            onClick={() => onSelectBook(book)}
            title={`Xem chi tiết cuốn ${book.title}`}
          >
            <div className="book-cover-3d">
              <img
                src={book.coverUrl}
                alt={book.title}
                loading="lazy"
              />
              <div className="book-spine-effect" />
            </div>
            <div className="recommended-title">{book.title}</div>
            <div className="recommended-author">{book.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
