import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function QuizCardItem({quiz,userSelectedOption}) {
    const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className='mt-10 p-5'>
        <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>

            <div className='grid grid-cols-2 gap-5 mt-5'>
                {quiz?.options.map((option, index) => (
                    <Button key={index} variant='outline' className={`w-full border rounded-full p-3 text-center text-lg hover:bg-gray-200 cursor-pointer ${selectedOption === option && 'bg-blue-500 text-white hover:bg-blue-500'}`}
                    onClick={() => {setSelectedOption(option)
                        userSelectedOption(option)
                    }
                    }
                    >
                        {option}
                    </Button>
                ))}
            </div>
    </div>
  )
}

export default QuizCardItem
