import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useFilterStore } from '../store/useFilterStore';
import { useAppSelector } from '../app/hooks';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const searchKeyword = useFilterStore((state) => state.searchKeyword);
  const setSearchKeyword = useFilterStore((state) => state.setSearchKeyword);
  const borrowedBookIds = useAppSelector((state) => state.books.borrowedBookIds);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm sách theo tên hoặc tác giả..."
          value={searchKeyword}
          onChange={handleSearchChange}
          aria-label="Tìm kiếm sách"
        />
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          onClick={toggleTheme}
          className="notification-badge"
          style={{ cursor: 'pointer', border: '1px solid var(--border-color)' }}
          title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
          aria-label="Chuyển đổi giao diện sáng tối"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div
          className="notification-badge"
          title={`Bạn đang mượn ${borrowedBookIds.length}/3 cuốn`}
        >
          <Bell size={20} />
          {borrowedBookIds.length > 0 && (
            <span className="notification-count">{borrowedBookIds.length}</span>
          )}
        </div>

        <div className="user-profile">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Sinh viên Balogun"
            className="user-avatar"
          />
          <div>
            <div className="user-name">Nguyễn Văn A</div>
            <div className="user-role">Sinh viên • PTIT</div>
          </div>
        </div>
      </div>
    </header>
  );
};
