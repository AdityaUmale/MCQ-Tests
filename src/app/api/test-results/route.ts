import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import TestResult from "@/model/TestResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { use } from "react";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    
  
    const results = await TestResult.find({ user: session.user.id })
      .populate("test", "testName") // Populate testName from the Test model
      .populate("user", "username"); // Optionally, populate username
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error fetching test results:", error);
    return NextResponse.json({ message: "Error fetching test results", error }, { status: 500 });
  }
}
