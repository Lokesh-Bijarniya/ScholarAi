"use client";
import React, { useEffect, useState } from 'react'
import Sidebar from './_components/Sidebar'
import DashBoardHeader from './_components/DashboardHeader';
import { CourseCountContext } from '../_context/CourseCountContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [totalCourse, setTotalCourse] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div>
        {/* Sidebar only on md+ screens */}
        <div className="md:w-64 hidden md:block fixed">
          <Sidebar />
        </div>

        <div className='md:ml-64'>
          <DashBoardHeader showLogo={isMobile} />
          <div className='p-10'>
            {children}
          </div>
        </div>
      </div>
    </CourseCountContext.Provider>
  )
}
