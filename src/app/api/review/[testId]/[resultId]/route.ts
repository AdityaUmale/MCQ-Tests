import { NextResponse } from "next/server";
import  dbConnect  from "@/lib/mongo";
import TestResult from "@/model/TestResult";
import Test from "@/model/Test";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: { testId: string; resultId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { testId, resultId } = params;

    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    const result = await TestResult.findOne({
      _id: resultId,
      user: session.user.id,
      test: testId
    });

    if (!result) {
      return NextResponse.json({ error: 'Test result not found' }, { status: 404 });
    }

    const userAnswers = result.answers.reduce((acc : any, answer : any) => {
      acc[answer.question.toString()] = answer.selectedAnswer;
      return acc;
    }, {});

    const reviewData = {
      testName: test.testName,
      questions: test.questions,
      userAnswers
    };

    return NextResponse.json(reviewData);
  } catch (error) {
    console.error("Error fetching review data:", error);
    return NextResponse.json({ message: "Error fetching review data", error: error }, { status: 500 });
  }
}