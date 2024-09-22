import React, { useState, useEffect } from 'react';
import EducatorNavbar from '@/components/EducatorNavbar';
import { educatorApi } from '../../axios.config.ts';

interface Category {
  id: string;
  title: string;
}

const CreateAssessment: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]); // State for storing categories
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await educatorApi.get('/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const format12HourTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutesStr + ' ' + ampm;
  };

  const calculateDuration = () => {
    if (startDateTime && endDateTime) {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);

      if (end > start) {
        const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        return `${Math.round(durationInMinutes)} minutes`;
      } else {
        return 'Invalid duration';
      }
    }
    return '';
  };

  const handleCreateAssessment = async () => {
    try {
      const response = await educatorApi.post('/api/assessment', {
        title,
        description,
        educatorId: localStorage.getItem('id'),
        scheduledAt: new Date(startDateTime).toISOString(), // Already in the desired format
        endTime: new Date(endDateTime).toISOString(), // Already in the desired format
        category,
      });
      console.log('Assessment created successfully', response.data);
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
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

              {/* Category Dropdown */}
              <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.title}>
                      {cat.title.toUpperCase()}
                    </option>
                ))}
              </select>
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
                    onChange={(e) => setStartDateTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date and Time</label>
                <input
                    type="datetime-local"
                    className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                    type="text"
                    className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                    value={calculateDuration()}
                    readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Time (12-hour format)</label>
                <input
                    type="text"
                    className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                    value={startDateTime ? format12HourTime(new Date(startDateTime)) : ''}
                    readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Time (12-hour format)</label>
                <input
                    type="text"
                    className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                    value={endDateTime ? format12HourTime(new Date(endDateTime)) : ''}
                    readOnly
                />
              </div>
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
