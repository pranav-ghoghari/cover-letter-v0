import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Sparkles, Clock, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Cover Letter Generator</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="text-sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm backdrop-blur">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm font-medium">AI-Powered Cover Letters</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Land your dream job with perfect cover letters
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                Create tailored, professional cover letters in seconds with our AI-powered generator. Stand out from the
                competition and increase your chances of getting hired.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="/signup">
                  <Button size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative rounded-lg border bg-background p-4 shadow-lg">
                <div className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-24 rounded-md bg-primary/10"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded-md bg-muted"></div>
                    <div className="h-4 w-[90%] rounded-md bg-muted"></div>
                    <div className="h-4 w-[80%] rounded-md bg-muted"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-lg border bg-background p-4 shadow-lg w-[80%]">
                <div className="space-y-2">
                  <div className="h-4 w-[90%] rounded-md bg-muted"></div>
                  <div className="h-4 w-[70%] rounded-md bg-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] opacity-5 bg-repeat"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose Our Cover Letter Generator?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI-powered tool helps you create professional, tailored cover letters that get you noticed by
              employers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your resume and the job description to create a personalized cover letter that
                highlights your relevant skills and experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Time-Saving</h3>
              <p className="text-muted-foreground">
                Generate a professional cover letter in seconds, not hours. Focus on preparing for your interview
                instead of struggling with what to write.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Results</h3>
              <p className="text-muted-foreground">
                Get a polished, error-free cover letter that follows best practices and can be downloaded as a PDF ready
                for submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create your perfect cover letter in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="h-40 w-40 rounded-full bg-background border flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Upload Resume"
                  width={160}
                  height={160}
                  className="rounded-full p-8"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
              <p className="text-muted-foreground">Paste your resume and the job description you're applying for.</p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="h-40 w-40 rounded-full bg-background border flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="AI Generation"
                  width={160}
                  height={160}
                  className="rounded-full p-8"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Generates Your Letter</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your information and creates a tailored cover letter.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="h-40 w-40 rounded-full bg-background border flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Download PDF"
                  width={160}
                  height={160}
                  className="rounded-full p-8"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Download & Apply</h3>
              <p className="text-muted-foreground">
                Edit if needed, download as PDF, and submit with your job application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed interviews with our cover letters
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I was struggling to write a cover letter that stood out. This tool helped me create a professional
                letter in minutes, and I got called for an interview the next day!"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">JS</span>
                </div>
                <div>
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Marketing Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The cover letter generator saved me hours of work. It created a personalized letter that highlighted my
                relevant experience perfectly. Highly recommend!"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-lg border bg-card shadow-sm md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">RJ</span>
                </div>
                <div>
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">Financial Analyst</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As someone who struggles with writing, this tool was a game-changer. The cover letter it generated was
                professional and tailored to the job I was applying for."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Land Your Dream Job?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully used our cover letter generator to get noticed by
              employers and land interviews.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-base">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4">Cover Letter Generator</h3>
              <p className="text-muted-foreground">
                AI-powered cover letter generation to help you land your dream job.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Cover Letter Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
