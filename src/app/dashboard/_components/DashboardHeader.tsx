import { UserButton } from '@clerk/nextjs'
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface DashBoardHeaderProps {
  showLogo?: boolean;
}

function DashBoardHeader({ showLogo = false }: DashBoardHeaderProps) {
  return (
    <div className={`p-5 shadow-md flex items-center sticky top-0 z-10 bg-white ${!showLogo ? 'justify-end' : 'justify-between'}`}>
      {showLogo && (
        <div className='flex gap-2 items-center'>
          <Image src="/logo.svg" alt='logo' width={40} height={40} />
          <h2 className="font-bold text-lg">ScholarAI</h2>
        </div>
      )}
      <UserButton />
    </div>
  );
}

export default DashBoardHeader;
