"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ReviewData {
  testName: string;
  questions: Question[];
  userAnswers: { [key: string]: number };
}

export default function ReviewTestPage() {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const params = useParams();
  const testId = params.testId as string;
  const resultId = params.resultId as string;
  const {data: session, status} = useSession()
  const router = useRouter();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  if (status === "unauthenticated") {
    router.push("/login");
  }
  if (session?.user?.role !== "Student") {
    router.push("/login");
  }

  useEffect(() => {
    fetchReviewData();
  }, [testId, resultId]);

  const fetchReviewData = async () => {
    if (!testId || !resultId || testId === "null" || resultId === "null") {
      console.error("Invalid testId or resultId");
      alert("Invalid test or result ID. Please try again.");
      return;
    }
  
    try {
      const response = await fetch(`/api/review/${testId}/${resultId}`);
      if (response.ok) {
        const data = await response.json();
        setReviewData(data);
      } else {
        throw new Error("Failed to fetch review data");
      }
    } catch (error) {
      console.error("Error fetching review data:", error);
      alert("Failed to fetch review data. Please try again.");
    }
  };

  if (!reviewData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{reviewData.testName} - Review</h1>
      {reviewData.questions.map((question, index) => (
        <Card key={question._id} className="w-full">
          <CardHeader>
            <CardTitle>Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">{question.question}</p>
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`p-2 my-1 rounded ${
                  optionIndex === reviewData.userAnswers[question._id]
                    ? optionIndex === question.correctAnswer
                      ? "bg-green-200"
                      : "bg-red-200"
                    : optionIndex === question.correctAnswer
                    ? "bg-green-100"
                    : ""
                }`}
              >
                {String.fromCharCode(65 + optionIndex)}. {option}
                {optionIndex === reviewData.userAnswers[question._id] && " (Your answer)"}
                {optionIndex === question.correctAnswer && " (Correct answer)"}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}