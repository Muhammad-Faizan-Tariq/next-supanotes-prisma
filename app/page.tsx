import { Search } from "lucide-react"
import Link from "next/link"
import NoteCard from "@/components/note-card"
import Pagination from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Notes</h1>
          <Link href="/new">
            <Button className="bg-blue-600 hover:bg-blue-700">Create Note</Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search notes..." className="pl-10 bg-gray-900 border-gray-700 text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

        <Pagination currentPage={1} totalPages={5} />
      </div>
    </main>
  )
}

// Mock data for demonstration
const notes = [
  {
    id: "1",
    title: "Meeting Notes",
    content: "Discussed project timeline and deliverables for Q3.",
    createdAt: "2023-07-15",
    liked: true,
  },
  {
    id: "2",
    title: "Ideas for New Project",
    content: "AI-powered note taking app with voice recognition.",
    createdAt: "2023-07-10",
    liked: false,
  },
  {
    id: "3",
    title: "Shopping List",
    content: "Milk, eggs, bread, coffee, fruits.",
    createdAt: "2023-07-05",
    liked: true,
  },
  {
    id: "4",
    title: "Book Recommendations",
    content: "Atomic Habits, Deep Work, The Psychology of Money.",
    createdAt: "2023-06-28",
    liked: false,
  },
  {
    id: "5",
    title: "Workout Plan",
    content: "Monday: Chest & Triceps, Wednesday: Back & Biceps, Friday: Legs & Shoulders.",
    createdAt: "2023-06-20",
    liked: false,
  },
  {
    id: "6",
    title: "Travel Plans",
    content: "Research flights to Japan for cherry blossom season next year.",
    createdAt: "2023-06-15",
    liked: true,
  },
]

