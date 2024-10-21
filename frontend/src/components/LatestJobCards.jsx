import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'
import { useSelector } from 'react-redux';

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  const { light } = useSelector((store) => store.mode);
  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className={`p-5  rounded-md shadow-xl ${light?'bg-white border border-gray-300':'bg-zinc-900 text-white'}  cursor-pointer`}>
        <div className=''>
        <div className='mb-4 w-full flex justify-center'><img className='h-full w-20' src={`${job?.company?.logo}`}alt="not found" /></div>
        <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.company?.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'> {job?.description} </p>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <Badge className='text-pink-500 font-bold' variant="ghost">{job?.position} Positions</Badge>
            <Badge className='text-blue-400 font-bold' variant="ghost"> {job?.jobType}</Badge>
            <Badge className='text-green-500 font-bold' variant="ghost">{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards