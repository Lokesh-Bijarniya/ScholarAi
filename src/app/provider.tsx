"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Provider({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const controller = new AbortController();
      
      const createUser = async () => {
        try {
          await axios.post('/api/create-user', {
            user: {
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: user.firstName,
              age: user.publicMetadata?.age || null
            }
          }, { signal: controller.signal });

          
            router.push('/dashboard');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error('User sync failed:', error);
          }
        }
      };

      createUser();
      
      return () => controller.abort();
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div>Loading...</div>;

  return <>{children}</>;
}