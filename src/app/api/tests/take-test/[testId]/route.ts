import { NextResponse } from 'next/server';
import  dbConnect  from '@/lib/mongo';
import Test from '@/model/Test';

export async function GET(request: Request, { params }: { params: { testId: string } }) {
  try {
    await dbConnect();
    const { testId } = params;
    const test = await Test.findOne({ _id: testId, isPublished: true });

    if (!test) {
      return NextResponse.json({ message: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json({ test });
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json({ message: 'Error fetching test', error: error}, { status: 500 });
  }
}