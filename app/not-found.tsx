import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2 text-red-600">404</h1>
        <p className="text-gray-400 mb-8">الصفحة غير موجودة</p>
        
        <Link href="/">
          <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg">
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  )
} 