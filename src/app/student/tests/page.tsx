"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface Test {
  _id: string;
  testName: string;
  questions: any[]; // You might want to define a more specific type for questions
  createdAt: string;
}

function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function MessageCircleQuestionIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function TimerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  )
}

export default function StudentTestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedTests();
  }, []);

  const fetchPublishedTests = async () => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/tests/published?t=${timestamp}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setTests(data.tests);
    } catch (error) {
      console.error('Error fetching published tests:', error);
      // Set an error state or display a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  const handleGiveTest = (testId: string) => {
    try {
      console.log(`Navigating to /student/tests/take-test/${testId}`);
      router.push(`/student/tests/take-test/${testId}`);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };
  

  const handleReviewTest = (testId: string) => {
    router.push("/student/dashboard");
    console.log(`Reviewing test ${testId}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
      {loading ? <p>Loading tests...</p> : tests.map((test) => (
        <Card key={test._id} className="w-full max-w-md">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{test.testName}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleGiveTest(test._id)}>Give Test</Button>
              <Button onClick={() => handleReviewTest(test._id)}>Review Test</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
                <BookOpenIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">{test.testName}</p>
                <p className="text-muted-foreground text-sm">Test your knowledge on this subject.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
                <TimerIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">30 minutes</p>
                <p className="text-muted-foreground text-sm">Estimated time to complete the test.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
                <MessageCircleQuestionIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">{test.questions.length} questions</p>
                <p className="text-muted-foreground text-sm">Multiple choice questions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}