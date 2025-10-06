import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <header className="w-full flex justify-between items-center mb-8 max-w-6xl mx-auto">
        {/* <h1 className="text-3xl font-bold">{title}</h1> */}
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Log Out
        </button>
      </header>
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;