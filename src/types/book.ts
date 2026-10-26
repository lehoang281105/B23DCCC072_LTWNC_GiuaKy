export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  publishYear: number;
  totalCopies: number;
  availableCopies: number;
  coverUrl: string;
  description: string;
  pages: number;
  rating: number;
}

export type BookPreview = Pick<
  Book,
  'id' | 'title' | 'author' | 'category' | 'coverUrl' | 'availableCopies'
>;

export type BookSummary = Readonly<Omit<Book, 'description'>>;

export type CategoryStats = Record<BookCategory, number>;

export type BookUpdatePayload = Partial<Omit<Book, 'id'>>;

export interface LibraryStats {
  categoryCounts: CategoryStats;
  totalTitles: number;
  totalBorrowed: number;
}
