"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RichTextEditor } from "./rich-text-editor"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function CoverLetterGenerator() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [coverLetter, setCoverLetter] = useState("<p></p>") // Initialize with valid HTML
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!resume || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please provide both your resume and the job description.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setCoverLetter("<p>Generating your cover letter...</p>")
    setProgress(0)

    // Start progress simulation for the expected ~1m16s delay
    const totalTime = 760000 // 1m16s in milliseconds
    const interval = 1000 // Update every second
    const steps = totalTime / interval
    let currentStep = 0
    let progressInterval: NodeJS.Timeout | null = null

    try {
      progressInterval = setInterval(() => {
        currentStep++
        // Calculate progress percentage, capping at 95% until we get the actual response
        const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 95)
        setProgress(newProgress)
      }, interval)

      // Use our proxy API route instead of calling the external API directly
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_description: jobDescription,
          resume: resume,
        }),
      })

      if (progressInterval) {
        clearInterval(progressInterval)
      }
      setProgress(100)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.letter) {
        // Ensure the letter is valid HTML
        setCoverLetter(data.letter || "<p>No content received</p>")
        toast({
          title: "Success!",
          description: "Your cover letter has been generated.",
        })
      } else {
        throw new Error("No cover letter content received")
      }
    } catch (error) {
      console.error("Error generating cover letter:", error)
      setCoverLetter("<p>Failed to generate cover letter. Please try again.</p>")
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      })
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
      setIsGenerating(false)
      setProgress(0)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Textarea
              id="resume"
              placeholder="Paste your resume here..."
              className="min-h-[200px]"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating cover letter...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                This may take about a minute. Please wait while we craft your personalized cover letter.
              </p>
            </div>
          )}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !resume || !jobDescription}
            className="w-full"
            type="button"
          >
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <RichTextEditor content={coverLetter} onChange={setCoverLetter} />
      </Card>
    </div>
  )
}
