import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongo";
import Test from "@/model/Test";
import TestResult from "@/model/TestResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import mongoose from 'mongoose';

export async function POST(request: Request) {
  const authSession = await getServerSession(authOptions);
  if (!authSession || !authSession.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  await dbConnect();
  const { testId, answers } = await request.json();

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    const test = await Test.findById(testId).session(mongoSession);
    if (!test) {
      throw new Error('Test not found');
    }

    const existingResult = await TestResult.findOne({
      user: authSession.user.id,
      test: testId
    }).session(mongoSession);

    if (existingResult) {
      throw new Error('Test already submitted');
    }

    // Calculate score and create TestResult
    let score = 0;
    test.questions.forEach((question: any) => {
      if (answers[question._id.toString()] === question.correctAnswer) {
        score++;
      }
    });

    const percentage = (score / test.questions.length) * 100;

    const testResult = new TestResult({
      userName: authSession.user.name,
      testName: test.testName,
      user: authSession.user.id,
      test: testId,
      answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        question: new mongoose.Types.ObjectId(questionId),
        selectedAnswer
      })),
      score,
      percentage
    });

    await testResult.save({ session: mongoSession });
    await mongoSession.commitTransaction();

    return NextResponse.json({ message: 'Test submitted successfully', score, percentage }, { status: 200 });
  } catch (error) {
    await mongoSession.abortTransaction();
    console.error('Error submitting test:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit test';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    mongoSession.endSession();
  }
}