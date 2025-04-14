'use client';
import React from 'react';
import ReactCardFlip from 'react-card-flip';

function FlashCardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className="transition-transform duration-300">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        
        {/* Front */}
        <div
          className="bg-gray-50 border border-gray-200 shadow-xl rounded-xl p-6 
          flex items-center justify-center cursor-pointer 
          w-[260px] h-[340px] md:w-[320px] md:h-[400px] 
          transition-transform duration-500 ease-in-out
          hover:shadow-2xl hover:scale-105 text-center"
          onClick={handleClick}
        >
          <h2 className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed">{flashcard?.front}</h2>
        </div>

        {/* Back */}
        <div
          className="bg-gray-100 border border-gray-200 shadow-xl rounded-xl p-6 
          flex items-center justify-center cursor-pointer 
          w-[260px] h-[340px] md:w-[320px] md:h-[400px] 
          transition-transform duration-500 ease-in-out
          hover:shadow-2xl hover:scale-105 text-center"
          onClick={handleClick}
        >
          <h2 className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed">{flashcard?.back}</h2>
        </div>

      </ReactCardFlip>
    </div>
  );
}

export default FlashCardItem;
