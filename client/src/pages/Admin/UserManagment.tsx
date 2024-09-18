import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import AdminNavbar from '../../components/AdminNavbar';
import Papa from 'papaparse';

interface Student {
  id: number;
  fullName: string;
  email: string;
  role: 'student';
  status: string;
}

interface Educator {
  id: number;
  fullName: string;
  email: string;
  role: 'educator';
  status: string;
}

const UserManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [educators, setEducators] = useState<Educator[]>([]);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [educatorSearchTerm, setEducatorSearchTerm] = useState('');
  const [view, setView] = useState<'students' | 'educators'>('students');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importErrors, setImportErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [studentsResponse, educatorsResponse] = await Promise.all([
          axios.get('http://localhost:7777/api/student'),
          axios.get('http://localhost:7777/api/educator')
        ]);

        setStudents(studentsResponse.data as Student[]);
        setEducators(educatorsResponse.data as Educator[]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  const filteredEducators = educators.filter(educator =>
    educator.fullName.toLowerCase().includes(educatorSearchTerm.toLowerCase())
  );

  const handleEdit = (id: number, role: 'student' | 'educator') => {
    console.log(`Edit ${role} with ID:`, id);
  };

  const handleDelete = (id: number, role: 'student' | 'educator') => {
    console.log(`Delete ${role} with ID:`, id);
  };

  const handleDeactivate = (id: number, role: 'student' | 'educator') => {
    console.log(`Deactivate ${role} with ID:`, id);
  };

  const handleImport = async (role: 'student' | 'educator') => {
    if (importFile) {
      Papa.parse(importFile, {
        header: true,
        complete: async (results) => {
          const data = results.data as any[];
          const formattedData = data.map(item => ({
            id: item.id,
            fullName: item.fullName,
            email: item.email,
            role: role,
            status: item.status,
          }));

          try {
            await axios.post(`http://localhost:7777/api/${role}/import`, formattedData);
            setImportErrors([]);
          } catch (error) {
            console.error('Error importing data:', error);
            setImportErrors(['Failed to import data.']);
          }
        },
        error: (error) => {
          console.error('Error parsing file:', error);
          setImportErrors(['Failed to parse file.']);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <AdminNavbar />
      <div className="p-6">
        <div className="text-3xl font-bold mb-8">User Management</div>

        <div className="mb-6 flex flex-wrap">
          <button
            onClick={() => setView('students')}
            className={`px-4 py-2 rounded ${view === 'students' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}`}
          >
            Students
          </button>
          <button
            onClick={() => setView('educators')}
            className={`px-4 py-2 rounded ${view === 'educators' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}`}
            style={{ marginLeft: '8px' }}
          >
            Educators
          </button>
        </div>

        {importErrors.length > 0 && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded">
            <ul>
              {importErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {view === 'students' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Students</h2>
            <div className="flex flex-wrap items-center mb-6 gap-2">
              <input
                type="text"
                placeholder="Search by name"
                className="p-2 bg-gray-700 text-white rounded flex-grow sm:w-64"
                value={studentSearchTerm}
                onChange={(e) => setStudentSearchTerm(e.target.value)}
              />
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="mr-2"
              />
              <button
                onClick={() => handleImport('student')}
                className="bg-yellow-400 text-black p-2 rounded mr-2"
              >
                Import Students
              </button>
              <CSVLink
                data={students}
                filename="students.csv"
                className="bg-yellow-400 text-black p-2 rounded"
              >
                Export Students
              </CSVLink>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-center table-auto">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-white">Name</th>
                    <th className="px-6 py-3 text-sm font-medium text-white">Email</th>
                    <th className="px-6 py-3 text-sm font-medium text-white">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                      <tr key={student.id} className="bg-gray-700 odd:bg-gray-600">
                        <td className="px-6 py-4 text-sm">{student.fullName}</td>
                        <td className="px-6 py-4 text-sm">{student.email}</td>
                        <td className="px-6 py-4 text-sm">{student.status}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleEdit(student.id, 'student')}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeactivate(student.id, 'student')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Deactivate
                          </button>
                          <button
                            onClick={() => handleDelete(student.id, 'student')}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center">
                        No student data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'educators' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Educators</h2>
            <div className="flex flex-wrap items-center mb-6 gap-2">
              <input
                type="text"
                placeholder="Search by name"
                className="p-2 bg-gray-700 text-white rounded flex-grow sm:w-64"
                value={educatorSearchTerm}
                onChange={(e) => setEducatorSearchTerm(e.target.value)}
              />
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="mr-2"
              />
              <button
                onClick={() => handleImport('educator')}
                className="bg-yellow-400 text-black p-2 rounded mr-2"
              >
                Import Educators
              </button>
              <CSVLink
                data={educators}
                filename="educators.csv"
                className="bg-yellow-400 text-black p-2 rounded"
              >
                Export Educators
              </CSVLink>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-center table-auto">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-white">Name</th>
                    <th className="px-6 py-3 text-sm font-medium text-white">Email</th>
                    <th className="px-6 py-3 text-sm font-medium text-white">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEducators.length > 0 ? (
                    filteredEducators.map(educator => (
                      <tr key={educator.id} className="bg-gray-700 odd:bg-gray-600">
                        <td className="px-6 py-4 text-sm">{educator.fullName}</td>
                        <td className="px-6 py-4 text-sm">{educator.email}</td>
                        <td className="px-6 py-4 text-sm">{educator.status}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleEdit(educator.id, 'educator')}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeactivate(educator.id, 'educator')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Deactivate
                          </button>
                          <button
                            onClick={() => handleDelete(educator.id, 'educator')}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center">
                        No educator data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
