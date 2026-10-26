import React, { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import type { CategoryStats } from '../types/book';
import { Code, TrendingUp, Languages, BookMarked, Layers, CheckCircle } from 'lucide-react';

const StatsPage: React.FC = () => {
  const { items: books, borrowedBookIds } = useAppSelector((state) => state.books);

  const stats = useMemo(() => {
    const categoryCounts: CategoryStats = {
      CNTT: 0,
      'Kinh tế': 0,
      'Ngoại ngữ': 0,
    };

    let totalAvailable = 0;
    let totalCopies = 0;

    books.forEach((book) => {
      if (categoryCounts[book.category] !== undefined) {
        categoryCounts[book.category] += 1;
      }
      totalAvailable += book.availableCopies;
      totalCopies += book.totalCopies;
    });

    return {
      categoryCounts,
      totalTitles: books.length,
      totalAvailable,
      totalCopies,
      totalBorrowedByStudent: borrowedBookIds.length,
    };
  }, [books, borrowedBookIds]);

  return (
    <div className="content-body" style={{ flexDirection: 'column' }}>
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '26px' }}>
            Báo Cáo & Thống Kê Thư Viện Khoa
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Tổng quan số lượng đầu sách theo từng chuyên ngành và tình trạng mượn trả hiện tại.
          </p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div
              className="stat-card-icon"
              style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)', color: '#2563eb' }}
            >
              <Layers size={26} />
            </div>
            <div className="stat-card-content">
              <h3>Tổng Số Đầu Sách</h3>
              <p>{stats.totalTitles}</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-card-icon"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}
            >
              <BookMarked size={26} />
            </div>
            <div className="stat-card-content">
              <h3>Số Sách Đang Mượn (Cá nhân)</h3>
              <p>{stats.totalBorrowedByStudent} / 3</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-card-icon"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}
            >
              <CheckCircle size={26} />
            </div>
            <div className="stat-card-content">
              <h3>Tổng Bản Đang Sẵn Sàng</h3>
              <p>{stats.totalAvailable}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-title" style={{ fontSize: '18px', marginBottom: '16px' }}>
            Số Đầu Sách Theo Từng Thể Loại Chuyên Ngành
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div
                className="stat-card-icon"
                style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', color: '#2563eb' }}
              >
                <Code size={26} />
              </div>
              <div className="stat-card-content">
                <h3>Công Nghệ Thông Tin (CNTT)</h3>
                <p>{stats.categoryCounts.CNTT} đầu sách</p>
              </div>
            </div>

            <div className="stat-card">
              <div
                className="stat-card-icon"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
              >
                <TrendingUp size={26} />
              </div>
              <div className="stat-card-content">
                <h3>Kinh Tế</h3>
                <p>{stats.categoryCounts['Kinh tế']} đầu sách</p>
              </div>
            </div>

            <div className="stat-card">
              <div
                className="stat-card-icon"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}
              >
                <Languages size={26} />
              </div>
              <div className="stat-card-content">
                <h3>Ngoại Ngữ</h3>
                <p>{stats.categoryCounts['Ngoại ngữ']} đầu sách</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
