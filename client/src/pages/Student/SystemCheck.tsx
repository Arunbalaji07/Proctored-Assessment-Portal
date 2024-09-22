import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AssessmentSetup: React.FC = () => {
  const navigate = useNavigate();
  const [isMediaEnabled, setIsMediaEnabled] = useState(false);
  const [isScreenSharingEnabled, setIsScreenSharingEnabled] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [systemCheckStatus, setSystemCheckStatus] = useState(Array(3).fill(false));
  const [selfDeclaration, setSelfDeclaration] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);

  const enableMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setIsMediaEnabled(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      checkSystemCheckStatus(1);
    } catch (error) {
      console.error('Error enabling media:', error);
    }
  };
  const token = localStorage.getItem('student');
  if (!token) {
    navigate('/');
    return;
  }

  const enableScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "monitor" }
      });
      setScreenStream(stream);
      setIsScreenSharingEnabled(true);
      checkSystemCheckStatus(2);
    } catch (error) {
      console.error('Error enabling screen sharing:', error);
    }
  };

  const checkSystemRequirements = () => {
    const isDesktopOrLaptop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktopOrLaptop) {
      alert('This test can only be attended on a desktop or laptop.');
    } else {
      checkSystemCheckStatus(0);
    }
  };

  const checkSystemCheckStatus = (index: number) => {
    const updatedStatus = [...systemCheckStatus];
    updatedStatus[index] = true;
    setSystemCheckStatus(updatedStatus);
  };

  const handleBackNavigation = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setIsMediaEnabled(false);
      setMediaStream(null);
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setIsScreenSharingEnabled(false);
      setScreenStream(null);
    }
  };

  const handleStartAssessment = () => {
    if (assessmentRef.current) {
      const requestFullScreen = assessmentRef.current.requestFullscreen || 
                                (assessmentRef.current as any).webkitRequestFullscreen || 
                                (assessmentRef.current as any).mozRequestFullScreen || 
                                (assessmentRef.current as any).msRequestFullscreen;

      requestFullScreen.call(assessmentRef.current).catch(() => {
        setShowWarning(true);
        // Retry after a delay
        setTimeout(() => {
          requestFullScreen.call(assessmentRef.current);
        }, 2000);
      });
    }
  };

  const handleproceed = () => {
    navigate(`/student/assessment-start`); // Correct string interpolation for the route
  };


  useEffect(() => {
    checkSystemRequirements();
    return () => handleBackNavigation();
  }, []);

  const isStartAssessmentEnabled = systemCheckStatus.every(status => status) && selfDeclaration;

  return (
    <div ref={assessmentRef} className="min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-900 p-6 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-4">ASSESSMENT 7</h1>
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-semibold">82</p>
            <p>Total Questions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">2hrs</p>
            <p>Total Time</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-300 rounded-lg p-6">
        {/* Progress Indicator */}
        <div className="relative">
          <div className="absolute w-1 bg-black h-full left-4"></div>
          <div className="relative pl-8">
            {['System Check', 'Media Permission', 'Screen Sharing Permission'].map((step, index) => (
              <div className="flex items-center mb-4" key={index}>
                <div className={`w-6 h-6 ${systemCheckStatus[index] ? 'bg-black' : 'border-2 border-black'} rounded-full`}></div>
                <p className="ml-4">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Permission */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">Enable Video and Audio</h2>
          <button
            className={`py-2 px-4 ${isMediaEnabled ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
            onClick={enableMedia}
          >
            {isMediaEnabled ? 'Media Enabled' : 'Enable Video & Audio'}
          </button>
          {isMediaEnabled && (
            <div className="mt-4">
              <video ref={videoRef} autoPlay className="w-48 h-32 border border-gray-400 rounded-lg" />
            </div>
          )}
        </div>

        {/* Screen Sharing */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">Enable Screen Sharing</h2>
          <button
            className={`py-2 px-4 ${isScreenSharingEnabled ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
            onClick={enableScreenSharing}
          >
            {isScreenSharingEnabled ? 'Screen Sharing Enabled' : 'Enable Screen Sharing'}
          </button>
        </div>

        {/* Self Declaration */}
        <div className="mt-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selfDeclaration}
              onChange={(e) => setSelfDeclaration(e.target.checked)}
              className="mr-2"
            />
            I declare that all information is correct and I meet all requirements.
          </label>
        </div>

        {/* Start Assessment Button */}
        <div className="text-right mt-8">
          {isStartAssessmentEnabled ? (
            <Link
              to="/student/assessment-start"
              onClick={handleStartAssessment}
              className="py-3 px-6 bg-black text-white rounded-lg"
            >
              Start Assessment
            </Link>
          ) : (
            <button
              className="py-3 px-6 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              disabled
            >
              Start Assessment
            </button>
          )}
        </div>

        {showWarning && (
          <div className="mt-4 text-red-600">
            <p>Please enable full-screen mode in your browser settings or allow it when prompted.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentSetup;
