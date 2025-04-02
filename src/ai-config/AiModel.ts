import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model : "gemini-1.5-flash"
})


const generationConfig = {
    temperature = 1,
    topP = 0.95,
    topK = 40,
    maxOutputTokens = 8192,
    responseMimeType = 'application/json'
}

export const courseOutlineAiModel = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate a Study Material for Python for Exam and level moderate" }
            ],
        },
        {
            role: "model",
            parts: [
                { 
                    text: `{
                        "course_title": "Python Exam Study Material",
                        "level": "moderate",
                        "topics": [
                            {
                                "topic_name": "Introduction to Python",
                                "subtopics": [
                                    "What is Python?",
                                    "Python syntax and semantics",
                                    "Data types and variables"
                                ]
                            },
                            {
                                "topic_name": "Control Flow",
                                "subtopics": [
                                    "If-else statements",
                                    "Loops (for, while)",
                                    "Break, continue, pass"
                                ]
                            },
                            {
                                "topic_name": "Functions",
                                "subtopics": [
                                    "Defining functions",
                                    "Arguments and return values",
                                    "Lambda functions"
                                ]
                            },
                            {
                                "topic_name": "Data Structures",
                                "subtopics": [
                                    "Lists and tuples",
                                    "Dictionaries",
                                    "Sets"
                                ]
                            },
                            {
                                "topic_name": "File Handling",
                                "subtopics": [
                                    "Reading files",
                                    "Writing files",
                                    "Working with CSV and JSON"
                                ]
                            }
                        ]
                    }`
                }
            ]
        }
    ]
});
