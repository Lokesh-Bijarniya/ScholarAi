"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';  // Import the HTML parser

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/study-type', {
        courseId,
        studyType: 'NOTES',
      });
      console.log("get-notes", result);
      if (result.data) {
        setNotes(result.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentNoteRaw = notes[stepCount];
  const parsedNote = currentNoteRaw?.notes ? tryParseJSON(currentNoteRaw?.notes) : null;

  function tryParseJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return null;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!parsedNote) {
    return (
      <div className="p-5">
        <h2 className="text-xl font-semibold">No Notes Available</h2>
        <p>Please try again later or check back for notes.</p>
      </div>
    );
  }

  return (
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
          disabled={stepCount <= 0}
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
      <div className="mb-10 prose lg:prose-xl">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-2xl">{parsedNote.emoji}</span> {parsedNote.chapterTitle}
        </h2>
        <p className="text-gray-600 mb-4">{parsedNote.chapterSummary}</p>

        <div className="note-content mb-10 prose lg:prose-xl !max-w-none">
          <div className="[&>*]:!max-w-screen-xl [&>*]:!mx-auto">
            {parsedNote?.content && parse(parsedNote?.content)}
          </div>
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
