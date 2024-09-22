import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {studentApi} from '../axios.config.ts';

const AssessmentList: React.FC = () => {
    const {category} = useParams();
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState<any[]>([]);

    const getAllAssessments = async () => {
        try {
            const res = await studentApi.get(`/api/assessment/category/${category}`);
            setAssessments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllAssessments();
    }, [category]);

    const handleViewDetails = (assessmentId: number) => {
        navigate(`/student/${category}/assessment/${assessmentId}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Category Title */}
            <h1 className="text-4xl font-extrabold text-yellow-300 p-8 border-b border-gray-700">
                {category.toUpperCase()} Assessments
            </h1>

            {/* Scrollable Assessment List */}
            <div className="p-8 max-h-[400px] overflow-y-auto space-y-4">
                {assessments.map((assessment) => (
                    <div
                        key={assessment.id}
                        className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
                        onClick={() => handleViewDetails(assessment.id)}
                    >
                        <div className="flex flex-col space-y-1">
                            {/* Assessment Name */}
                            <h2 className="text-lg font-bold text-yellow-300 cursor-pointer hover:underline">
                                {assessment.title.toUpperCase()}
                            </h2>

                            <div className={`flex justify-between`}>
                                <div>
                                    {/* Start Date */}
                                    <p className="text-sm text-white">Start Date : &nbsp;
                                        <span className={`text-gray-400`}>
                                            {new Date(assessment.scheduledAt).toLocaleDateString('en-US', {
                                            dateStyle: 'medium',
                                            })}
                                        </span>
                                    </p>
                                    {/* Start Time */}
                                    <p className="text-sm text-white">Start Time : &nbsp;
                                        <span className={`text-gray-400`}>
                                            {new Date(assessment.scheduledAt).toLocaleTimeString('en-US', {
                                            timeStyle: 'short',
                                            })}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    {/* End Date */}
                                    <p className="text-sm text-white">End Date : &nbsp;
                                        <span className={`text-gray-400`}>
                                            {new Date(assessment.endTime).toLocaleDateString('en-US', {
                                            dateStyle: 'medium',
                                            })}
                                        </span>
                                    </p>

                                    {/* End Time */}
                                    <p className="text-sm text-white">End Time : &nbsp;
                                        <span className={`text-gray-400`}>
                                            {new Date(assessment.endTime).toLocaleTimeString('en-US', {
                                            timeStyle: 'short',
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <span
                                className={`text-sm font-semibold ${
                                    assessment.status === 'Upcoming' ? 'text-green-400' : 'text-red-400'
                                }`}
                            >
                {assessment.status}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentList;
