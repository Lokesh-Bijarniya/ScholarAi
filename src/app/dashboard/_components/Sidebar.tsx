"use client";

import { LayoutDashboard, Shield, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Adjust if needed
import { CourseCountContext } from '@/app/_context/CourseCountContext';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

function Sidebar() {
    const {totalCourse,setTotalCourse} = useContext(CourseCountContext);

  const MenuList: MenuItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Upgrade', icon: Shield, path: '/dashboard/upgrade' },
    { name: 'Profile', icon: UserCircle, path: '/dashboard/profile' },
  ];
  
  const path = usePathname();

  return (
    <div className='h-screen shadow-md p-5'>
      {/* Logo Section */}
      <div className='flex gap-2 items-center'>
        <Image src="/logo.svg" alt='logo' width={40} height={40} />
        <h2 className="font-bold text-lg">ScholarAI</h2>
      </div>

      {/* Create New Button */}
      <div className='mt-10'>
        <Link href="/create">
          <Button className='w-full mt-2 cursor-pointer'>+ Create New</Button>
        </Link>

        {/* Sidebar Menu List */}
        <div className='mt-5'>
          {MenuList.map((menu, idx) => (
             <Link key={idx} href={menu.path}>
             <div
               className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${
                 path === menu.path ? 'bg-slate-200' : ''
               }`}
             >
               <menu.icon />
               <h2>{menu.name}</h2>
             </div>
           </Link>
          ))}
        </div>
      </div>

      {/* Credits Section */}
      <div className='border p-5 bg-slate-100 rounded-lg absolute bottom-10 w-[85%]'>
        <h2 className='font-bold text-lg'>Available Credits: {(5-totalCourse)}</h2>
        <Progress value={(totalCourse/5)*100} />
        <h2 className='text-sm'>{totalCourse} Out of 5 Credits Used</h2>

        <Link href='/dashboard/upgrade' className='text-blue-700 text-xs mt-3'>
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
