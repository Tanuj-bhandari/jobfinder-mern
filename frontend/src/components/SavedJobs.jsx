import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import Footer from './Footer';


const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const getSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/getSavedJobs`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later.");
                }
            }
        };
        getSavedJobs();
    }, [savedJobs]); 
    return (

        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto h-[470px] my-6 border border-gray-300 rounded-md px-3 overflow-y-auto'>
                
                {savedJobs.length === 0 ? (
                    <h1 className='font-bold text-xl my-5'>No Saved Jobs</h1>
                ) : (
                    <div className='grid grid-cols-3 gap-4'>
                        {savedJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default SavedJobs;
