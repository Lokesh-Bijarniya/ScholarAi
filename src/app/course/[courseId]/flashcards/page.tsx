"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/FlashcardItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';



function Flashcards() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState();
  const router = useRouter();


  useEffect(() => {
    GetFlashcards();
  }, [])

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => {
      setIsFlipped(false);
    })
  }, [api])

  const GetFlashcards = async () => {
    const res = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: "flashcards"
    });
    const data = res.data;
    console.log("flashcards", data);
    if (data) {
      setFlashcards(data);
    }
  }
  return (
    <div>
      <div className="text-center my-8 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-tight">
          🧠 Flashcards
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Power through concepts with quick recall! These flashcards are crafted to boost memory retention and reinforce your learning journey.
        </p>
      </div>


      <div className='flex items-center justify-center mt-10'>
        <Carousel className="w-full h-[300px] md:h-[400px]" setApi={setApi}>
          <CarouselPrevious className="absolute left-2 z-10">
            Previous
          </CarouselPrevious>
          <CarouselNext className="absolute right-2 z-10">
            Next
          </CarouselNext>

          <CarouselContent>
            {flashcards?.content?.flashcards?.map((item, index) => (
              <CarouselItem key={index} className="w-full flex items-center justify-center">
                <FlashCardItem isFlipped={isFlipped} handleClick={() => setIsFlipped(!isFlipped)}
                  flashcard={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex justify-center mt-10">
          <button
            onClick={() => router.push(`/course/${courseId}`)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Back to Course
          </button>
        </div>
    </div>
  )
}

export default Flashcards;
