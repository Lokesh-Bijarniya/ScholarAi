"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface SelectOptionProps {
    selectedStudyType: (studyType: string) => void;
}

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
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h2 className="text-center text-xl font-semibold mb-6">
                For which do you want to create your personal study material?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {options.map((option, idx) => (
                    <div 
                        key={idx}
                        className={`p-5 bg-white shadow-md rounded-xl flex flex-col items-center justify-center transition-all duration-300 border-2 cursor-pointer 
                        ${option.name === selectedOption ? 'border-blue-500' : 'border-transparent hover:border-blue-300'}`}
                        onClick={() => {
                            setSelectedOption(option.name);
                            selectedStudyType(option.name);
                        }}
                    >
                        <Image src={option.icon} alt={option.name} height={60} width={60} className="mb-3" />
                        <h2 className="text-sm font-medium text-center">{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectOption;
