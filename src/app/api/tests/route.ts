import { NextResponse } from 'next/server';
import  dbConnect  from '@/lib/mongo';
import Test from '@/model/Test';

export async function GET() {
  try {
    await dbConnect();
    const tests = await Test.find().sort({ createdAt: -1 });
    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    return NextResponse.json({ message: 'Error fetching tests', error: error}, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { testName, questions } = await request.json();

    const newTest = new Test({
      testName,
      questions,
      isPublished: false,
    });

    const savedTest = await newTest.save();

    return NextResponse.json({ message: 'Test created successfully', testId: savedTest._id }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/tests:', error);
    return NextResponse.json({ message: 'Error creating test', error: error }, { status: 500 });
  }
}