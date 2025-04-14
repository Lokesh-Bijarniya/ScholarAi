import { Progress } from '@radix-ui/react-progress';
import Image from 'next/image';


function CourseIntroCard({ course }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:items-center p-5 border shadow-md rounded-lg bg-white">
      <Image
        src={'/knowledge.jpg'}
        alt="other"
        width={70}
        height={70}
        className="object-contain"
      />

      <div className="flex-1">
        <h2 className="font-bold text-xl md:text-2xl">
          {course?.courseLayout?.courseTitle}{' '}
          <span className="text-sm font-normal text-gray-500">
            (
            {course?.courseLayout?.difficultyLevel !== 'undefined'
              ? course?.courseLayout?.difficultyLevel.charAt(0).toUpperCase() +
              course?.courseLayout?.difficultyLevel.slice(1)
              : 'Easy'}
            )
          </span>
        </h2>

        <p className="text-sm mt-1 text-gray-600">{course?.courseLayout?.courseSummary}</p>

        <Progress className="mt-4" />

        <h2 className="mt-3 text-md text-primary font-medium">
          Total Chapters: {course?.courseLayout?.chapters?.length}
        </h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;
