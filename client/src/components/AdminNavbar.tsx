import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineBell } from 'react-icons/ai';

const AdminNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/'); 
  };

  return (
    <nav className="relative flex items-center justify-between px-4 py-4 bg-transparent">
      <Link to="/admin" className="text-xl font-bold text-white">
        <span className="text-yellow-400">ASSESSMENT </span>PLATFORM
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white md:hidden focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 md:hidden transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="fixed top-0 right-0 h-full w-1/2 bg-black bg-opacity-70 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4 text-right">
            <Link to="/admin" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>HOME</Link>
            <Link to="/admin/users" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>USERS</Link>
            <Link to="/admin/assessments" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>ASSESSMENTS</Link>
            <Link to="/admin/reports" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>REPORTS</Link>
            <Link to="/admin/settings" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>SETTINGS</Link>
            <Link to="/admin/audit-logs" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>AUDIT LOGS</Link>
            <Link to="/admin/proctoring" className="text-white text-xl hover:text-yellow-400" onClick={() => setIsOpen(false)}>AI PROCTORING</Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white text-center"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex md:space-x-8">
        <Link to="/admin" className="text-white hover:text-yellow-400">HOME</Link>
        <Link to="/admin/users" className="text-white hover:text-yellow-400">USERS</Link>
        <Link to="/admin/assessments" className="text-white hover:text-yellow-400">ASSESSMENTS</Link>
        <Link to="/admin/reports" className="text-white hover:text-yellow-400">REPORTS</Link>
        <Link to="/admin/settings" className="text-white hover:text-yellow-400">SETTINGS</Link>
        <Link to="/admin/audit-logs" className="text-white hover:text-yellow-400">AUDIT LOGS</Link>
        <Link to="/admin/proctoring" className="text-white hover:text-yellow-400">AI PROCTORING</Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative">
          <AiOutlineBell className="text-white text-2xl" />
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white text-center hidden md:block"
        >
          SIGN OUT
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
