import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

interface TestQuestionProps {
  question: string;
  options?: string[];
  questionId: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: number, answer: string, marks: number) => void;
  type: 'MCQ' | 'Short Answer' | 'Coding';
  code?: string;
  testCases?: { input: string; expectedOutput: string }[];
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  options,
  questionId,
  selectedAnswer,
  onAnswerSelect,
  type,
  testCases,
  code,
}) => {
  const [userCode, setUserCode] = useState(code || '');
  const [userAnswer, setUserAnswer] = useState(selectedAnswer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const languageOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C', value: 'c' },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    let marks = 0;

    if (type === 'MCQ' || type === 'Short Answer') {
      marks = userAnswer === 'correctAnswer' ? 2 : 0; // Replace 'correctAnswer' with actual logic
    } else if (type === 'Coding') {
      marks = 10; // Logic to determine marks for coding question
    }

    onAnswerSelect(questionId, userAnswer, marks);
    setTimeout(() => {
      setIsSubmitting(false);
      setUserAnswer('');
      setUserCode('');
    }, 1000);
  };

  const renderMCQ = () => (
    <div className="mb-6">
      <h3 className="mb-4 text-xl font-semibold text-white">{question}</h3>
      <div className="grid grid-cols-2 gap-4">
        {options?.map((option) => (
          <button
            key={option}
            className={`p-3 rounded-lg transition-colors duration-200 text-white border border-gray-300 shadow-sm ${selectedAnswer === option ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => onAnswerSelect(questionId, option, 0)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderShortAnswer = () => (
    <div className="mb-6">
      <h3 className="mb-4 text-xl font-semibold text-white">{question}</h3>
      <textarea
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={4}
        placeholder="Type your answer here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button
        className={`mt-4 p-3 rounded-lg text-white transition-colors duration-200 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600`}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Answer'}
      </button>
    </div>
  );

  const renderCodingQuestion = () => (
    <div className="mb-6">
      <h3 className="mb-4 text-xl font-semibold text-white">{question}</h3>
      <div className="mb-4">
        <label htmlFor="language" className="mr-2 text-white font-medium">Select Language:</label>
        <select
          id="language"
          className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languageOptions.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>
      <div className="border border-gray-300 p-2 rounded-lg bg-gray-900">
        <Editor
          height="300px"
          defaultLanguage={language}
          language={language}
          theme="vs-dark"
          value={userCode}
          onChange={(value) => setUserCode(value || '')}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </div>
      {testCases && (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-white">Test Cases:</h4>
          {testCases.map((testCase, index) => (
            <div key={index} className="text-white">
              <p><strong>Input:</strong> {testCase.input}</p>
              <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
            </div>
          ))}
        </div>
      )}
      <button
        className={`mt-4 p-3 rounded-lg text-white transition-colors duration-200 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600`}
        onClick={handleSubmit}
      >
        Submit Code
      </button>
    </div>
  );

  return (
    <div className={`p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600`}>
      {type === 'MCQ' && renderMCQ()}
      {type === 'Short Answer' && renderShortAnswer()}
      {type === 'Coding' && renderCodingQuestion()}
      <div className="mt-4 h-2 bg-black" />
    </div>
  );
};

export default TestQuestion;
