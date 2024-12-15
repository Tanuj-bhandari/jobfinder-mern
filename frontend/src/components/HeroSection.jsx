import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import video from "../assets/video.mp4";
import videoDark from "../assets/girl.mp4";

const HeroSection = () => {
  const { light } = useSelector((store) => store.mode);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div
      className={`text-center h-5/6  ${light ? "bg-[#F9F7F5]" : "bg-[#030101]"}`}
    >
      <div className="relative flex flex-col gap-5 my-8">
        <div className="relative z-10 flex flex-col gap-5 my-10">
          <span
            className={`mx-auto px-4 py-2 rounded-full ${
              light ? "bg-gray-100 text-pink-500" : "bg-gray-800 text-green-500"
            } font-medium`}
          >
            Leading the Way in Job Search Excellence
          </span>
          <h1 className={`text-5xl ${light ? "" : "text-gray-200"} font-bold`}>
            Seek, Connect & Achieve <br /> Your Career{" "}
            <span className="text-blue-500">Aspirations</span>
          </h1>
          <p className="text-gray-500">
            Unlock your potential with opportunities that match your skills.
          </p>
          <div className={`flex w-[40%] shadow-lg ${light?'bg-white':'bg-zinc-600'} pl-3 py-2 items-center gap-4 mx-auto h-15 rounded-[15px]`}>
            <input
              type="text"
              placeholder="Find Your dream Jobs and your destination . . ."
              className={`outline-none border-none w-full h-10 px-2 text-md ${light?'bg-white':'bg-zinc-600 text-white'} `}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className={`h-12 py-2 mx-1 rounded-full ${light?'light':'bg-white text-black'} mr-2`}
              onClick={searchJobHandler}
            >
              <Search className="w-4" />
            </Button>
          </div>
        </div>
        {light ? (
          <div
            className="absolute top-7 right-0 h-full w-1/3 p-4 flex items-center justify-center z-0"
            key="light-video"
          >
            <video
              className="w-full h-auto object-cover bg-white"
              autoPlay
              muted
              loop
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) :(
          (
            <div
              className="absolute top-7 right-0 h-full w-1/3 p-4 flex items-center justify-center z-0"
              key="dark"
            >
              <video
                className="w-full h-auto object-cover bg-white"
                autoPlay
                muted
                loop
              >
                <source src={videoDark} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HeroSection;
