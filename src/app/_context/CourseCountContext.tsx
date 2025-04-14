import {createContext} from 'react';

export const CourseCountContext = createContext({
    totalCourse: 0,
    setTotalCourse: (count: number) => {
      console.log('setTotalCourse called with:', count);
    },    
  });

export const CourseCountProvider = CourseCountContext.Provider;