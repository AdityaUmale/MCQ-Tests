import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import TestResult from "@/model/TestResult";
import Test from "@/model/Test";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const testId = params.testId;

    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    const leaderboard = await TestResult.find({ test: testId })
      .sort({ score: -1, percentage: -1 })
      .select('userName score percentage')
      .limit(100);  // Limit to top 100 results

    return NextResponse.json({ leaderboard, testName: test.testName });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json({ message: "Error fetching leaderboard data", error: error }, { status: 500 });
  }
}