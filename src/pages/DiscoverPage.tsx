import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchBooksThunk, borrowBook, returnBook } from '../features/books/booksSlice';
import { useFilterStore } from '../store/useFilterStore';
import { useDebounce } from '../hooks/useDebounce';
import type { Book } from '../types/book';
import { RecommendedSection } from '../features/books/components/RecommendedSection';
import { CategoryFilter } from '../features/books/components/CategoryFilter';
import { BookGrid } from '../features/books/components/BookGrid';
import { BookDetailDrawer } from '../features/books/components/BookDetailDrawer';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: books, status, error, borrowedBookIds } = useAppSelector(
    (state) => state.books
  );

  const rawSearchKeyword = useFilterStore((state) => state.searchKeyword);
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const debouncedSearchKeyword = useDebounce<string>(rawSearchKeyword, 300);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooksThunk(false));
    }
  }, [status, dispatch]);

  const selectedBook = useMemo(() => {
    if (!selectedBookId) return null;
    return books.find((b) => b.id === selectedBookId) ?? null;
  }, [books, selectedBookId]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchCategory =
        selectedCategory === 'ALL' || book.category === selectedCategory;

      const keyword = debouncedSearchKeyword.trim().toLowerCase();
      const matchSearch =
        keyword === '' ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [books, selectedCategory, debouncedSearchKeyword]);

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch]
  );

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch]
  );

  const handleSelectBook = useCallback((book: Book) => {
    setSelectedBookId(book.id);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedBookId(null);
  }, []);

  const handleRetry = () => {
    dispatch(fetchBooksThunk(false));
  };

  const handleSimulateError = () => {
    dispatch(fetchBooksThunk(true));
  };

  return (
    <div className="content-body">
      <main className="content-main">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={handleSimulateError}
            title="Thử nghiệm trường hợp API giả lập bị lỗi kết nối"
          >
            <AlertCircle size={14} color="#f59e0b" />
            <span>Thử giả lập lỗi API</span>
          </button>
        </div>

        {status === 'loading' && (
          <div className="loading-box" role="status">
            <div className="spinner" />
            <p style={{ fontWeight: 600 }}>Đang tải danh sách sách từ thư viện...</p>
          </div>
        )}

        {status === 'failed' && (
          <div
            className="loading-box"
            role="alert"
            style={{
              backgroundColor: 'var(--danger-light)',
              borderRadius: '16px',
              border: '1px solid var(--danger)',
              padding: '32px',
              color: 'var(--danger)',
            }}
          >
            <AlertCircle size={40} style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              Tải danh sách sách thất bại
            </h3>
            <p style={{ fontSize: '14px', marginBottom: '16px' }}>{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRetry}
            >
              <RefreshCw size={16} />
              <span>Thử lại ngay</span>
            </button>
          </div>
        )}

        {status === 'succeeded' && (
          <>
            <RecommendedSection
              books={books}
              onSelectBook={handleSelectBook}
            />

            <div className="section-header">
              <h2 className="section-title">Danh Mục Sách</h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Hiển thị {filteredBooks.length} / {books.length} đầu sách
              </span>
            </div>

            <CategoryFilter />

            <BookGrid
              books={filteredBooks}
              borrowedBookIds={borrowedBookIds}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
              onSelectBook={handleSelectBook}
            />
          </>
        )}
      </main>

      {selectedBook && (
        <BookDetailDrawer
          book={selectedBook}
          isBorrowed={borrowedBookIds.includes(selectedBook.id)}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
};
