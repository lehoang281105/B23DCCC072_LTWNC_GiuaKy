import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { returnBook } from '../features/books/booksSlice';
import { BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyLibraryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: books, borrowedBookIds } = useAppSelector((state) => state.books);

  const borrowedBooks = useMemo(() => {
    return books.filter((book) => borrowedBookIds.includes(book.id));
  }, [books, borrowedBookIds]);

  const handleReturn = (id: string) => {
    dispatch(returnBook(id));
  };

  return (
    <div className="content-body" style={{ flexDirection: 'column' }}>
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '26px' }}>
            Sách Đang Mượn Của Tôi
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Theo dõi và quản lý những cuốn sách bạn đang mượn từ thư viện khoa.
          </p>
        </div>

        <div
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            backgroundColor:
              borrowedBookIds.length >= 3
                ? 'var(--danger-light)'
                : 'var(--success-light)',
            color:
              borrowedBookIds.length >= 3
                ? 'var(--danger)'
                : 'var(--success)',
            fontWeight: 700,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: `1px solid ${
              borrowedBookIds.length >= 3 ? 'var(--danger)' : 'var(--success)'
            }`,
          }}
        >
          {borrowedBookIds.length >= 3 ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle size={18} />
          )}
          <span>Đã mượn: {borrowedBookIds.length} / 3 cuốn (Tối đa)</span>
        </div>
      </div>

      {borrowedBooks.length === 0 ? (
        <div
          className="loading-box"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px dashed var(--border-color)',
            borderRadius: '20px',
            padding: '60px 20px',
          }}
        >
          <BookOpen size={48} color="var(--primary)" style={{ marginBottom: '16px', opacity: 0.8 }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
            Bạn chưa mượn cuốn sách nào
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>
            Hãy khám phá kho sách chuyên ngành và chọn sách bạn yêu thích để học tập!
          </p>
          <Link to="/" className="btn btn-primary">
            Khám phá sách ngay
          </Link>
        </div>
      ) : (
        <div className="book-grid">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-card-cover">
                <img src={book.coverUrl} alt={book.title} />
                <div className="book-spine-effect" />
              </div>
              <div className="book-card-info">
                <div className="book-card-header">
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="book-card-author">{book.author}</p>
                </div>

                <div className="book-card-meta">
                  <span className="badge badge-cntt">{book.category}</span>
                  <span className="badge" style={{ backgroundColor: 'var(--bg-pill)' }}>
                    Năm: {book.publishYear}
                  </span>
                </div>

                <div className="book-card-actions">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleReturn(book.id)}
                    aria-label={`Trả sách ${book.title}`}
                  >
                    Trả sách
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
