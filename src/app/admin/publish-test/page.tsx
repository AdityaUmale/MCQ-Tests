"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Test {
  _id: string;
  testName: string;
  createdAt: string;
  isPublished: boolean;
}

export default function PublishTestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const {data: session, status} = useSession();
  const router = useRouter();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  if (status === "unauthenticated") {
    router.push("/login");
  }
  if (session?.user?.role !== "Admin") {
    router.push("/login");
  }

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/tests');
      if (response.ok) {
        const data = await response.json();
        setTests(data.tests);
      } else {
        throw new Error('Failed to fetch tests');
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
      alert('Failed to fetch tests. Please try again.');
    }
  };

  const handlePublishToggle = async (testId: string, newStatus: boolean) => {
    try {
      const response = await fetch(`/api/tests/${testId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished: newStatus }),
      });

      if (response.ok) {
        fetchTests(); // Refetch tests to update the UI
      } else {
        throw new Error('Failed to update test status');
      }
    } catch (error) {
      console.error('Error updating test status:', error);
      alert('Failed to update test status. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Manage Tests</h1>
      {tests.map((test) => (
        <Card key={test._id} className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{test.testName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handlePublishToggle(test._id, true)}
                disabled={test.isPublished}
              >
                Publish Test
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePublishToggle(test._id, false)}
                disabled={!test.isPublished}
              >
                Unpublish Test
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Created at: {new Date(test.createdAt).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Status: {test.isPublished ? 'Published' : 'Unpublished'}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}