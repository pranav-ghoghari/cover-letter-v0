import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { SignUpForm } from "./signup-form"

export default async function SignUpPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Signup form */}
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-primary">Cover Letter Generator</h1>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
              <p className="text-muted-foreground">Enter your details to create your account</p>
            </div>

            <SignUpForm />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image and info */}
      <div className="hidden md:flex relative bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <div className="max-w-md space-y-6">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-xl mb-4">
              <Image src="/placeholder.svg" alt="Cover Letter Generator" width={80} height={80} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Start Your Job Search Journey</h3>
            <p className="text-gray-700">
              Create an account today and get access to our powerful cover letter generator tool.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-medium text-gray-800">Time-Saving</h4>
                <p className="text-sm text-gray-700">Generate cover letters in minutes, not hours</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-medium text-gray-800">Customizable</h4>
                <p className="text-sm text-gray-700">Edit and refine to match your style</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
