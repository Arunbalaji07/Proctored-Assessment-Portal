import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal'; 

interface NavbarProps {
  toggleSignIn: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSignIn }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="relative flex items-center justify-between px-4 py-4 bg-transparent">
      <Link to="/" className="text-2xl font-bold text-white">
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

      {/* mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-50 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/about"
            className="text-white text-lg hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            ABOUT US
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            CONTACT US
          </Link>
          <button
            onClick={toggleSignIn}
            className="text-white hover:text-yellow-400"
          >
            SIGN IN
          </button>
          <button
            onClick={handleOpenModal} 
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white text-center"
          >
            SIGN UP
          </button>
        </div>
      </div>

      <div className="hidden md:flex md:space-x-8">
        <Link to="/" className="text-white hover:text-yellow-400">HOME</Link>
        <Link to="/about" className="text-white hover:text-yellow-400">ABOUT US</Link>
        <Link to="/contact" className="text-white hover:text-yellow-400">CONTACT US</Link>
      </div>

      <div className="hidden md:flex space-x-4 md:space-x-8">
        <button onClick={toggleSignIn} className="text-white hover:text-yellow-400">SIGN IN</button>
        <button
          onClick={handleOpenModal} 
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white"
        >
          SIGN UP
        </button>
      </div>

      <RegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};

export default Navbar;
