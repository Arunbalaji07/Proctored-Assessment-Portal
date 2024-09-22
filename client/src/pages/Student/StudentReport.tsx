import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentNavbar from '@/components/StudentNavbar'; // Ensure you import your navbar

const StudentReport: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const token = localStorage.getItem('student');
    if (!token) {
        navigate('/');
        return null; // Prevent rendering if not authenticated
    }

    // Check if state is defined
    if (!state) {
        return <div>No report data available.</div>;
    }

    const { totalQuestions, attemptedQuestions, totalMarks, score, questionList } = state;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <StudentNavbar /> {/* Include your student navbar */}

            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold mb-4">Student Report</h1>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <p className="text-lg">Total Questions: <span className="font-semibold">{totalQuestions}</span></p>
                    <p className="text-lg">Attempted Questions: <span className="font-semibold">{attemptedQuestions}</span></p>
                    <p className="text-lg">Total Marks: <span className="font-semibold">{totalMarks}</span></p>
                    <p className="text-lg">Score: <span className="font-semibold">{score}</span></p>
                </div>

                <h2 className="mt-8 text-2xl font-bold">Question Details</h2>
                <ul className="mt-4 space-y-4">
                    {questionList && questionList.length > 0 ? (
                        questionList.map((question, index) => (
                            <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <p className="font-semibold">Question: {question.question}</p>
                                <p>Your Answer: <span className="font-medium">{question.userAnswer || 'Not Answered'}</span></p>
                                <p>Correct Answer: <span className="font-medium">{question.correctAnswer}</span></p>
                            </li>
                        ))
                    ) : (
                        <p>No questions answered.</p>
                    )}
                </ul>

                {/* Button to go back to the assessment page */}
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/student')} // Change this path as needed
                        className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Go to Assessment Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentReport;
