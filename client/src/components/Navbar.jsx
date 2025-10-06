    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';

    const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
                <span className="ml-2 text-xl font-bold text-gray-900">Applicant Tracker</span>
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                {user ? (
                <>
                    <Link
                    to="/admin/applicants"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Daftar Pelamar
                    </Link>
                    <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                    Logout
                    </button>
                </>
                ) : (
                <Link
                    to="/login"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                    Login Admin
                </Link>
                )}
            </div>
            </div>
        </div>
        </nav>
    );
    };

    export default Navbar;