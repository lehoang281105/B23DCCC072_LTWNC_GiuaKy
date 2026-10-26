import booksReducer, {
  borrowBook,
  returnBook,
  setBorrowWarning,
  clearBorrowWarning,
  fetchBooksThunk,
  initialState,
  type BooksState,
} from '../src/features/books/booksSlice';
import type { Book } from '../src/types/book';

const mockBook1: Book = {
  id: 'b-1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishYear: 2008,
  totalCopies: 5,
  availableCopies: 3,
  coverUrl: 'https://example.com/cover1.jpg',
  description: 'Clean Code description',
  pages: 464,
  rating: 4.8,
};

const mockBook2: Book = {
  id: 'b-2',
  title: 'Kinh tế học vĩ mô',
  author: 'N. Gregory Mankiw',
  category: 'Kinh tế',
  publishYear: 2020,
  totalCopies: 4,
  availableCopies: 0,
  coverUrl: 'https://example.com/cover2.jpg',
  description: 'Macroeconomics description',
  pages: 580,
  rating: 4.5,
};

describe('booksSlice reducer', () => {
  it('1. Trả về initial state khi action không xác định', () => {
    const state = booksReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('2. borrowBook giảm số bản khả dụng đi 1 và thêm sách vào danh sách đang mượn', () => {
    const currentState: BooksState = {
      items: [{ ...mockBook1, availableCopies: 3 }],
      borrowedBookIds: [],
      status: 'succeeded',
      error: null,
      warningMessage: null,
    };

    const nextState = booksReducer(currentState, borrowBook('b-1'));
    expect(nextState.items[0].availableCopies).toBe(2);
    expect(nextState.borrowedBookIds).toContain('b-1');
  });

  it('3. returnBook tăng số bản khả dụng lên 1 và gỡ sách khỏi danh sách đang mượn', () => {
    const currentState: BooksState = {
      items: [{ ...mockBook1, availableCopies: 2 }],
      borrowedBookIds: ['b-1'],
      status: 'succeeded',
      error: null,
      warningMessage: null,
    };

    const nextState = booksReducer(currentState, returnBook('b-1'));
    expect(nextState.items[0].availableCopies).toBe(3);
    expect(nextState.borrowedBookIds).not.toContain('b-1');
  });

  it('4. fetchBooksThunk.pending chuyển status sang "loading" và reset error', () => {
    const state = booksReducer(
      { ...initialState, error: 'Lỗi cũ' },
      { type: fetchBooksThunk.pending.type }
    );
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('5. fetchBooksThunk.fulfilled lưu danh sách sách và chuyển status sang "succeeded"', () => {
    const payload = [mockBook1, mockBook2];
    const state = booksReducer(initialState, {
      type: fetchBooksThunk.fulfilled.type,
      payload,
    });
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(payload);
  });

  it('6. fetchBooksThunk.rejected lưu thông báo lỗi và chuyển status sang "failed"', () => {
    const errorMessage = 'Không thể kết nối đến máy chủ thư viện!';
    const state = booksReducer(initialState, {
      type: fetchBooksThunk.rejected.type,
      payload: errorMessage,
      error: { message: errorMessage },
    });
    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  it('7. setBorrowWarning và clearBorrowWarning cập nhật chính xác warningMessage', () => {
    const warningText = 'Mỗi sinh viên chỉ được mượn tối đa 3 cuốn!';
    const stateWithWarning = booksReducer(initialState, setBorrowWarning(warningText));
    expect(stateWithWarning.warningMessage).toBe(warningText);

    const clearedState = booksReducer(stateWithWarning, clearBorrowWarning());
    expect(clearedState.warningMessage).toBeNull();
  });
});
