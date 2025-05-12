import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/navbar';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
};
