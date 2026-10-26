import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { borrowBook } from '../src/features/books/booksSlice';
import { borrowLimitMiddleware } from '../src/middleware/borrowLimitMiddleware';
import type { Book } from '../src/types/book';

const mockBook = (id: string): Book => ({
  id,
  title: `Book ${id}`,
  author: 'Author',
  category: 'CNTT',
  publishYear: 2024,
  totalCopies: 5,
  availableCopies: 5,
  coverUrl: '/cover.jpg',
  description: 'Test description',
  pages: 200,
  rating: 4.5,
});

describe('borrowLimitMiddleware', () => {
  const createTestStore = (initialBorrowedCount = 0) => {
    const preloadedBooks: Book[] = [mockBook('1'), mockBook('2'), mockBook('3'), mockBook('4')];
    const preloadedBorrowedIds = preloadedBooks.slice(0, initialBorrowedCount).map((b) => b.id);

    return configureStore({
      reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: {
          items: preloadedBooks,
          borrowedBookIds: preloadedBorrowedIds,
          status: 'succeeded' as const,
          error: null,
          warningMessage: null,
        },
      },
      middleware: (getDefault) => getDefault().concat(borrowLimitMiddleware),
    });
  };

  it('cho phép mượn sách khi sinh viên đang mượn dưới 3 cuốn', () => {
    const store = createTestStore(2); // Đang mượn 2 cuốn
    store.dispatch(borrowBook('3'));

    const state = store.getState().books;
    expect(state.borrowedBookIds).toContain('3');
    expect(state.warningMessage).toBeNull();
  });

  it('chặn mượn sách và phát cảnh báo khi sinh viên đã mượn đủ 3 cuốn', () => {
    const store = createTestStore(3); // Đã mượn 3 cuốn
    store.dispatch(borrowBook('4'));

    const state = store.getState().books;
    expect(state.borrowedBookIds).not.toContain('4');
    expect(state.warningMessage).toContain('Mỗi sinh viên chỉ được mượn tối đa 3 cuốn');
  });
});
