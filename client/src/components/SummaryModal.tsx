import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SummaryModalProps {
    totalQuestions: number;
    attemptedQuestions: number;
    totalMarks: number;
    score: number;
    questionList: { question: string; options: string[]; correctAnswer: string; userAnswer: string }[];
    onSubmit: () => void;
    onCancel: () => void;
    stopMedia: () => void; // Add a prop to stop media
}

const SummaryModal: React.FC<SummaryModalProps> = ({
    totalQuestions,
    attemptedQuestions,
    totalMarks,
    score,
    questionList,
    onSubmit,
    onCancel,
    stopMedia, // Include the stopMedia function
}) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Stop media functionalities
        stopMedia();

        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        // Call the onSubmit function passed as prop
        onSubmit();

        // Navigate to the report page and pass data
        navigate('/reports', {
            state: {
                totalQuestions,
                attemptedQuestions,
                totalMarks,
                score,
                questionList,
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl text-black font-bold mb-4">Test Summary</h2>
                <p className='text-black'>Total Questions: {totalQuestions}</p>
                <p className='text-black'>Attempted Questions: {attemptedQuestions}</p>
                <div className="mt-4 flex justify-end">
                    <button className="mr-2 px-4 py-2 bg-gray-600 text-white rounded" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleSubmit}>
                        Submit Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryModal;
