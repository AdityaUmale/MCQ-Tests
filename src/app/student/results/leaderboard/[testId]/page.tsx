"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSession } from "next-auth/react";

interface LeaderboardEntry {
  _id: string;
  userName: string;
  score: number;
  percentage: number;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [testName, setTestName] = useState("");
  const params = useParams();
  const testId = params.testId as string;
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || session?.user?.role !== "Student") {
      router.push("/login");
    } else {
      fetchLeaderboardData();
    }
  }, [status, session, router]);

  // useEffect(() => {
  //   fetchLeaderboardData();
  // }, [testId]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`/api/leaderboard/${testId}`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboardData(data.leaderboard);
        setTestName(data.testName);
      } else {
        throw new Error("Failed to fetch leaderboard data");
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      alert("Failed to fetch leaderboard data. Please try again.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "Student") {
    return null; // or a custom unauthorized message
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{testName} Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry, index) => (
              <TableRow key={entry._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{entry.userName}</TableCell>
                <TableCell className="text-right">{entry.score}</TableCell>
                <TableCell className="text-right">{entry.percentage.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}