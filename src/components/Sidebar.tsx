import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Compass, BarChart2, Library } from 'lucide-react';
import { useAppSelector } from '../app/hooks';

export const Sidebar: React.FC = () => {
  const borrowedBookIds = useAppSelector((state) => state.books.borrowedBookIds);

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <BookOpen size={22} />
        </div>
        <span className="sidebar-logo-text">BookBase</span>
      </NavLink>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Compass size={18} />
          <span>Khám phá</span>
        </NavLink>

        <NavLink
          to="/my-library"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Library size={18} />
          <span>Sách đang mượn</span>
          <span className="nav-badge">{borrowedBookIds.length}/3</span>
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BarChart2 size={18} />
          <span>Thống kê</span>
        </NavLink>
      </nav>
    </aside>
  );
};
