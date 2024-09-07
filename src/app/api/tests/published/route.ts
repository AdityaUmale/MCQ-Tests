import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongo';
import Test from '@/model/Test';

export async function GET() {
  try {
    await dbConnect();
    const tests = await Test.find({ isPublished: true }).sort({ createdAt: -1 });
    return NextResponse.json({ tests });
  } catch (error: any) {
    console.error('Error fetching published tests:', error);
    return NextResponse.json({ message: 'Error fetching published tests', error: error.message }, { status: 500 });
  }
}