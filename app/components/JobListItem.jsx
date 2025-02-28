import React from 'react';
import Link from 'next/link';

export const JobListItem = ({ job }) => {
  // Determine match score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500 text-white';
    if (score >= 50) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  // Format salary with commas
  const formatSalary = (salary) => {
    if (typeof salary === 'number') {
      return `$${salary.toLocaleString()}`;
    }
    return salary;
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-5 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden">
      {/* Colored accent bar based on match score */}
      <div className={`absolute top-0 left-0 w-1 h-full ${getScoreColor(job.matchScore).split(' ')[0]}`}></div>
      
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
          <p className="text-gray-600 font-medium text-sm mt-1">{job.company}</p>
          
          <div className="flex gap-2 mt-3">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/20">
              {job.location}
            </span>
            <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/20">
              {formatSalary(job.salary)}
            </span>
          </div>
        </div>
        
        <div className="text-center ml-4">
          <div className={`rounded-full w-16 h-16 flex items-center justify-center ${getScoreColor(job.matchScore)} shadow-md`}>
            <span className="font-bold text-lg">{job.matchScore}%</span>
          </div>
          <p className="text-xs font-medium text-gray-500 mt-1">Match</p>
        </div>
      </div>
      
      {/* Match score bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-600">Skills Match</span>
          <span className="font-medium text-gray-800">{job.matchScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full ${getScoreColor(job.matchScore).split(' ')[0]}`} 
            style={{ width: `${job.matchScore}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-5 flex justify-between gap-3">
        <Link 
          href={`/job/${job.id}/details`}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
        >
          View Details
        </Link>
        <Link 
          href={`/job/${job.id}/apply`}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-center"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};