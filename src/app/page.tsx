import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardList, BarChart, Trophy, Search } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">MCQ Tests</span>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">MCQ Tests</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-500 transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-500 transition-colors" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-blue-500 transition-colors" href="#">
            Contact
          </Link>
        </nav>
      </header>
     
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  COETA's Inhouse MCQ Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Empower your learning with our comprehensive Multiple Choice Question platform. Test your knowledge, track your progress, and excel in your studies.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center group">
                <div className="mb-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out group-hover:scale-110">
                  <ClipboardList className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Give Tests</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Take a wide variety of MCQ tests to challenge your knowledge</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="mb-4 p-4 bg-teal-50 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out group-hover:scale-110">
                  <BarChart className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Track Results</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monitor your performance and see your progress over time</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="mb-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out group-hover:scale-110">
                  <Trophy className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Rankings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Compare your scores with peers and climb the leaderboard</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="mb-4 p-4 bg-teal-50 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out group-hover:scale-110">
                  <Search className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Review Tests</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyze your answers and learn from your mistakes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          College of Engineering and Technology, Akola
        </p>
      </footer>
    </div>
  )
}