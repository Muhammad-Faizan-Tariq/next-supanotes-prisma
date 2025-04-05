"use client"

import { useState } from "react"
import { Heart, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  liked: boolean
}

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const [liked, setLiked] = useState(note.liked)

  const toggleLike = () => {
    setLiked(!liked)
    // In a real app, you would update this in your database
  }

  const handleDelete = () => {
    // In a real app, you would delete the note from your database
    console.log("Deleting note:", note.id)
  }

  return (
    <Card className="bg-gray-900 border-gray-800 text-white overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
            <Link href={`/edit/${note.id}`}>
              <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer text-red-500">Delete</DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 text-white border-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This action cannot be undone. This will permanently delete your note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-gray-300 line-clamp-3">{note.content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xs text-gray-400">{note.createdAt}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleLike}>
          <Heart className={`h-5 w-5 ${liked ? "fill-blue-500 text-blue-500" : "text-gray-400"}`} />
          <span className="sr-only">Like</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

