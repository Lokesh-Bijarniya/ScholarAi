"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';

export default function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const hasRun = useRef(false);  // 👈 Prevents multiple API calls

  useEffect(() => {
    if (isLoaded && user && !hasRun.current) {
      hasRun.current = true;  // 👈 Ensure it runs only once
      checkIsNewUser();
    }
  }, [isLoaded, user]);

  const checkIsNewUser = async () => {
    try {
      const res = await axios.post('/api/create-user', { user });
      console.log(res.data);
    } catch (error) {
      console.error("User creation failed:", error);
    }
  };

  return <div>{children}</div>;
}
