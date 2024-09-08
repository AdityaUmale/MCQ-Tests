import { NextResponse } from "next/server";
import  dbConnect  from "@/lib/mongo";
import TestResult from "@/model/TestResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Ensure both models are registered
    await Promise.all([
      import('@/model/TestResult'),
      import('@/model/Test')
    ]);

    const results = await TestResult.find({ user: session.user.id })
      .populate("test", "testName")
      .select('testName score percentage test userName');

    const formattedResults = results.map(result => ({
      _id: result._id,
      testName: result.testName || (result.test && result.test.testName),
      score: result.score,
      percentage: result.percentage,
      testId: result.test ? result.test._id : null,
      userName: result.userName
    }));

    return NextResponse.json({ results: formattedResults });
  } catch (error) {
    console.error("Error fetching test results:", error);
    return NextResponse.json({ message: "Error fetching test results", error: error }, { status: 500 });
  }
}