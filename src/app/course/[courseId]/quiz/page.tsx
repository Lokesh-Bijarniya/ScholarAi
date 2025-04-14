"use client";
import { useParams } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';

function Quiz() {
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [quizData, setQuizData] = useState();
    const [stepCount, setStepCount] = useState(0); // Start at 0 for the first step
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState();


    useEffect(() => {
        GetQuiz();
    }, []);

    useEffect(() => {
        setCorrectAnswer(null);
        setIsCorrectAnswer(null);
    }, [stepCount]);

    const GetQuiz = async () => {
        const res = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Quiz'
        });
        setQuizData(res.data);
        setQuiz(res.data?.content?.quiz);
    };

    const checkAnswer = (userAns, currQuest) => {
        if (userAns === currQuest?.answer) {
            setIsCorrectAnswer(true);
            setCorrectAnswer(currQuest?.answer);
        } else {
            setIsCorrectAnswer(false);
        }
    };

    return (
        <div>
          <h1 className='text-4xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight tracking-tight text-center'>
  Quiz
</h1>


            <StepProgress stepCount={stepCount} setStepCount={setStepCount} data={quiz} />

            <div>
                {quiz[stepCount] && <QuizCardItem quiz={quiz[stepCount]}  userSelectedOption={(v)=> checkAnswer(v,quiz[stepCount])}/>}
            </div>


            {isCorrectAnswer==false && 
            <div className='mt-5'>
                <h2 className='border p-3 border-red-700 bg-red-200 text-red-600 font-medium text-lg rounded-lg'>Incorrect Answer <p className='text-gray-500 text-sm'>The correct answer is: {correctAnswer}</p></h2>
               
            </div>
            }

            {isCorrectAnswer==true &&
            <div className='mt-5'>
                <h2 className='border p-3 border-green-700 bg-green-200 text-green-600 font-medium text-lg rounded-lg'>Correct Answer
                <p className='text-gray-500 text-sm'>The correct answer is: {correctAnswer}</p>
                </h2>
            </div>
            }
        </div>
    );
}

export default Quiz;
