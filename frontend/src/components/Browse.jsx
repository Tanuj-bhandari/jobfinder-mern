import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import NoJobsAvailable from './NoJobsAvailable'; // Import the NoJobsAvailable component
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);
    
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto h-[470px] my-6 border border-gray-300 rounded-md px-3 overflow-y-auto'>
                <h1 className='font-bold text-xl my-5'>Search Results ({allJobs.length})</h1>
                
                {allJobs.length === 0 ? (
                    <NoJobsAvailable />  // Display NoJobsAvailable component if no jobs found
                ) : (
                    <div className='grid grid-cols-3 gap-4'>
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default Browse;
