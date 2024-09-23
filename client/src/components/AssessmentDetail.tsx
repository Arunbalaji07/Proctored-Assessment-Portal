import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { studentApi } from "../axios.config.ts";
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

interface Question {
  mark: number;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  educatorId: string;
  scheduledAt: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

// Utility function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

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
  const navigate = useNavigate();
  const { category, assessmentId } = useParams<{ category: string; assessmentId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [submission, setSubmission] = useState(null);
  const [isAnalysisDisabled, setIsAnalysisDisabled] = useState(true);
  

  const studentId = localStorage.getItem('id'); // Retrieve studentId from localStorage

  const getAssessmentById = async () => {
    try {
      const res = await studentApi.get(`/api/assessment/${assessmentId}`);
      setAssessment(res.data.assessment);
      setQuestionCount(res.data.questionCount);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubmission = async () => {
    try {
      const res = await studentApi.get(`/api/submission/student/${studentId}/assessment/${assessmentId}`);
      setSubmission(res.data);
      setIsAnalysisDisabled(false);
    } catch (err) {
      console.log(err);
      setIsAnalysisDisabled(true); // Disable analysis button if no submission is found
    }
  };

  useEffect(() => {
    getAssessmentById();
    fetchSubmission();
  }, [assessmentId]);

  const handleViewInstructions = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  
  const handleproceed = () => {
    navigate(`/student/assessment-setup/${assessmentId}`); 
  };


  const totalMarks = assessment?.questions.reduce((acc, question) => acc + question.mark, 0) || 0;

  if (!assessment) {
    return <div>Loading...</div>;
  }

  return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-extrabold text-yellow-300 mb-6">
        {category.toUpperCase()} - {assessment.title.toUpperCase()}
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <p className="text-lg">Start Date: {formatDate(assessment.scheduledAt)}</p>
          <p className="text-lg">End Date: {formatDate(assessment.endTime)}</p>
          <div className="relative w-full md:w-1/2 h-4 bg-gray-700 rounded-lg overflow-hidden">
            <div
                className="absolute top-0 left-0 h-full bg-yellow-400"
                style={{ width: `50%` }}
            ></div>
          </div>
          <span className="ml-4">50%</span>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Assessment Overview</h2>
          <div className="grid grid-cols-2 gap-6 text-gray-300 mt-10">
            <div>
              <p className="mb-2">
                <span className="font-bold text-white">Start Time:</span> {new Date(assessment.scheduledAt).toLocaleTimeString()}
              </p>
              <p className="mb-2">
                <span className="font-bold text-white">End Time:</span> {new Date(assessment.endTime).toLocaleTimeString()}
              </p>
              <p className="mb-2">
                <span className="font-bold text-white">Number of Questions:</span> {questionCount}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-bold text-white">Question Types:</span> {['MCQ', 'Fill-Ups', 'Coding'].join(', ')}
              </p>
              <p className="mb-2">
                <span className="font-bold text-white">Total Marks:</span> {totalMarks}
              </p>
              <p className="mb-2 text-right">
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

        <div className="mt-8 flex justify-end space-x-4">
          <button
              className={`py-3 px-6 bg-yellow-400 text-black font-semibold rounded-lg transition-colors ${isAnalysisDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
              disabled={isAnalysisDisabled}
          >
            View Analysis
          </button>
          <button
          onClick={handleproceed}
              className="py-3 px-6 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
            Start Assessment
          </button>
        </div>

        {isModalOpen && (
            <Modal description={assessment.description} onClose={handleCloseModal} />
        )}
      </div>
  );
};

export default AssessmentDetails;
