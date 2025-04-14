import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
      <div className="w-full h-full flex justify-center items-center">
        <UserProfile/> 
      </div>
    </div>
  );
}
