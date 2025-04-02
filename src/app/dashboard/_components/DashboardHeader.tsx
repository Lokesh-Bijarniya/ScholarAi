import { UserButton } from '@clerk/nextjs'
import { UserCircle } from 'lucide-react';
import React from 'react'

function DashBoardHeader() {
  return (
    <div className='p-5 shadow-md'>
       {/* <UserButton/> */}
       <UserCircle className='h-10 w-10 rounded-full ml-auto'/>
    </div>
  )
}

export default DashBoardHeader;
