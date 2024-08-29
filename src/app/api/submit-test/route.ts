import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth";
import Test from '@/model/Test';
import TestResult from '../../../model/TestResult';
import { dbConnect } from '@/lib/mongo';

export async function POST(request: Request) {
  // Commented out for testing
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const { testId, answers } = await request.json();

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    let score = 0;
    const totalQuestions = test.questions.length;

    test.questions.forEach((question: any) => {
      if (answers[question._id] === question.correctAnswer) {
        score++;
      }
    });

    const percentage = (score / totalQuestions) * 100;

    const testResult = new TestResult({
      user: session.user.id,
      test: testId,
      answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        question: questionId,
        selectedAnswer
      })),
      score,
      percentage
    });

    await testResult.save();

    return NextResponse.json({ message: 'Test submitted successfully', score, percentage }, { status: 200 });
  } catch (error) {
    console.error('Error submitting test:', error);
    return NextResponse.json({ error: 'Failed to submit test' }, { status: 500 });
  }
}