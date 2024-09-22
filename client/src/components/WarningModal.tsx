import React from 'react';

interface WarningModalProps {
  onCancel: () => void;
  count: number; // Prop for warning count
}

const WarningModal: React.FC<WarningModalProps> = ({ onCancel, count }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Warning!</h2>
        <p className="mb-4">
          You are not allowed to switch windows or press specific keys during the test.
        </p>
        <p className="font-semibold mb-4">Warning Count: {count}</p> {/* Displaying the count */}
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200"
        >
          Continue Test
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
