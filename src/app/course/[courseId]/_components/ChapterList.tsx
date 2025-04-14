import React from 'react';

function ChapterList({ course }) {
  const Chapters = course?.courseLayout?.chapters;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Chapters</h2>
      <div className="space-y-3">
        {Chapters?.map((chapter, index) => (
          <div
            key={index}
            className="flex gap-4 items-start p-4 border shadow-sm rounded-lg cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="text-3xl">{chapter.emojiIcon}</div>

            <div>
              <h3 className="font-semibold text-md">{chapter?.chapterTitle}</h3>
              <p className="text-gray-500 text-sm">{chapter?.chapterSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
