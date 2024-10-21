import React, { useLayoutEffect, useRef } from 'react';
import { FiDownload, FiMonitor } from 'react-icons/fi';
import { useSelector } from 'react-redux';
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

gsap.registerPlugin(ScrollTrigger);

const TopInterviewQ = () => {
  const questions = [
    { id: 1, language: 'JavaScript', logo: js },
    { id: 2, language: 'Python', logo: py },
    { id: 3, language: 'Java', logo: java },
    { id: 4, language: 'C++', logo: c },
    { id: 5, language: 'Ruby', logo: ruby },
    { id: 6, language: 'PHP', logo: php },
    { id: 7, language: 'C#', logo: c2 },
    { id: 8, language: 'Go', logo: go },
  ];

  const { light } = useSelector((store) => store.mode);
  const questionRefs = useRef([]);

  useLayoutEffect(() => {
    // Initialize GSAP animations
    questionRefs.current.forEach((question, index) => {
      if (question) {
        gsap.fromTo(
          question,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: question,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              markers: false,  // Set true for debugging
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-20 p-5 border border-gray-300 rounded-md">
      <h1 className="text-center text-4xl font-bold flex justify-center items-center">
        <span className="font-bold text-blue-500 flex items-center">
          Top <FiMonitor className="ml-2" size={36} />
        </span>{' '}
        <span className={`${light ? '' : 'text-white'}`}>Interview Questions</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {questions.map(({ id, language, logo }, index) => (
          <div
            ref={(el) => (questionRefs.current[index] = el)}
            key={id}
            className={`flex flex-col items-center ${
              light ? 'bg-white' : 'bg-zinc-800 text-white'
            } p-4 border border-gray-400 shadow-lg rounded h-48`}
          >
            <div className="w-12 h-12 mb-3">
              <img className="rounded-full h-full w-full" src={logo} alt={`${language} logo`} />
            </div>
            <h2 className="font-semibold text-center">Top Coding Question of {language}</h2>
            <p className="text-sm text-center text-gray-600 mt-2">
              Download and prepare for coding round of {language}
            </p>
            <FiDownload className="text-gray-500 mt-auto cursor-pointer" size={24} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopInterviewQ;
