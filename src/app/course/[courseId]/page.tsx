"use client"
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import CourseIntroCard from './_components/CourseIntroCard';
import ChapterList from './_components/ChapterList';
import StudyMaterialSection from './_components/StudyMaterialSection';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await axios.get('/api/courses/?courseId=' + courseId);
    console.log("res",result);
    console.log("course-result",result.data.result);
    setCourse(result.data.result);

    console.log(course);
  };

  return (
    <div className="pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Course Intro */}
        <CourseIntroCard course={course} />

        {/* Study Material Option */}
        <StudyMaterialSection courseId={courseId} course={course} />

        {/* Chapter List */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course;
