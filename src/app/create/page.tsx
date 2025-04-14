"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import SelectOption from './_components/SelectOption';
import TopicInput from './_components/TopicInput';
import { CourseCountContext } from '../_context/CourseCountContext';


interface FormData {
  studyType?: string;
  topic?: string;
  difficultyLevel?: string;
}

function Create() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({}); // Use an empty object initially
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {totalCourse} = useContext(CourseCountContext);


  const router = useRouter();

  const handleUserInput = (fieldName: string, fieldValue: string | number) => {
    setFormData(prevState => {
      const updatedState = { ...prevState, [fieldName]: fieldValue };
      return updatedState;
    });
  }

  // Used to Save User Input and Generate Course Layout using AI
  const GenerateCourseOutline = async () => {
    if (totalCourse >= 5) {
      toast.warning("You’ve used all 5 free credits. Please upgrade to create more courses.");
      return;
    }
  
    setIsLoading(true);
    const courseId = uuidv4();
    try {
      const result = await axios.post('/api/generate-course-outline', {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
  
      toast.success("Your course is being generated. Click on Refresh on the dashboard!");
      router.replace('/dashboard');
      console.log(result.data.result.resp);
    } catch (error) {
      toast.error("Something went wrong while generating the course.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Log the updated formData whenever it changes
  useEffect(() => {
    console.log(formData);
  }, [formData]); // This hook will run whenever formData is updated

  return (
    <div className='flex flex-col items-center p-5 md:px-2 lg:px-36 mt-20'>
      <h2 className='font-bold text-3xl text-blue-500'>Start Building Your Personal Study Material</h2>
      <p className='text-gray-500'>Fill All Details in order to generate study material for your next project</p>

      <div className='mt-10'>
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)} />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput('topic', value)}
            setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-32">
        {step !== 0 ? <Button variant="outline" onClick={() => setStep(step - 1)}>Prev</Button> : "-"}
        {step === 0 ? <Button onClick={() => setStep(step + 1)}>Next</Button> : <Button onClick={GenerateCourseOutline} disabled={isLoading}>
          {isLoading ? <Loader className='animate-spin' /> : 'Generate'}</Button>}
      </div>
    </div>
  )
}

export default Create;
