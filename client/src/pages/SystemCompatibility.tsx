import React, { useState, useEffect } from 'react';
import Background from '../assets/person-using-laptop.jpg';
import Navbar from '../components/Navbar';

const CompatibilityCheckPage: React.FC = () => {
  const [videoStatus, setVideoStatus] = useState<string>('Checking...');
  const [audioStatus, setAudioStatus] = useState<string>('Checking...');
  const [internetStatus, setInternetStatus] = useState<string>('Checking...');
  const [orientationStatus, setOrientationStatus] = useState<string>('Checking...');
  const [browserStatus, setBrowserStatus] = useState<string>('Checking...');
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const checkVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setVideoStatus('Success');
    } catch (error) {
      setVideoStatus('Failed');
    }
  };

  const checkAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setAudioStatus('Success');
    } catch (error) {
      setAudioStatus('Failed');
    }
  };

  const checkInternet = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (response.ok) {
        setInternetStatus('Success');
      } else {
        setInternetStatus('Failed');
      }
    } catch (error) {
      setInternetStatus('Failed');
    }
  };

  const checkOrientation = () => {
    if (window.innerWidth > 768) {
      setOrientationStatus('Preferred for desktop monitors.');
    } else {
      setOrientationStatus('Not optimal for desktop monitors.');
    }
  };

  const checkBrowser = () => {
    const userAgent = window.navigator.userAgent;
    if (/Chrome/.test(userAgent) || /Edg/.test(userAgent)) {
      setBrowserStatus('Success');
    } else {
      setBrowserStatus('Failed');
    }
  };

  const runChecks = () => {
    checkVideo();
    checkAudio();
    checkInternet();
    checkOrientation();
    checkBrowser();
  };

  useEffect(() => {
    runChecks();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
        {/* Overlay to darken the background */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar toggleSignIn={toggleSignIn} disableSignIn={true} disableSignUp={true} />
      </div>

      {/* Compatibility Check Content */}
      <div className="relative min-h-screen text-gray-900 flex flex-col items-center py-10">
        <div className="w-full max-w-3xl p-6 bg-gray-500 shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">System Compatibility Check</h1>
          <p className="text-lg mb-6 text-black text-center">
            Please follow the instructions below to ensure your system meets the requirements for a smooth testing experience.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-2">1. Video Test</h2>
            <p>Status: <span className={videoStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{videoStatus}</span></p>
            <p className="text-gray-600">Ensure your webcam is functioning properly.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-2">2. Audio Test</h2>
            <p>Status: <span className={audioStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{audioStatus}</span></p>
            <p className="text-gray-600">Ensure your microphone is functioning properly.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-2">3. Internet Connectivity</h2>
            <p>Status: <span className={internetStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{internetStatus}</span></p>
            <p className="text-gray-600">Your connection should be stable with more than 2 Mbps.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-2">4. Screen Orientation</h2>
            <p>Status: <span className={orientationStatus.includes('Preferred') ? 'text-green-600' : 'text-yellow-600'}>{orientationStatus}</span></p>
            <p className="text-gray-600">Ensure you are using a desktop monitor for the best experience.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-2">5. Browser Support</h2>
            <p>Status: <span className={browserStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{browserStatus}</span></p>
            <p className="text-gray-600">Use the latest version of Chrome or Edge for the best experience.</p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={runChecks}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-600 text-black text-lg font-semibold rounded-lg shadow-lg transition duration-300"
            >
              Run Again
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Clock */}
      <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg shadow-md">
        <p>{currentTime}</p>
      </div>
    </div>
  );
};

export default CompatibilityCheckPage;
