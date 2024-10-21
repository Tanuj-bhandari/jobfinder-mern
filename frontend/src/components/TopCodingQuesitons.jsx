import React, { useEffect, useRef } from 'react';
import { FiDownload, FiMonitor } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import js from '../assets/javascript.png';
import py from '../assets/python.png';
import java from '../assets/java.png';
import c from '../assets/cplus.png';
import ruby from '../assets/r.png';
import c2 from '../assets/csharp.png';
import go from '../assets/go.png';
import php from '../assets/php.png';
import { useSelector } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

const TopCodingQuestions = () => {
  const questions = [
    { id: 1, language: 'JavaScript', logo: js },
    { id: 2, language: 'Python', logo: py },
    { id: 3, language: 'Java', logo: java },
    { id: 4, language: 'C++', logo: c },
    { id: 5, language: 'Ruby', logo: ruby },
    { id: 6, language: 'PHP', logo: php },
    { id: 7, language: 'C#', logo: c2 },
    { id: 8, language: 'Go', logo: go }
  ];

  const { light } = useSelector((store) => store.mode);
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    const items = element.querySelectorAll('.coding-question-div');
    
    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.8,
          from: 'start',
          start: 0, 
          ease: 'power1.out',
          // Group items into groups of 2, then 3
          stagger: {
            amount: 0.8,
            start: 0,
            grid: [2, 3],
            ease: 'power1.out',
          }
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className='max-w-5xl mx-auto my-20 p-5 border border-gray-300 rounded-md'>
      <h1 className='text-center text-4xl font-bold flex justify-center items-center'>
        <span className='font-bold text-blue-500 flex items-center'>
          Top <FiMonitor className='ml-2' size={36} />
        </span>{' '}
        <span className={`${light ? '' : 'text-white'}`}>Coding Questions</span>
      </h1>
      <div className='w-full my-3 flex flex-col md:flex-row justify-between p-4'>
        {/* Left Side */}
        <div className='flex flex-col justify-between w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0'>
          {questions.slice(0, 4).map(({ id, language, logo }) => (
            <div
              key={id}
              className={`coding-question-div flex items-center ${light ? 'bg-white' : 'bg-zinc-800 text-white'} p-3 mb-2 shadow rounded`}
            >
              <div className='w-12 h-12 mr-3 flex justify-center items-center rounded-full'>
                <img className='rounded-full h-full w-full' src={logo} alt='' />
              </div>
              <div className='flex-1'>
                <h2 className='font-semibold'>Top Coding Question of {language}</h2>
                <p className='text-sm text-gray-600'>
                  Download and prepare for coding round of {language}
                </p>
              </div>
              <FiDownload className='text-gray-500 ml-auto cursor-pointer' size={24} />
            </div>
          ))}
        </div>
        {/* Right Side */}
        <div className='flex flex-col justify-between w-full md:w-1/2 pl-0 md:pl-2'>
          {questions.slice(4).map(({ id, language, logo }) => (
            <div
              key={id}
              className={`coding-question-div flex items-center ${light ? 'bg-white' : 'bg-zinc-800 text-white'} p-3 mb-2 shadow rounded`}
            >
              <div className='w-12 h-12 mr-3 flex justify-center items-center rounded-full'>
                <img className='rounded-full h-full w-full' src={logo} alt='' />
              </div>
              <div className='flex-1'>
                <h2 className='font-semibold'>Top Coding Question of {language}</h2>
                <p className='text-sm text-gray-600'>
                  Download and prepare for coding round of {language}
                </p>
              </div>
              <FiDownload className='text-gray-500 ml-auto cursor-pointer' size={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCodingQuestions;
