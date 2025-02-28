"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast();
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image or video
    if (!file.type.match("image.*") && !file.type.match("video.*")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image or video file.",
        variant: "destructive",
      })
      return
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setFile(file)
  }

  const handleSubmit = async (analyzeAsDeepfake: boolean) => {
    if (!file) return

    setIsUploading(true)

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      let score: number;
      let confidence: number;
      let isDeepfake: boolean;

      if (analyzeAsDeepfake) {
        // Simulate deepfake result
        isDeepfake = true;
        score = 0.85 + Math.random() * 0.15;
        confidence = 0.9 + Math.random() * 0.1;
      } else {
        // Simulate authentic result
        isDeepfake = false;
        score = Math.random() * 0.2;
        confidence = 0.7 + Math.random() * 0.3;
      }

      const result = {
        isDeepfake,
        score,
        confidence,
        message: isDeepfake
          ? "This media shows signs of manipulation consistent with deepfake technology."
          : "This media appears to be authentic.",
        simulationMode: true,
      };

      // Store result in localStorage to display in results section
      localStorage.setItem(
        "detectionResult",
        JSON.stringify({
          filename: file.name,
          result: result,
          timestamp: new Date().toISOString(),
        }),
      )

      // Scroll to results section
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })

      // Force refresh to update results component
      router.refresh()

      toast({
        title: "Analysis complete",
        description: "Your media has been analyzed successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to analyze media. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section id="upload" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Upload Media for Analysis</h2>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-medium">{file ? file.name : "Drag and drop your file here"}</p>
                  <p className="text-sm text-muted-foreground">
                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Supports images and videos up to 10MB"}
                  </p>
                </div>

                <div className="flex items-center gap-[1px]">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isUploading}
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    Select File
                  </Button>

                  {file && (
                    <>
                      <Button onClick={() => handleSubmit(false)} disabled={isUploading}>
                        Analyze
                      </Button>
                      <Button onClick={() => handleSubmit(true)} disabled={isUploading}>
                        Now
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleChange}
                disabled={isUploading}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
