import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth";
import Test from '@/model/Test';
import TestResult from '../../../model/TestResult';
import { dbConnect } from '@/lib/mongo';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  await dbConnect();
  const { testId, answers } = await request.json();
  console.log("answers are:", answers);
  console.log("testId is:", testId);

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    let score = 0;
    const totalQuestions = test.questions.length;

    test.questions.forEach((question: any) => {
      const questionId = question._id.toString();
      console.log("question id is:", questionId);
      console.log("submitted answer is:", answers[questionId]);
      console.log("correct answer is:", question.correctAnswer);

      if (answers[questionId] === question.correctAnswer) {
        score++;
        console.log("Correct answer!");
      } else {
        console.log("Incorrect answer.");
      }
    });

    const percentage = (score / totalQuestions) * 100;

    const testResult = new TestResult({
      userName: session.user.name,
      testName: test.testName,
      user: session.user.id,
      test: testId,
      answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        question: new mongoose.Types.ObjectId(questionId),
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