"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reset password for:", email)
    // In a real app, you would send a reset password email
    setIsSubmitted(true)
    // After 3 seconds, redirect to the OTP verification page
    setTimeout(() => {
      router.push("/auth/verify")
    }, 3000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Link href="/auth/login" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to login</span>
            </Link>
            <CardTitle className="text-2xl font-bold text-center flex-1">Forgot Password</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-400">
            Enter your email address and we&apos;ll send you a code to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-sm text-gray-400">
                We&apos;ve sent a password reset code to {email}. Please check your inbox.
              </p>
              <div className="text-sm text-gray-400">Redirecting to verification page...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Reset Code
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-center w-full text-sm">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

