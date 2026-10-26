import { create } from 'zustand';
import type { BookCategory } from '../types/book';

export type CategoryFilterValue = 'ALL' | BookCategory;

interface FilterState {
  searchKeyword: string;
  selectedCategory: CategoryFilterValue;
  setSearchKeyword: (keyword: string) => void;
  setSelectedCategory: (category: CategoryFilterValue) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchKeyword: '',
  selectedCategory: 'ALL',
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  resetFilters: () => set({ searchKeyword: '', selectedCategory: 'ALL' }),
}));
