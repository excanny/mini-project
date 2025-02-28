// app/page.tsx
import { JobList } from './components/JobList';
import mockJobs from './services/mockJobs'; 

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Board</h1>
      <JobList 
        jobs={mockJobs} 
        //onViewDetails={handleViewDetails} 
        //onApply={handleApply} 
      />
    </div>
  );
};

export default HomePage;
