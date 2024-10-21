import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import NoJobsAvailable from './NoJobsAvailable';
import Footer from './Footer';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const { light } = useSelector((store) => store.mode);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className={`${light?'bg-white':'bg-black'}`}>
            <Navbar />
            <div className={`max-w-6xl mx-auto mt-5  ${light?'bg-white border border-gray-300':'bg-zinc-800'}  rounded-md h-[470px]`}>
                <div className='flex gap-5'>
                    <div className={`w-[20%]`}>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <NoJobsAvailable/> : (
                            <div className='flex-1 h-[470px] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4 py-2'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

                    <Footer/>
        </div>
    )
}

export default Jobs