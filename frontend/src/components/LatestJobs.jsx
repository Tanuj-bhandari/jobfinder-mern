import React from 'react'
import LatestJobCards from './LatestJobCards';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const { light } = useSelector((store) => store.mode);
    return (
        <div className="max-w-5xl mx-auto my-20 h-5/6  flex flex-col  rounded-md ">
            <h1 className='text-4xl font-bold flex items-center justify-center'><span className='text-blue-500'>Latest & Top</span> <span className={`${light?'text-black':'text-white'}`}>Job openings</span></h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 my-5 px-1 sm:px-0 w-full">
                {
                    user && allJobs.length <= 0?'':allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id}job={job} />)
                }
            </div>

           <div className='flex items-center justify-center'>
           {!user?<Link to='/login'><Button className='w-60 h-12 rounded-md bg-blue-500'>You need to Login</Button></Link>:<Link><Button className='w-60 h-12 rounded-md bg-blue-500'>Get More Jobs</Button></Link>}
           </div>

        </div>
    )
}

export default LatestJobs