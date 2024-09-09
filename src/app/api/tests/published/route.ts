import { NextResponse } from 'next/server';
import  dbConnect  from '@/lib/mongo';
import Test from '@/model/Test';

export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    const tests = await Test.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    
    // Create a new response with the data
    const response = NextResponse.json({ tests });
    
    // Set headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    
    return response;
  } catch (error: any) {
    console.error('Error fetching published tests:', error);
    return NextResponse.json({ message: 'Error fetching published tests', error: error.message }, { status: 500 });
  }
}