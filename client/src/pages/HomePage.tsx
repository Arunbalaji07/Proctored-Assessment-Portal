import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import Background from '../assets/person-using-laptop.jpg';

const HomePage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false); // State to toggle Sign-In form

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn); // Toggle the Sign-In form visibility
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={Background} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar toggleSignIn={toggleSignIn} />
      </div>

      {/* Conditionally render the LoginModal */}
      {showSignIn && (
        <div className="absolute inset-0 flex justify-center items-center z-30">
          <LoginModal toggleSignIn={toggleSignIn} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
