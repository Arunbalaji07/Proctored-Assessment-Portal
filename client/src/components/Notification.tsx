import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon from react-icons

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="relative flex items-center justify-between p-4 mb-4 w-80 bg-gray-800 text-white rounded shadow-lg">
      {/* Notification Message */}
      <div className="flex items-center">
        <span className="mr-4">ℹ️</span> {/* Info emoji or you can use another react icon */}
        <span>{message}</span>
      </div>

      {/* Mark as read / Close Button */}
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-yellow-400 transition-colors"
      >
        <AiOutlineClose className="text-lg" /> {/* React Icons Close */}
      </button>
    </div>
  );
};

export default Notification;
