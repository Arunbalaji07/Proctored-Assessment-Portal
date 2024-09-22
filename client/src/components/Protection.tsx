import { useState, useEffect } from 'react';
import axios from 'axios';

const useProctoring = () => {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [protectionStatus, setProtectionStatus] = useState('OFF');
  
  const startProctoring = async () => {
    try {
      await axios.post('http://localhost:5000/start_protection');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setProtectionStatus('ON');
    } catch (error) {
      console.error('Error starting proctoring:', error);
    }
  };

  const stopProctoring = async () => {
    try {
      await axios.post('http://localhost:5000/stop_protection');
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      setProtectionStatus('OFF');
    } catch (error) {
      console.error('Error stopping proctoring:', error);
    }
  };

  useEffect(() => {
    startProctoring();

    return () => {
      stopProctoring();
    };
  }, []);

  return { videoStream, protectionStatus, stopProctoring };
};

export default useProctoring;
