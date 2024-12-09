import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isIntiallyApplied =
        singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some(
                            (application) => application.applicant === user?._id
                        )
                    ); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-6xl mx-auto my-10 border border-gray-300 rounded-lg shadow-lg px-6 py-8 bg-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1 "
                    >
                        <AiOutlineArrowLeft className='text-decoration-none text-black text-2xl' size={20} />
                        Back
                    </button>
                    <h1 className="font-bold text-2xl text-gray-800"> Job Description</h1>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${
                        isApplied
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className="border-b-2 border-gray-300 font-semibold text-xl py-4 text-gray-700">
            {singleJob?.title}
            </h1>
            <div className="my-6 text-gray-700">
                <h1 className="font-semibold my-2">
                    <strong>Role: </strong><span className="pl-4 font-normal">{singleJob?.title}</span>
                </h1>
                <h1 className="font-semibold my-2">
                <strong>Location: </strong> <span className="pl-4 font-normal">{singleJob?.location}</span>
                </h1>
                <h1 className="font-semibold my-2">
                <strong>Description: </strong> <span className="pl-4 font-normal">{singleJob?.description}</span>
                </h1>
                <h1 className="font-semibold my-2">
                <strong>Experience: </strong> <span className="pl-4 font-normal">{singleJob?.experienceLevel} yrs</span>
                </h1>
                <h1 className="font-semibold my-2">
                <strong>Salary: </strong> <span className="pl-4 font-normal">{singleJob?.salary} LPA</span>
                </h1>
                <h1 className="font-semibold my-2">
                <strong>Total Applications: </strong>{' '}
                    <span className="pl-4 font-normal">{singleJob?.applications?.length}</span>
                </h1>
                <h1 className="font-semibold my-2">
                <strong>Posted Date: </strong>:{' '}
                    <span className="pl-4 font-normal">{singleJob?.createdAt.split('T')[0]}</span>
                </h1>
            </div>
            <div className="flex flex-wrap gap-2">
                <Badge className="text-blue-700 font-semibold" variant="ghost">
                    {singleJob?.position} Positions
                </Badge>
                <Badge className="text-red-600 font-semibold" variant="ghost">
                    {singleJob?.jobType}
                </Badge>
                <Badge className="text-purple-700 font-semibold" variant="ghost">
                    {singleJob?.salary} LPA
                </Badge>
            </div>
            <div className='my-3'>
                <h1 className='text-xl font-semibold text-gray-800 border-b-2 border-gray-300 py-2'>Company Details</h1>
                
                <div className='my-3'>
                <h1 className='my-2'><strong>Company Name: </strong><span className='pl-4'>{singleJob?.company?.name}</span></h1>
                <h1 className='my-2'><strong> Description: </strong><span className='pl-4'>{singleJob?.company?.description}</span></h1>
                <h1 className='my-2'><strong>Location: </strong><span className='pl-4'>{singleJob?.company?.location}</span></h1>
                <h1 className='my-2'><strong> Vist our Website: </strong><a href={`www.${singleJob?.company?.name}.com`} className='pl-4 text-blue-500'>{singleJob?.company?.website}</a></h1>
                </div>
                </div>
        </div>
    );
};

export default JobDescription;
