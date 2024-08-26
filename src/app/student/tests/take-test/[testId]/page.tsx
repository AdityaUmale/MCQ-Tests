"use client"

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

interface Question {
  id: string;
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
  const params = useParams();
  const testId = params.testId as string;

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/tests/take-test/${testId}`);
        if (response.ok) {
          const data = await response.json();
          setTest(data.test);
        } else {
          throw new Error('Failed to fetch test');
        }
      } catch (error) {
        console.error('Error fetching test:', error);
        alert('Failed to fetch test. Please try again.');
      }
    };

    fetchTest();
  }, [testId]);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", selectedAnswers);
    // Here you would typically send the answers to the server
    // and perhaps redirect to a results page
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">{test.testName}</h1>
      <div className="space-y-8">
        {test.questions.map((question) => (
          <div key={question.id} className="bg-background rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`bg-muted rounded-md px-4 py-3 cursor-pointer flex items-center justify-between ${
                    selectedAnswers[question.id] === index ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                  }`}
                >
                  <label className="flex items-center gap-2 w-full">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selectedAnswers[question.id] === index}
                      onChange={() => handleOptionSelect(question.id, index)}
                      className="h-4 w-4 rounded-full border-gray-300 bg-white text-primary focus:ring-primary"
                    />
                    <span
                      className={`${
                        selectedAnswers[question.id] === index ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit}>Submit Test</Button>
      </div>
    </div>
  )
}