"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { SparklesCore } from "@/components/ui/sparkles";
import IconCloud from "@/components/magicui/icon-cloud";
import Link from "next/link"; // Import for navigation
import { ArrowRight } from "lucide-react";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export default function BackgroundBoxesDemo() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col justify-between p-4 md:pl-10">
      {/* Transparent Navbar */}
      <nav className="absolute top-0 left-0 mt-5 w-full z-30 flex items-center justify-between p-4 md:px-10 text-white bg-transparent">
        {/* Left side: MCQ Tests Link */}
        <Link href="/mcq-tests" className="text-2xl font-extrabold">
          MCQ Tests
        </Link>
        {/* Right side: Sign In and Sign Up */}
        <div className="space-x-4 flex">
          <Link href="/login" className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-black transition-all duration-300 bg-white rounded-full hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            <span>Sign in</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/register" className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-black transition-all duration-300 bg-white rounded-full hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            <span>Sign Up</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full justify-between items-center space-y-6 md:space-y-0 md:space-x-6 mt-28">
        {/* Adjusted to ensure content doesn't overlap navbar */}

        {/* Text Section */}
        <div className="flex flex-col w-full md:w-1/2">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Welcome to COETAs Inhouse MCQ Platform
            </span>
          </h1>
          <div className="w-full md:w-[30rem] h-32 relative mt-2">
            {/* Gradients */}
            <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.8}
              maxSize={1.5}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
        </div>

        {/* Icon Cloud Section */}
        <div className="relative flex h-full w-full md:w-1/2 max-w-full md:max-w-[32rem] items-center justify-center overflow-hidden px-4 md:px-10 pb-10 pt-4">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-white text-center py-4 mt-auto">
        <p className="text-md">
          College of Engineering and Technology, Akola
        </p>
      </footer>
    </div>
  );
}
