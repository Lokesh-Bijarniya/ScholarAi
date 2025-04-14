import { Button } from '@/components/ui/button';
import React from 'react';

function StepProgress({ stepCount, setStepCount, data }) {
  const totalSteps = data?.length || 0;
  const progressPercentage = ((stepCount + 1) / totalSteps) * 100;

  if (!data || totalSteps === 0) {
    return <div className="text-gray-500 text-center py-4">No steps available</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full mt-6">
      {/* Progress Indicators */}
      <div className="relative flex justify-between items-center w-full px-4">
        {/* Active Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-100 -translate-y-1/2 transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Steps */}
        {data.map((_, index) => (
          <div 
            key={index}
            className="relative z-10 flex flex-col items-center"
            role="progressbar"
          >
            <div 
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                index <= stepCount 
                  ? 'bg-blue-500 border-blue-600 scale-110' 
                  : 'bg-white border-gray-300'
              }`}
            >
              {index === stepCount && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </div>
            <span className="absolute top-8 text-sm text-gray-500 font-medium">
              {index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between gap-4 mt-4">
        <Button
          variant="outline"
          size="lg"
          className="min-w-[120px] shadow-sm hover:shadow-md transition-shadow"
          onClick={() => setStepCount(stepCount - 1)}
          disabled={stepCount === 0}
          aria-label="Previous step"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="min-w-[120px] shadow-sm hover:shadow-md transition-shadow"
          onClick={() => setStepCount(stepCount + 1)}
          disabled={stepCount === totalSteps - 1}
          aria-label="Next step"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default StepProgress;