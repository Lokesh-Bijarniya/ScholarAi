import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function CourseCardItem({ course }) {
  const isGenerating = course?.status === 'Generating';

  // ✅ Format course.createdAt to a readable date
  const formattedDate = course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : 'Unknown Date';

  return (
    <div
      className={`border border-slate-200 rounded-lg p-5 shadow-md flex flex-col h-full transition-all duration-300 ${isGenerating ? 'animate-pulse bg-slate-50' : 'bg-white'
        }`}
    >
      <div className="flex items-center justify-between">
        <Image src={course?.thumbnailUrl} alt="thumbnail" height={50} width={50} />
        <h2 className="text-[10px] p-1 px-2 rounded-full bg-blue-500 text-white">
          {formattedDate}
        </h2>
      </div>

      <h2 className="text-lg font-bold mt-3">{course?.courseLayout?.courseTitle}</h2>
      <p className="text-gray-500 text-xs line-clamp-2 mt-2">
        {course?.courseLayout?.courseSummary}
      </p>

      <div className="mt-3 bg-blue-100">
        <Progress value={0} />
      </div>

      <div className="mt-auto pt-4 flex justify-end">
        {isGenerating ? (
          <h2 className="text-[12px] p-1 px-2 rounded-full bg-gray-400 text-white flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" /> Generating...
          </h2>
        ) : (
          <Link href={`/course/${course?.courseId}`} passHref>
            <Button>View</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CourseCardItem;
