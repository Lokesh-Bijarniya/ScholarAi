"use client";

import Image from 'next/image';
import React, { useState } from 'react';

// Define the type for props
interface SelectOptionProps {
    selectedStudyType: (studyType: string) => void;
}

// Define the type for an option
interface Option {
    name: string;
    icon: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({ selectedStudyType }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const options: Option[] = [
        { name: 'Exam', icon: '/Exam.jpg' },
        { name: 'Job Interview', icon: '/Job.jpg' },
        { name: 'Practice', icon: '/Practice.jpg' },
        { name: 'Coding Prep', icon: '/Code.jpg' },
        { name: 'Other', icon: '/knowledge.jpg' },
    ];

    return (
        <div>
            <h2 className='text-center mb-2 text-lg'>
                For which do you want to create your personal study material?
            </h2>

            <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                {options.map((option, idx) => (
                    <div 
                        key={idx} 
                        className={`p-4 flex flex-col items-center border rounded-xl hover:border-blue-500 cursor-pointer ${option.name === selectedOption ? 'border-blue-500' : ''}`}
                        onClick={() => {
                            setSelectedOption(option.name);
                            selectedStudyType(option.name);
                        }}
                    >
                        <Image src={option.icon} alt={option.name} height={50} width={50} />
                        <h2 className='text-sm'>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectOption;
