"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId,
        studyType: 'NOTES'
      });
      console.log("get-notes", result);
      if (result.data) {
        setNotes(result.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const currentNoteRaw = notes[stepCount];
  const parsedNote = currentNoteRaw?.notes ? JSON.parse(currentNoteRaw?.notes) : null;
  console.log("parsedNote", parsedNote);

  // If no note or error in parsing, show a fallback message
  if (!parsedNote) {
    return (
      <div className="p-5">
        <h2 className="text-xl font-semibold">No Notes Available</h2>
        <p>Please try again later or check back for notes.</p>
      </div>
    );
  }

  return notes.length > 0 && (
    <div className="p-5">
      {/* Progress Bar */}
      <div className="flex gap-2 items-center mb-6">
        {notes.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount(stepCount - 1)}
          disabled={stepCount === 0}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount(stepCount + 1)}
          disabled={stepCount === notes.length - 1}
        >
          Next
        </Button>
      </div>

      {/* Current Note Content */}
      <div className="mb-10 prose lg:prose-xl"> {/* Apply the prose class here */}
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-2xl">{parsedNote.emoji}</span> {parsedNote.chapterTitle}
        </h2>
        <p className="text-gray-600 mb-4">{parsedNote.chapterSummary}</p>

        {/* Render HTML content here */}
        <div className="mb-10 prose prose-neutral lg:prose-xl !max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: parsedNote?.content }}
            className="[&>*]:!max-w-screen-xl [&>*]:!mx-auto" // Force container styles
          />
        </div>
      </div>

      {/* End of Notes */}
      {stepCount === notes.length - 1 && (
        <div className="flex items-center gap-5 flex-col mt-10">
          <h2 className="text-lg font-semibold">End of Notes</h2>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            Go to Course Page
          </Button>
          <Button variant="primary" size="lg" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      )}
    </div>
  );
}

export default ViewNotes;
