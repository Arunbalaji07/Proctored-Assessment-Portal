import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSignIn: () => void; // No need for a parameter
}

const Navbar: React.FC<NavbarProps> = ({ toggleSignIn }) => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-transparent">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white">
        <span className="text-yellow-400">ASSESSMENT </span>PLATFORM
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-8">
        <Link to="/" className="text-white hover:text-yellow-400">HOME</Link>
        <Link to="/about" className="text-white hover:text-yellow-400">ABOUT US</Link>
        <Link to="/contact" className="text-white hover:text-yellow-400">CONTACT US</Link>
      </div>

      {/* Sign In / Sign Up */}
      <div className="flex space-x-4">
        {/* Trigger the Sign-In Modal */}
        <button onClick={toggleSignIn} className="text-white hover:text-yellow-400">SIGN IN</button>
        <Link to="/signup" className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-white">SIGN UP</Link>
      </div>
    </nav>
  );
};

export default Navbar;
