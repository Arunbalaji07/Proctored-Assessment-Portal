import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import ChatBotModal from './Askai'; // Import ChatBot Modal
import Background from '../assets/person-using-laptop.jpg';

const HomePage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false); // State to control chatbot modal
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <img
          src={Background}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-20">
        <Navbar toggleSignIn={toggleSignIn} />
      </div>

      <div className="relative flex flex-col items-center justify-center mt-20 pt-20 text-center text-white p-2">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 ">
          Welcome to Our Platform
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-xl p-">
          Discover the best way to manage your tasks, track your progress, and
          collaborate with your team.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300"
        >
          Contact Us
        </a>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg shadow-md">
        <p>{currentTime}</p>
      </div>

      <button
        onClick={toggleChatBot}
        className="fixed bottom-10 right-10 bg-yellow-400 text-black p-4 rounded-full shadow-lg hover:bg-teal-700 transition-transform"
      >
        Ask AI
      </button>

      {showChatBot && (
        <ChatBotModal onClose={toggleChatBot} isVisible={showChatBot} />
      )}

      {showSignIn && (
        <LoginModal onClose={toggleSignIn} isOpen={false} />
      )}
    </div>
  );
};

export default HomePage;
