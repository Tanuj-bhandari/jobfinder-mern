import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import TopCompanies from "./TopCompanies";
import Footer from "./Footer";
import './home.css';
import { FaAnglesUp } from "react-icons/fa6";import { changeMode } from "@/redux/modeSlice";
import {  useSelector } from 'react-redux';
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import MeetingComponent from "./MeetingComponent";
import TopCodingQuesitons from "./TopCodingQuesitons";
import TopInterviewQ from "./TopInterviewQ";

function Home() {
  useGetAllJobs();
  const { light} = useSelector(store => store.mode); 
  const { user} = useSelector(store => store.auth); 

  const scrollToHero = () => {
    const heroElement = document.getElementById("navbar");
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate= useNavigate();
  useEffect(()=>{
      if(user?.role==='recruiter'){
          navigate("/admin/companies");
      }
  },[]);

  return (
    <div className="relative min-h-screen">
    
        <div className={`relative ${light?'bg-[#F9FAF5]':'bg-[#030101]'}`}>
          <div id="navbar">
            <Navbar />
          </div>
          <div id="hero">
            <HeroSection />
          </div>
          <CategoryCarousel />
          <TopCompanies />
          <MeetingComponent/>
          <LatestJobs />
          <div onClick={scrollToHero} className="fixed cursor-pointer bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full">
            <FaAnglesUp />
          </div>
          <TopCodingQuesitons/>
          <TopInterviewQ/>
          <Footer />
        </div>
    
    </div>
  )
}

export default Home;
