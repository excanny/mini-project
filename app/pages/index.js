import { useState, useEffect } from 'react';
import { JobList } from '../components/JobList';
import { JobDetailsModal } from '../components/JobDetailsModal';
import { SkillGapAlert } from '../components/SkillGapAlert';
import { toast } from '../components/ui/use-toast';

export default function JobMatchDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSkillGapAlertOpen, setIsSkillGapAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job data from API
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock job data
        const mockJobs = [
          {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp Inc.",
            location: "Remote",
            salaryMin: 80000,
            salaryMax: 120000,
            matchScore: 85,
            description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using modern JavaScript frameworks.",
            requiredSkills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
            userSkills: ["React", "JavaScript", "HTML", "CSS"],
          },
          {
            id: 2,
            title: "Backend Engineer",
            company: "DataSystems LLC",
            location: "New York, NY",
            salaryMin: 90000,
            salaryMax: 140000,
            matchScore: 72,
            description: "Join our backend team to develop robust server-side applications. You will be working with databases, APIs, and server infrastructure.",
            requiredSkills: ["Node.js", "Python", "SQL", "MongoDB", "AWS"],
            userSkills: ["Node.js", "SQL", "MongoDB"],
          },
          {
            id: 3,
            title: "Full Stack Developer",
            company: "Innovate Solutions",
            location: "San Francisco, CA",
            salaryMin: 100000,
            salaryMax: 150000,
            matchScore: 65,
            description: "Looking for a versatile developer to work on both frontend and backend systems. You'll collaborate with cross-functional teams to deliver complete web applications.",
            requiredSkills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
            userSkills: ["React", "Node.js", "MongoDB"],
          },
          {
            id: 4,
            title: "UX Designer",
            company: "Creative Digital",
            location: "Austin, TX",
            salaryMin: 75000,
            salaryMax: 110000,
            matchScore: 45,
            description: "Join our UX team to create intuitive and engaging user experiences. You will conduct user research, create wireframes, and design interfaces.",
            requiredSkills: ["Figma", "User Research", "Prototyping", "UI Design", "Adobe XD"],
            userSkills: ["Figma", "UI Design"],
          },
          {
            id: 5,
            title: "DevOps Engineer",
            company: "CloudTech Solutions",
            location: "Chicago, IL",
            salaryMin: 95000,
            salaryMax: 145000,
            matchScore: 90,
            description: "We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll automate deployments and ensure system reliability.",
            requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
            userSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
          }
        ];
        
        setJobs(mockJobs);
      } catch (err) {
        setError("Failed to load job recommendations. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleApply = (job) => {
    // Check if user has all required skills
    const missingSkills = job.requiredSkills.filter(skill => !job.userSkills.includes(skill));
    
    if (missingSkills.length > 0) {
      setSelectedJob(job);
      setIsSkillGapAlertOpen(true);
    } else {
      // Directly apply if no skills are missing
      submitApplication(job);
    }
  };

  const submitApplication = (job) => {
    // In a real app, this would make an API call to submit the application
    // For demo purposes, we'll just show a success message
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Job Match Dashboard</h1>
        <p className="text-gray-600">Find your perfect job match based on your skills and preferences</p>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading job recommendations...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <JobList 
          jobs={jobs} 
          onViewDetails={handleViewDetails} 
          onApply={handleApply} 
        />
      )}
      
      <JobDetailsModal 
        job={selectedJob}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onApply={handleApply}
      />
      
      <SkillGapAlert 
        job={selectedJob}
        isOpen={isSkillGapAlertOpen}
        onClose={() => setIsSkillGapAlertOpen(false)}
        onProceed={() => {
          setIsSkillGapAlertOpen(false);
          submitApplication(selectedJob);
        }}
      />
    </div>
  );
}