import React, { useState } from 'react';
import EducatorNavbar from '@/components/EducatorNavbar';

const CreateAssessment: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [settings, setSettings] = useState({
    timeLimit: 60,
    shuffleQuestions: false,
  });
  const [questionUploadMethod, setQuestionUploadMethod] = useState('');
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [totalDuration, setTotalDuration] = useState<string>('');

  const handleQuestionTypeChange = (type: string) => {
    setQuestionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const calculateDuration = () => {
    // if (startDateTime && endDateTime) {
    //   const start = new Date(startDateTime + 'Z'); // Append 'Z' for UTC
    //   const end = new Date(endDateTime + 'Z'); // Append 'Z' for UTC
  
    //   // Debug logs
    //   console.log('Start Date:', start);
    //   console.log('End Date:', end);
  
    //   if (end > start) {
    //     // Calculate duration in minutes
    //     const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    //     setTotalDuration(Math.round(durationInMinutes) + ' minutes');
    //   } else {
    //     setTotalDuration('Invalid duration'); // End time is before start time
    //   }
    // } else {
    //   setTotalDuration('');
    // }
  };
  
  

  const handleCreateAssessment = () => {
    // Logic for creating the assessment
    console.log({
      title,
      description,
      settings,
      questionTypes,
      aiEnabled,
      suggestedQuestions,
      startDateTime,
      endDateTime,
      totalDuration,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EducatorNavbar />
      <div className="p-6">
        <header className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
          <h1>Create Assessment</h1>
        </header>

        {/* Form Fields */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Assessment Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Assessment Title"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Assessment Description"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                  value={settings.timeLimit}
                  onChange={(e) =>
                    setSettings({ ...settings, timeLimit: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="shuffleQuestions"
                  checked={settings.shuffleQuestions}
                  onChange={(e) =>
                    setSettings({ ...settings, shuffleQuestions: e.target.checked })
                  }
                />
                <label htmlFor="shuffleQuestions">Shuffle Questions</label>
              </div>
            </div>
          </div>
        </div>

        {/* Date and Time Fields */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Assessment Schedule</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date and Time</label>
              <input
                type="datetime-local"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                value={startDateTime}
                onChange={(e) => {
                  setStartDateTime(e.target.value);
                  calculateDuration();
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date and Time</label>
              <input
                type="datetime-local"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                value={endDateTime}
                onChange={(e) => {
                  setEndDateTime(e.target.value);
                  calculateDuration();
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Duration</label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                value={totalDuration}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Question Upload Section (Single Option Selection) */}
        

        {/* Question Type Selection (Multiple Option Selection) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Question Type Selection</h2>
          <div className="space-y-2">
            {['MCQ', 'Descriptive', 'Coding'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  className="mr-2"
                  checked={questionTypes.includes(type)}
                  onChange={() => handleQuestionTypeChange(type)}
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* AI-powered Suggestion Toggle */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">AI-Powered Suggestions</h2>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="aiEnabled"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
            />
            <label htmlFor="aiEnabled">Enable AI Suggestions</label>
          </div>
        </div>

        {/* Create Button */}
        <div className="flex justify-end">
          <button
            onClick={handleCreateAssessment}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600"
          >
            Create Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssessment;
