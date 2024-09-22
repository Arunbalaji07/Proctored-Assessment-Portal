import React, { useState, useEffect } from 'react';
import TestQuestion from '@/components/TestQuestion';
import WarningModal from '@/components/WarningModal';
import SummaryModal from '@/components/SummaryModal';
import { mockTestData } from './Mockdata';
import { useNavigate } from 'react-router-dom';
import useProctoring from '@/components/Protection'; // Import the custom hook

const TestPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [visitedQuestions, setVisitedQuestions] = useState<{ [key: number]: boolean }>({});
  const [showSummary, setShowSummary] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningCount, setWarningCount] = useState(0);

  const { videoStream, protectionStatus, stopProctoring } = useProctoring();
  const navigate = useNavigate();
  const currentQuestion = mockTestData[currentQuestionIndex];

  // Handle keyboard events and visibility change for proctoring warnings
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showWarningModal && event.key === 'Escape') {
        event.preventDefault();
        return;
      }

      if (['Escape', 'F11', 'Alt', 'Control', 'Meta'].includes(event.key)) {
        setWarningCount((prevCount) => {
          const newCount = prevCount + 1;

          if (newCount > 5) {
            handleSubmitTest();
          } else {
            setShowWarningModal(true);
          }

          return newCount;
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setWarningCount((prevCount) => {
          const newCount = prevCount + 1;

          if (newCount > 5) {
            handleSubmitTest();
          } else {
            setShowWarningModal(true);
          }

          return newCount;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showWarningModal]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockTestData.length - 1) {
      setVisitedQuestions({
        ...visitedQuestions,
        [currentQuestion.id]: true,
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishTest = () => {
    setShowSummary(true);
    stopProctoring();
  };

  const handleSubmitTest = () => {
    stopProctoring();
    setShowSummary(false);
    navigate('/reports', {
      state: {
        totalQuestions: mockTestData.length,
        attemptedQuestions: Object.keys(selectedAnswers).length,
        selectedAnswers,
      },
    });
  };

  const getQuestionStatus = (index: number) => {
    const questionId = mockTestData[index].id;

    if (index === currentQuestionIndex) return 'upcoming';
    if (selectedAnswers[questionId]) return 'completed';
    if (visitedQuestions[questionId]) return 'visited-not-answered';
    return 'not-completed';
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white relative">
      {/* Video Feed Preview */}
      {videoStream && (
        <video
          autoPlay
          playsInline
          muted
          ref={(videoElement) => {
            if (videoElement) {
              videoElement.srcObject = videoStream;
            }
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '150px',
            height: 'auto',
            borderRadius: '8px',
            border: '2px solid white',
            zIndex: 1000,
          }}
        />
      )}

      <div className="flex justify-between items-center py-4 px-6 bg-blue-600 text-white">
        <div className="text-lg">Mock Assessment (AI Protection: {protectionStatus})</div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="text-xl font-bold mb-4">Question {currentQuestionIndex + 1}</div>

        {/* Progress Indicator */}
        <div className="flex mb-6">
          {mockTestData.map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 mx-1 rounded-full 
                ${getQuestionStatus(index) === 'completed' ? 'bg-green-500' : 
                  getQuestionStatus(index) === 'upcoming' ? 'bg-red-500' : 
                  getQuestionStatus(index) === 'visited-not-answered' ? 'bg-red-600' : 'bg-gray-500'}`}
            />
          ))}
        </div>

        {/* Question Component */}
        <TestQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          questionId={currentQuestion.id}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          onAnswerSelect={(questionId, answer) => setSelectedAnswers({ ...selectedAnswers, [questionId]: answer })} type={'MCQ'}        />

        <div className="mt-4">
          {currentQuestionIndex < mockTestData.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleFinishTest}
            >
              Finish
            </button>
          )}
        </div>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <SummaryModal
          totalQuestions={mockTestData.length}
          attemptedQuestions={Object.keys(selectedAnswers).length}
          onSubmit={handleSubmitTest}
          onCancel={() => setShowSummary(false)} totalMarks={0} score={0} questionList={[]} stopMedia={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      )}

      {/* Warning Modal */}
      {showWarningModal && (
        <WarningModal
          count={warningCount}
          onCancel={() => setShowWarningModal(false)}
        />
      )}
    </div>
  );
};

export default TestPage;
