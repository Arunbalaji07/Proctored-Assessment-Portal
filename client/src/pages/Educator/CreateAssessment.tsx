import React, { useState, useEffect } from 'react';
import EducatorNavbar from '@/components/EducatorNavbar';
import { educatorApi } from '../../axios.config.ts';
import checkAuth from "../../actions/TokenValidation.ts";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  title: string;
}

const CreateAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // State for error messages

  const isAuthenticated = checkAuth('educator');
  if (!isAuthenticated) {
    navigate('/login');
  }

  useEffect(() => {
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
    return `${hours}:${minutesStr} ${ampm}`;
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

  const validateInputs = () => {
    const errors: string[] = [];
    if (!title) errors.push('Title is required');
    if (!description) errors.push('Description is required');
    if (!category) errors.push('Category is required');
    if (!startDateTime || isNaN(new Date(startDateTime).getTime())) {
      errors.push('Invalid start date and time');
    }
    if (!endDateTime || isNaN(new Date(endDateTime).getTime())) {
      errors.push('Invalid end date and time');
    } else {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);
      if (end <= start) {
        errors.push('End date must be later than start date');
      }
    }

    setErrorMessages(errors);
    return errors.length === 0; // Return true if no errors
  };

  const handleCreateAssessment = async () => {
    if (!validateInputs()) {
      return; // Prevent submission if there are validation errors
    }

    try {
      const response = await educatorApi.post('/api/assessment', {
        title,
        description,
        educatorId: localStorage.getItem('id'),
        scheduledAt: new Date(startDateTime).toISOString(),
        endTime: new Date(endDateTime).toISOString(),
        category,
      });
      alert('Assessment created successfully');
      navigate('/educator/upload');
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

          {/* Error Messages */}
          {errorMessages.length > 0 && (
              <div className="mb-4">
                <ul className="bg-red-500 p-4 rounded-lg">
                  {errorMessages.map((error, index) => (
                      <li key={index} className="text-white">{error}</li>
                  ))}
                </ul>
              </div>
          )}

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
