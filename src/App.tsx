import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastWarning } from './components/ToastWarning';
import { DiscoverPage } from './pages/DiscoverPage';
import { MyLibraryPage } from './pages/MyLibraryPage';

const StatsPageLazy = React.lazy(() => import('./pages/StatsPage'));

const PageFallback: React.FC = () => (
  <div className="loading-box" style={{ height: '50vh' }}>
    <div className="spinner" />
    <p style={{ fontWeight: 600 }}>Đang nạp dữ liệu thống kê...</p>
  </div>
);

export const App: React.FC = () => {
  return (
    <div className="app-layout">
      <ToastWarning />
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<DiscoverPage />} />
            <Route path="/my-library" element={<MyLibraryPage />} />
            <Route path="/stats" element={<StatsPageLazy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
