import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

interface NavbarProps {
  toggleSignIn: () => void;
  disableSignIn?: boolean;
  disableSignUp?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ disableSignIn = false, disableSignUp = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 
  const location = useLocation();

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false); 
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  };

  const isCompatibilityPage = location.pathname === '/compatibility';

  return (
    <nav className="relative flex items-center justify-between px-4 py-4 bg-transparent">
      <Link to="/" className="text-2xl font-bold text-white">
        <span className="text-yellow-400">ASSESSMENT </span>PLATFORM
      </Link>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="self-end text-white"
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
          <Link
            to="/"
            className="text-white text-lg hover:text-yellow-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/compatibility"
            className="text-white text-lg hover:text-yellow-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            COMPATIBILITY CHECK
          </Link>
          <Link
            to="/protection"
            className="text-white text-lg hover:text-yellow-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            PROTECTION
          </Link>
          {!isCompatibilityPage && !disableSignIn && (
            <button
              onClick={handleLoginModalOpen}
              className="text-white hover:text-yellow-400"
            >
              SIGN IN
            </button>
          )}
          {!isCompatibilityPage && !disableSignUp && (
            <button
              onClick={handleRegisterModalOpen}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white text-center"
            >
              SIGN UP
            </button>
          )}
        </div>
      </div>

      <div className="hidden md:flex md:space-x-8">
        <Link
          to="/"
          className="text-white flex items-center hover:text-yellow-400"
          onClick={() => setIsSidebarOpen(false)}
        >
          HOME
        </Link>
        <Link
          to="/compatibility"
          className="text-white flex items-center hover:text-yellow-400"
          onClick={() => setIsSidebarOpen(false)}
        >
          COMPATIBILITY CHECK
        </Link>
        <Link
          to="/protection"
          className="text-white hover:text-yellow-400 flex items-center"
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
              d="M12 4v4.5M12 12v6.5M12 2v1m0 16v1m-7-7.5v-1.75a6 6 0 0112 0V13a6 6 0 01-12 0v-1.75"
            />
          </svg>
          <span className="ml-2">PROTECTION</span>
        </Link>
      </div>

      <div className="hidden md:flex space-x-4 md:space-x-8">
        {!isCompatibilityPage && !disableSignIn && (
          <button
            onClick={handleLoginModalOpen}
            className="text-white hover:text-yellow-400"
          >
            SIGN IN
          </button>
        )}

        {!isCompatibilityPage && !disableSignUp && (
          <button
            onClick={handleRegisterModalOpen}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white"
          >
            SIGN UP
          </button>
        )}
        {!isCompatibilityPage && !disableSignUp && (
          <Link
          to='/askai'
          className='px-4 py-2 text-white hover:text-yellow-400'>
            ASK AI
          </Link>
          )}
      </div>

      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose} />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleRegisterModalClose}
      />
    </nav>
  )
};

export default Navbar;
