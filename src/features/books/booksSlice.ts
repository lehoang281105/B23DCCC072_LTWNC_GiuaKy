import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types/book';
import { fetchBooks } from '../../api/booksApi';
import { isApiSuccess } from '../../types/api';

export interface BooksState {
  items: Book[];
  borrowedBookIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  warningMessage: string | null;
}

export const initialState: BooksState = {
  items: [],
  borrowedBookIds: [],
  status: 'idle',
  error: null,
  warningMessage: null,
};

export const fetchBooksThunk = createAsyncThunk<
  Book[],
  boolean | undefined,
  { rejectValue: string }
>('books/fetchBooks', async (simulateError = false, { rejectWithValue }) => {
  const response = await fetchBooks(simulateError);

  if (isApiSuccess(response)) {
    return response.data;
  }

  return rejectWithValue(response.error);
});

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const bookId = action.payload;
      const targetBook = state.items.find((b) => b.id === bookId);

      if (targetBook && targetBook.availableCopies > 0) {
        targetBook.availableCopies -= 1;
        if (!state.borrowedBookIds.includes(bookId)) {
          state.borrowedBookIds.push(bookId);
        }
        state.warningMessage = null;
      }
    },
    returnBook(state, action: PayloadAction<string>) {
      const bookId = action.payload;
      const targetBook = state.items.find((b) => b.id === bookId);

      if (targetBook && state.borrowedBookIds.includes(bookId)) {
        targetBook.availableCopies += 1;
        state.borrowedBookIds = state.borrowedBookIds.filter((id) => id !== bookId);
        state.warningMessage = null;
      }
    },
    setBorrowWarning(state, action: PayloadAction<string>) {
      state.warningMessage = action.payload;
    },
    clearBorrowWarning(state) {
      state.warningMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBooksThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Đã xảy ra lỗi khi tải sách!';
      });
  },
});

export const { borrowBook, returnBook, setBorrowWarning, clearBorrowWarning } = booksSlice.actions;
export default booksSlice.reducer;
