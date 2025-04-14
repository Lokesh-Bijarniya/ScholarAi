"use client"
import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner';
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import CourseList from './_components/CourseList';

export default function Dashboard() {
  const user =  useUser();
  
  if (!user) {
    redirect('/sign-in?redirect_url=' + encodeURIComponent('/dashboard'))
  }
    
    if (!user) {
      redirect("/sign-in");
    }

  return (
    <div>
       <WelcomeBanner/>
          
      <CourseList/>

    </div>
  )
}
