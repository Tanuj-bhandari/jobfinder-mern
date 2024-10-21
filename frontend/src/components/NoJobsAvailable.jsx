import React from 'react';
import { motion } from 'framer-motion';
import './nojobs.css'
const NoJobsAvailable = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-[470px]"
        >
            <span className='text-2xl font-bold mb-4'>No Jobs Available</span>
            <div className="sad-face">
                <div className="eyes left-eye"></div>
                <div className="eyes right-eye"></div>
                <div className="mouth"></div>
            </div>
        </motion.div>
    );
};

export default NoJobsAvailable;
