"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export function FallbackGenerator() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
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

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.letter) {
        // Convert HTML to plain text by creating a temporary element
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = data.letter
        setCoverLetter(tempDiv.textContent || tempDiv.innerText || "")
      } else {
        throw new Error("No cover letter content received")
      }
    } catch (error) {
      console.error("Error generating cover letter:", error)
      setCoverLetter("Failed to generate cover letter. Please try again.")
    } finally {
      setIsGenerating(false)
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
          <Button onClick={handleGenerate} disabled={isGenerating || !resume || !jobDescription} className="w-full">
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-2">
          <Label htmlFor="cover-letter">Generated Cover Letter</Label>
          <Textarea
            id="cover-letter"
            className="min-h-[400px]"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            readOnly={isGenerating}
          />
        </div>
      </Card>
    </div>
  )
}

export default FallbackGenerator
