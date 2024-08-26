import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongo';
import Test from '../../../model/Test';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { testName, questions } = await request.json();

    const newTest = new Test({
      testName,
      questions,
    });

    const savedTest = await newTest.save();

    return NextResponse.json({ message: 'Test created successfully', testId: savedTest._id }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/tests:', error );
    return NextResponse.json({ message: 'Error creating test', error: error }, { status: 500 });
  }
}