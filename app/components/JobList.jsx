import React from 'react';
import { JobListItem } from './JobListItem';

export const JobList = ({ jobs, onViewDetails, onApply }) => {
  console.log(jobs, "jobs");
  
  // Check if jobs is undefined or null before accessing its length property
  if (!jobs) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
        <p className="text-gray-500">Loading job recommendations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No job recommendations found.</p>
      ) : (
        jobs.map(job => (
          <JobListItem 
            key={job.id} 
            job={job} 
            onViewDetails={onViewDetails} 
            onApply={onApply} 
          />
        ))
      )}
    </div>
  );
};