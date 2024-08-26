// page.tsx
"use client";

import { useState } from 'react'
import MCQForm from '../../components/MCQForm'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { QuestionData } from '@/types/QuestionData';

export default function CreateTestPage() {
  const [questions, setQuestions] = useState<QuestionData[]>([])
  const [testName, setTestName] = useState('')
  const [isTestComplete, setIsTestComplete] = useState(false)

  const handleAddQuestion = (questionData: QuestionData) => {
    setQuestions((prev) => [...prev, questionData])
  }

  const handleFinishTest = async () => {
    if (questions.length > 0) {
      try {
        const response = await fetch('/api/tests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ testName, questions }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setIsTestComplete(true)
          alert('Test saved successfully!')
        } else {
          throw new Error(data.message || 'Failed to save test');
        }
      } catch (error) {
        console.error('Error saving test:', error);
        alert(`Failed to save test: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      alert('Add at least one question to finish the test.');
    }
  }

  return (
    <div>
      {!isTestComplete ? (
        <>
          <div className="space-y-2">
            <Label>Test Name</Label>
            <Input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter Test Name"
              className="mb-4"
              required
            />
          </div>
          <MCQForm onAddQuestion={handleAddQuestion} />
          <Button onClick={handleFinishTest} className="mt-4">Finish Test</Button>
        </>
      ) : (
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle>Test Created: {testName}</CardTitle>
          </CardHeader>
          <CardFooter>
            <p>Your test with {questions.length} questions has been saved.</p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}