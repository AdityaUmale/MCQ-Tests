"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TestResult {
  _id: string;
  testName: string;
  score: number;
  percentage: number;
}

export default function StudentTestResultsPage() {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    fetchTestResults();
  }, []);

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
      alert("Failed to fetch test results. Please try again.");
    }
  };

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
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
