
import DashBoardHeader from '../../dashboard/_components/DashboardHeader';
import React from 'react'

function CourseViewLayout({children}) {
  return (
    <div>
        <DashBoardHeader/>
        <div className='mx-10 md:mx-36 lg:px-44 mt-10'>
          {children}  
        </div>
        
    </div>
  )
}

export default CourseViewLayout;
