"use client";

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function CourseList() {
  const { user, isLoaded } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const {totalCourse,setTotalCourse} = useContext(CourseCountContext);

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [isLoaded, user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourses(result.data.result);
      setTotalCourse(result.data.result?.length);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 w-full max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Study Material</h2>
        <Button
          variant="outline"
          onClick={GetCourseList}
          className="flex items-center gap-2 border-primary text-primary"
        >
          <RefreshCw size={18} /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))
        ) : (
          courses.map((course, index) => (
            <CourseCardItem course={course} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default CourseList;
