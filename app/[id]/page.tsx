import { ArrowLeft, Heart, Pencil } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    id: string
  }
}

export default function NotePage({ params }: PageProps) {
  // In a real app, you would fetch the note from your database
  const note = notes.find((note) => note.id === params.id) || {
    id: params.id,
    title: "Note not found",
    content: "This note does not exist.",
    createdAt: "",
    liked: false,
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Heart className={`h-5 w-5 ${note.liked ? "fill-blue-500 text-blue-500" : ""}`} />
              <span className="sr-only">Like</span>
            </Button>
            <Link href={`/edit/${note.id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
          <div className="text-sm text-gray-400 mb-6">{note.createdAt}</div>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

// Mock data for demonstration
const notes = [
  {
    id: "1",
    title: "Meeting Notes",
    content:
      "Discussed project timeline and deliverables for Q3.\n\nKey points:\n- Launch new feature by August\n- Hire two more developers\n- Review budget allocation\n\nAction items:\n1. Sarah to prepare project roadmap\n2. John to finalize hiring requirements\n3. Follow up meeting next Tuesday",
    createdAt: "2023-07-15",
    liked: true,
  },
  {
    id: "2",
    title: "Ideas for New Project",
    content:
      "AI-powered note taking app with voice recognition.\n\nFeatures to consider:\n- Real-time transcription\n- Automatic categorization\n- Smart search\n- Cross-platform sync\n\nTechnologies:\n- OpenAI for processing\n- React Native for mobile\n- Firebase for backend",
    createdAt: "2023-07-10",
    liked: false,
  },
]

