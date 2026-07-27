'use client'

import { useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2 text-red-600">حدث خطأ</h1>
        <p className="text-gray-400 mb-8">نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.</p>
        
        <div className="flex flex-col gap-4">
          <Button 
            onClick={reset}
            size="lg" 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg"
          >
            إعادة المحاولة
          </Button>
          
          <Link href="/">
            <Button size="lg" className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 px-8 text-lg">
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 