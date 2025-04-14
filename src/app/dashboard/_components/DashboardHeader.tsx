import { UserButton, useUser } from '@clerk/nextjs'
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface DashBoardHeaderProps {
  showLogo?: boolean;
}

function DashBoardHeader({ showLogo = false }: DashBoardHeaderProps) {
  const { user } = useUser();
  const userName = user?.fullName;
  return (
    <div className={`p-5 shadow-md flex items-center sticky top-0 z-10 bg-white ${!showLogo ? 'justify-end' : 'justify-between'}`}>
      {showLogo && (
        <div className='flex gap-2 items-center'>
          <Image src="/logo.svg" alt='logo' width={40} height={40} />
          <h2 className="font-bold text-lg">ScholarAI</h2>
        </div>
      )}

<div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-all">
  <UserButton className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
    {/* Assuming UserButton is an avatar */}
  </UserButton>
  <h3 className="text-md font-semibold text-gray-800">{userName}</h3>
</div>

    </div>
  );
}

export default DashBoardHeader;
