import { NextResponse } from 'next/server';
import  dbConnect  from '@/lib/mongo';
import Test from '@/model/Test';

export async function PATCH(request: Request, { params }: { params: { testId : string } }) {
  try {
    await dbConnect();
    const { testId } = params;
    const { isPublished } = await request.json();

    const updatedTest = await Test.findByIdAndUpdate( testId, { isPublished }, { new: true });

    if (!updatedTest) {
      return NextResponse.json({ message: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Test updated successfully', test: updatedTest });
  } catch (error) {
    console.error('Error updating test:', error);
    return NextResponse.json({ message: 'Error updating test', error: error }, { status: 500 });
  }
}