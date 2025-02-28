import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export const SkillGapAlert = ({ job, isOpen, onClose, onProceed }) => {
  if (!job) return null;
  
  const missingSkills = job.requiredSkills.filter(skill => !job.userSkills.includes(skill));
  
  if (missingSkills.length === 0) return null;
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Missing Skills Detected</AlertDialogTitle>
          <AlertDialogDescription>
            You're missing some skills required for this position:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {missingSkills.map((skill, index) => (
                <li key={index} className="text-red-500">{skill}</li>
              ))}
            </ul>
            <p className="mt-3">
              Consider upskilling in these areas to improve your chances. Would you still like to proceed with your application?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onProceed}>Proceed Anyway</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};