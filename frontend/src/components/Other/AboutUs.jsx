import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './aboutus.css';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      const direction = index === 0 ? 'center-down' : (index % 2 === 0 ? 'left' : 'right'); // First section from bottom, others alternate left and right
      gsap.fromTo(
        section,
        { opacity: 0, y: direction === 'center-down' ? 100 : 0, x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0 },
        {
          opacity: 1, y: 0, x: 0, duration: 1.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // Animation starts when section is 80% in view
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div className="about-us-container bg-gray-100 min-h-screen">
      <canvas id="backgroundCanvas"></canvas> {/* Background Canvas */}
      <div className="content-wrapper py-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">About Us</h1>
        
        <section ref={el => sectionRefs.current[0] = el} className="about-section flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl text-blue-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-800 max-w-2xl text-center">We strive to connect job seekers with the best career opportunities available. Our platform is dedicated to bridging the gap between talent and industry, providing users with the resources they need to succeed.</p>
          <button className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Read More</button>
        </section>

        <section ref={el => sectionRefs.current[1] = el} className="about-section flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl text-blue-700 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-800 max-w-2xl text-center">To lead the way in career solutions by continuously innovating and offering cutting-edge tools that empower individuals to achieve their dreams. We envision a future where everyone has access to the resources they need to grow.</p>
          <button className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Read More</button>
        </section>

        <section ref={el => sectionRefs.current[2] = el} className="about-section flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl text-blue-700 mb-4">Our Team</h2>
          <p className="text-lg text-gray-800 max-w-2xl text-center">We are a diverse team of professionals with a shared passion for helping others succeed. Our team is committed to providing top-notch services, making sure that every user finds the right job or candidate.</p>
          <button className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Read More</button>
        </section>

        <section ref={el => sectionRefs.current[3] = el} className="about-section flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl text-blue-700 mb-4">Our Values</h2>
          <p className="text-lg text-gray-800 max-w-2xl text-center">We believe in integrity, innovation, and commitment to excellence. These values drive everything we do, from developing our platform to interacting with users. We are always looking for new ways to improve and make a positive impact.</p>
          <button className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Read More</button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
