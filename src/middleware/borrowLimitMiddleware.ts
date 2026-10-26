import type { Middleware } from '@reduxjs/toolkit';
import { borrowBook, setBorrowWarning } from '../features/books/booksSlice';

export const borrowLimitMiddleware: Middleware = (storeApi) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const state = storeApi.getState() as { books: { borrowedBookIds: string[] } };
    const currentBorrowedCount = state.books?.borrowedBookIds?.length ?? 0;

    if (currentBorrowedCount >= 3) {
      storeApi.dispatch(
        setBorrowWarning('Mỗi sinh viên chỉ được mượn tối đa 3 cuốn cùng lúc! Vui lòng trả bớt sách trước khi mượn thêm.')
      );
      return;
    }
  }

  return next(action);
};
