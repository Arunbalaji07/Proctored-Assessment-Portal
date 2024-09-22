import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Modal component
const Modal: React.FC<{ description: string; onClose: () => void }> = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4">Assessment Instructions</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <button
          className="py-2 px-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const AssessmentDetails: React.FC = () => {
  const { category, assessmentId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock assessment details
  const assessmentDetails = {
    id: assessmentId,
    name: `Assessment ${assessmentId}`,
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    questions: 30,
    questionTypes: ['MCQ', 'Fill-Ups', 'Coding'],
    totalMarks: 100,
    progress: 50, // Assuming 50% progress for now
    startDate: '10.10.10',
    endDate: '10.10.10',
    description:
      'This is a comprehensive assessment designed to evaluate your understanding across multiple areas. You will face multiple-choice questions, coding problems, and fill-in-the-blanks. Make sure to review the instructions before starting the assessment.',
  };

  // Function to open the modal
  const handleViewInstructions = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Category Title */}
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-6">
        {category} - {assessmentDetails.name}
      </h1>

      {/* Assessment Progress */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <p className="text-lg">Start Date: {assessmentDetails.startDate}</p>
        <p className="text-lg">End Date: {assessmentDetails.endDate}</p>
        <div className="relative w-full md:w-1/2 h-4 bg-gray-700 rounded-lg overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-yellow-400"
            style={{ width: `${assessmentDetails.progress}%` }}
          ></div>
        </div>
        <span className="ml-4">{assessmentDetails.progress}%</span>
      </div>

      {/* Assessment Overview */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Assessment Overview
        </h2>
        <div className="grid grid-cols-2 gap-6 text-gray-300 mt-10">
          <div>
            <p className="mb-2">
              <span className="font-bold text-white">Start Time:</span> {assessmentDetails.startTime}
            </p>
            <p className="mb-2">
              <span className="font-bold text-white">End Time:</span> {assessmentDetails.endTime}
            </p>
            <p className="mb-2">
              <span className="font-bold text-white">Number of Questions:</span> {assessmentDetails.questions}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-bold text-white">Question Types:</span> {assessmentDetails.questionTypes.join(', ')}
            </p>
            <p className="mb-2">
              <span className="font-bold text-white">Total Marks:</span> {assessmentDetails.totalMarks}
            </p>
            <p className="mb-2 text-right">
              {/* Link to open modal */}
              <button
                onClick={handleViewInstructions}
                className="text-yellow-400 hover:underline focus:outline-none"
              >
                View Instructions
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Start Assessment and View Reports Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="py-3 px-6 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
          View Reports
        </button>
        <button className="py-3 px-6 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
          Start Assessment
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal description={assessmentDetails.description} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AssessmentDetails;
