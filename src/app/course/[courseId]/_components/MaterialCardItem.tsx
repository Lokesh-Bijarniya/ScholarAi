import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function MaterialCardItem({ material, index, studyTypeContent, course }) {
  const isReady = studyTypeContent?.[material.type]?.length > 0;

  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    setLoading(true);
    let chapters = '';
    course?.courseLayout?.chapters?.forEach((chapter) => {
      chapters = (chapter.chapterTitle || chapter.chapter_title) + ', ' + chapters;
    });
    const response = await axios.post(`/api/study-type-content`,
      {
        courseId: course?.courseId,
        type: material.name,
        chapters: chapters,
      }
    );
    setLoading(false);
  }

  return (
    <div
      className={`border shadow-sm rounded-lg p-5 flex flex-col justify-between h-full transition-all duration-300 ${isReady ? 'bg-white hover:shadow-md' : 'bg-gray-50 grayscale'
        }`}
    >
      <div className="w-full flex justify-end mb-2">
        <span
          className={`text-[10px] px-2 py-[2px] rounded-full ${isReady ? 'bg-green-500' : 'bg-gray-500'
            } text-white`}
        >
          {isReady ? 'Ready' : 'Generate'}
        </span>
      </div>

      <div className="flex flex-col items-center text-center flex-grow">
        <div className="flex flex-col items-center justify-center mb-3">
          <Image
            src={material.icon}
            alt={material.name}
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        <h2 className="font-medium text-sm">{material.name}</h2>
        <p className="text-gray-500 text-xs mt-1">{material.description}</p>
      </div>

      <Button
        className="mt-4 w-full cursor-pointer"
        variant="outline"
        onClick={!isReady ? GenerateContent : undefined}
      >
        {isReady ? (
          'View'
        ) : (
          <>
            {loading && <RefreshCcw className="mr-2 animate-spin" />}
            Generate
          </>
        )}
      </Button>
    </div>
  );
}

export default MaterialCardItem;
