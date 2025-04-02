"use client"
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TopicInputProps {
    setTopic: (topic: string) => void;
    setDifficultyLevel: (level: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ setTopic, setDifficultyLevel }) => {
    return (
        <div className='mt-10 w-full flex flex-col'>
            <h2>Enter Topic or paste the content for which you want to generate study material</h2>
            <Textarea
                placeholder='Start writing here'
                className='mt-2 w-full'
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTopic(e.target.value)}
            />

            <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
            <Select onValueChange={(value: string) => setDifficultyLevel(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default TopicInput;
