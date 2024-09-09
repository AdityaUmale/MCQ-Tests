"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface TestResult {
  _id: string;
  testName: string;
  score: number;
  percentage: number;
  testId: string;
}

export default function StudentTestResultsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const router = useRouter();
  const {data: session, status} = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || session?.user?.role !== "Student") {
      router.push("/login");
    } else {
      fetchTestResults();
    }
  }, [status, session, router]);

  // useEffect(() => {
  //   fetchTestResults();
  // }, []);

  const fetchTestResults = async () => {
    try {
      const response = await fetch("/api/test-results");
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        throw new Error("Failed to fetch test results");
      }
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  };

  const handleLeaderboardClick = (testId: string) => {
    router.push(`/student/results/leaderboard/${testId}`);
  };

  const handleReviewClick = (testId: string, resultId: string) => {
    if (!testId || testId === "null") {
      console.error("Invalid testId:", testId);
      alert("Invalid test ID. Cannot review this test.");
      return;
    }
    router.push(`/student/results/review/${testId}/${resultId}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "Student") {
    return null; // or a custom unauthorized message
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Test Results</h1>

      {Array.isArray(results) && results.length > 0 ? (
        results.map((result) => (
          <Card key={result._id} className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{result.testName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Score: {result.score}</p>
              <p>Percentage: {result.percentage}%</p>
              <div className="space-x-2">
                <Button
                  onClick={() => handleLeaderboardClick(result.testId)}
                  className="mt-2"
                >
                  View Leaderboard
                </Button>
                <Button
                  onClick={() => handleReviewClick(result.testId, result._id)}
                >
                  Review Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
