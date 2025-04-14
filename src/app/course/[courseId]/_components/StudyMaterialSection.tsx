'use client';
import React, { useState, useEffect } from 'react';
import MaterialCardItem from './MaterialCardItem';
import Link from 'next/link';
import axios from 'axios';

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState(null);

  const MaterialList = [
    {
      name: 'Notes/Chapters',
      description: 'Read notes to prepare it',
      icon: '/notess.jpg',
      path: '/notes',
      type: 'notes',
    },
    {
      name: 'Flashcard',
      description: 'Flashcard helps to remember concepts',
      icon: '/flashcard.jpg',
      path: '/flashcards',
      type: 'flashcards',
    },
    {
      name: 'Quiz',
      description: 'Great way to test your knowledge',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz',
    },
    // {
    //   name: 'Question/Answer',
    //   description: 'Help to practice your learning',
    //   icon: '/qa.png',
    //   path: '/qa',
    //   type: 'qa',
    // },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, [courseId]);

  const GetStudyMaterial = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'ALL',
    });
    setStudyTypeContent(result?.data);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Study Material</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MaterialList.map((material, index) => (
          <Link href={`/course/${courseId}${material.path}`} key={index}>
            <MaterialCardItem
              material={material}
              index={index}
              studyTypeContent={studyTypeContent}
              course = {course}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;
