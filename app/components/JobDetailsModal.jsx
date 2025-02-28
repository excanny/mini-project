// components/JobDetailsModal.jsx
'use client'

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function JobDetailsModal({ job, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus trap and escape key handling
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [onClose]);

  // Handle clicking outside the modal to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!job) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative animate-in fade-in duration-200"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-lg text-gray-600">{job.company}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {job.location}
              </span>
              <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                {typeof job.salary === 'number' ? `$${job.salary.toLocaleString()}` : job.salary}
              </span>
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Match: {job.matchScore}%
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Job Description</h3>
              <p className="text-gray-700">
                {job.description || "This position offers an exciting opportunity to join our growing team..."}
              </p>
              
              <h3 className="font-semibold text-lg mt-6 mb-3 text-gray-800">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {job.responsibilities ? 
                  job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : 
                  ['Develop and maintain high-quality applications', 'Collaborate with cross-functional teams', 'Write clean, maintainable code'].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                }
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Required Skills</h3>
              <div className="space-y-3">
                {job.skills ? 
                  job.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${skill.match || 70}%` }}></div>
                      </div>
                      <span className="ml-3 min-w-[100px] text-sm font-medium text-gray-700">{skill.name}</span>
                    </div>
                  )) : 
                  ['JavaScript', 'React', 'CSS', 'Node.js'].map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${70 - index * 10}%` }}></div>
                      </div>
                      <span className="ml-3 min-w-[100px] text-sm font-medium text-gray-700">{skill}</span>
                    </div>
                  ))
                }
              </div>
              
              <h3 className="font-semibold text-lg mt-6 mb-3 text-gray-800">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {job.benefits ? 
                  job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : 
                  ['Competitive salary', 'Flexible working hours', 'Health insurance', 'Professional development'].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <a 
              href={`/jobs/${job.id}/apply`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}