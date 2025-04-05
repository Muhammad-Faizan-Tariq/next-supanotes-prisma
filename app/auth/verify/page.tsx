"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyOTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Clear error when user starts typing again
    if (error) setError("")
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const otpValue = otp.join("")

    // Check if OTP is complete
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsVerifying(true)
    console.log("Verifying OTP:", otpValue)

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)

      // In a real app, you would verify the OTP with your API
      // For demo purposes, let's assume 123456 is the correct OTP
      if (otpValue === "123456") {
        router.push("/")
      } else {
        setError("Invalid verification code. Please try again.")
      }
    }, 1500)
  }

  const handleResend = () => {
    console.log("Resending OTP")
    // In a real app, you would call your API to resend the OTP
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
            <CardTitle className="text-2xl font-bold text-center flex-1">Verification</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-400">
            Enter the 6-digit code sent to your email or phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-bold rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              ))}
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            Didn&apos;t receive a code?{" "}
            <button onClick={handleResend} className="text-blue-400 hover:text-blue-300">
              Resend
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

