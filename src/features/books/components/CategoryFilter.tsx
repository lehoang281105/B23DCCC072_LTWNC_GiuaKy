import React from 'react';
import { useFilterStore, type CategoryFilterValue } from '../../../store/useFilterStore';

const CATEGORIES: { label: string; value: CategoryFilterValue }[] = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'CNTT', value: 'CNTT' },
  { label: 'Kinh tế', value: 'Kinh tế' },
  { label: 'Ngoại ngữ', value: 'Ngoại ngữ' },
];

export const CategoryFilter: React.FC = () => {
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const setSelectedCategory = useFilterStore((state) => state.setSelectedCategory);

  return (
    <div className="category-filter-bar" role="tablist" aria-label="Bộ lọc thể loại sách">
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-pill ${isActive ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
