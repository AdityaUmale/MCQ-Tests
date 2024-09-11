"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Test {
  _id: string;
  testName: string;
  questions: Question[];
}

export default function TakeTestPage() {
  const [test, setTest] = useState<Test | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const testId = params.testId as string;
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || session?.user?.role !== "Student") {
      router.push("/login");
    } else {
      fetchTest();
    }
  },  [status, session, router]);

  
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/tests/take-test/${testId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched test data:", data.test);
          setTest(data.test);
        } else {
          throw new Error('Failed to fetch test');
        }
      } catch (error) {
        console.error('Error fetching test:', error);
        alert('Failed to fetch test. Please try again.');
      }
    };
  


  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    console.log(`Selecting option ${optionIndex} for question ${questionId}`);
    setSelectedAnswers(prevState => {
      const newState = { ...prevState, [questionId]: optionIndex };
      console.log("New selected answers state:", newState);
      return newState;
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (status !== "authenticated") {
      alert("You must be logged in to submit a test.");
      return;
    }
  
    console.log("Submitted answers:", selectedAnswers);
    
    try {
      const response = await fetch(`/api/submit-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: session?.user?.name,
          testName: test?.testName,
          testId,
          answers: selectedAnswers,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Test submitted successfully:", result);
        router.push("/student/results");
        // Redirect to a results page or show a success message
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Failed to submit test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!test) {
    return <div>Loading...</div>;
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated" || session?.user?.role !== "Student") {
    return null; // or a custom unauthorized message
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">{test.testName}</h1>
      <div className="space-y-8">
        {test.questions.map((question, index) => (
          <div key={question._id} className="bg-background rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">{index + 1}. {question.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, optionIndex) => (
                <div
                  key={`${question._id}-${optionIndex}`}
                  className={`bg-muted rounded-md px-4 py-3 cursor-pointer flex items-center justify-between ${
                    selectedAnswers[question._id] === optionIndex ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleOptionSelect(question._id, optionIndex)}
                >
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      checked={selectedAnswers[question._id] === optionIndex}
                      onChange={() => {}} // Add an empty onChange to suppress the warning
                      className="h-4 w-4 rounded-full border-gray-300 bg-white text-primary focus:ring-primary"
                    />
                    <span
                      className={`${
                        selectedAnswers[question._id] === optionIndex ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Test'}
        </Button>
      </div>
    </div>
  );
}