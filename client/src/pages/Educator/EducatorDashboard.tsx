import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import EducatorNavbar from '@/components/EducatorNavbar';
import 'chart.js/auto';
import Assessment from '@/assets/exam (1).png'

interface PieData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
  percentages?: string[];
}

const EducatorDashboard: React.FC = () => {
  const [pieData, setPieData] = useState<PieData>({
    labels: ['A grade', 'B grade', 'C grade', 'D grade', 'Failed'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#ff9f40'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#ff9f40'],
      },
    ],
  });

  const [studentStats, setStudentStats] = useState({
    totalStudents: 0,
    totalAttended: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchedData: PieData = {
        labels: ['A grade', 'B grade', 'C grade', 'D grade', 'Failed'],
        datasets: [
          {
            data: [8, 10, 5, 2, 1],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#ff9f40'],
            hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#ff9f40'],
          },
        ],
      };

      const totalStudents = fetchedData.datasets[0].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const percentages = fetchedData.datasets[0].data.map(value => ((value / totalStudents) * 100).toFixed(0));

      const fetchedStudentStats = {
        totalStudents: totalStudents,
        totalAttended: 10, 
      };

      setPieData({
        ...fetchedData,
        percentages,
      });
      setStudentStats(fetchedStudentStats);
    }, 1000);
  }, []);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const getColorClass = (index: number) => {
    const colors = ['pink-500', 'blue-500', 'yellow-400', 'teal-500', 'orange-100'];
    return colors[index] || 'gray-500'; 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EducatorNavbar />
      <div className='p-6'>
        <header className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          <h1>WELCOME USER!</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recent test results</h3>
            <div className="flex justify-between items-center mb-6">
              <div className="w-2/3 h-64">
                <Pie data={pieData} options={pieOptions} />
              </div>

              <div className="w-1/3 flex flex-col space-y-2 text-right">
                {pieData.labels.map((label, index) => (
                  <p key={index} className={`text-${getColorClass(index)}`}>
                    {pieData.datasets[0].data[index]} student{pieData.datasets[0].data[index] > 1 ? 's' : ''} - {pieData.percentages?.[index]}% {label}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="font-bold">{studentStats.totalStudents} Students assigned for test</p>
              <p className="font-bold text-gray-400">{studentStats.totalStudents - studentStats.totalAttended} Students didn't attend the test</p>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Create Test</h3>
          <div className="flex justify-center items-center">
          <img src={Assessment} alt='assessment image' style={{ width: '10%', height: 'auto' }} />
          </div>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 mt-4">
            Create
          </button>
          </div>


            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Scheduled test</h3>
              <div className="text-2xl font-mono mb-4">
                <span>00</span>:<span>42</span>:<span>10</span>
              </div>
              <p className="font-semibold">Assessment 7</p>
              <p className="text-gray-400 mb-4">Created on: 09 October, 2010</p>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600">
                Set Another
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Overall survey</h3>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Overall performance</h3>
            <p className="mb-2">Weekly tests - <span className="font-bold text-pink-500">80%</span></p>
            <p>Practice tests - <span className="font-bold text-blue-500">40%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;
