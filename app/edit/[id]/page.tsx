"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PageProps {
  params: {
    id: string
  }
}

export default function EditNotePage({ params }: PageProps) {
  const router = useRouter()

  // In a real app, you would fetch the note from your database
  const noteData = notes.find((note) => note.id === params.id) || {
    id: params.id,
    title: "",
    content: "",
    createdAt: new Date().toISOString().split("T")[0],
    liked: false,
  }

  const [title, setTitle] = useState(noteData.title)
  const [content, setContent] = useState(noteData.content)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would update the note in your database
    console.log("Saving note:", {
      id: params.id,
      title,
      content,
    })

    // Navigate back to the note page
    router.push(`/${params.id}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href={`/${params.id}`}>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="text-xl font-bold bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div className="mb-6">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[300px] bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </Button>
          </div>
        </form>
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

