import React from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "AI/ML Engineer",
  "Cybersecurity Specialist",
  "Database Administrator",
  "UX/UI Designer",
  "Quality Assurance (QA) Tester",
  "IT Support Specialist",
  "Network Engineer",
  "Blockchain Developer",
  "Systems Analyst",
  "Product Manager",
  "Software Architect",
  "Technical Writer"
]

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { light } = useSelector((store) => store.mode);
  const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
  return (
    <div>
      <Carousel className="w-3/6 max-w-6xl mx-auto my-10"> {/* Adjust the width as needed */}
        <CarouselContent className="flex gap-2"> {/* Adjust gap if needed */}
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className="w-52"> {/* Ensure each item takes up 1/3 of the container */}
                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className={`w-52 h-full text-white bg-black ${!light?'bg-white text-black':''}`}>{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
