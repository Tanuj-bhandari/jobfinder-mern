import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from 'react-redux';

const company=["Google","Microsoft","Amazon","Flipkart"]
const TopCompanies = () => {
  const { light } = useSelector((store) => store.mode);
  return (
    <div className='max-w-6xl mx-auto my-20'>
        <div className='flex justify-center'>
        <h1 className='text-4xl font-bold'><span className='text-blue-500'>Top companies</span> <span className={`${light?'text-black':'text-white'}`}>Hiring Now</span></h1>
        </div>
        <div>
      <Carousel className="w-5/6 max-w-6xl mx-auto my-20"> 
        <CarouselContent className="flex gap-2  h-40 ml-1"> 
          {
            company.map((cat, index) => (
              <CarouselItem key={index} className="w-56 border-2 rounded-md px-0"> 
                <div className='w-full h-full py-2 flex flex-col gap-4 px-2'>
                 <div>
                 <div className='job-types flex gap-2 items-center'>
                    <h1 className='font-semibold '>MNCs</h1>
                    <IoIosArrowForward className='cursor-pointer text-black'/>
                  </div>
                  <small>1.9k+ are actively hiring</small>
                 </div>
                  <div className=' flex gap-1 h-full py-3'>
                    <div className='w-12 h-12 bg-white rounded-md'>
                      <img className='rounded-md h-full w-full' src="https://imgs.search.brave.com/5o9Ft_la8G3VBWruqyJMa1vaaBPBxzAeK8qsWJm4Y3w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9pbWcv/bi5wbmc" alt="" />
                    </div>
                    <div className='w-12 h-12 bg-white rounded-md'>
                    <img className='rounded-md h-full w-full' src="https://imgs.search.brave.com/KocevAFpfP4WwiHj5SrJdvQ17Edkuzes_fbaO7MpAFU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9pbWcv/bS5wbmc" alt="" />
                    </div>
                    <div className='w-12 h-12 bg-white rounded-md'>
                    <img className='rounded-md h-full w-full' src="https://imgs.search.brave.com/cjLpzo7rNkxz_DhdJzYDF0O3z0Qt1DBuVsQXh2I0_vI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9pbWcv/Yi5wbmc" alt="" />
                    </div>
                    <div className='w-12 h-12 bg-white rounded-md'>
                    <img className='rounded-md h-full w-full' src="https://imgs.search.brave.com/Ar0B7Vq4HTGvb1P-wdee0OsUVdN7qbp6DkBcy0FBaHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9pbWcv/aS5wbmc" alt="" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </div>
  )
}

export default TopCompanies