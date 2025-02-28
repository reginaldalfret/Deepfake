"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

type DetectionResult = {
  filename: string
  result: {
    score: number
    isDeepfake: boolean
    confidence: number
    analysisType: string
  }
  timestamp: string
}

export default function ResultsSection() {
  const [result, setResult] = useState<DetectionResult | null>(null)

  useEffect(() => {
    // Get result from localStorage
    const storedResult = localStorage.getItem("detectionResult")
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    }
  }, [])

  if (!result) {
    return (
      <section id="results" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Detection Results</h2>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <Clock className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Analysis Results Yet</h3>
              <p className="text-muted-foreground">Upload a file above to see deepfake detection results here.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const { filename, result: detectionResult, timestamp } = result
  const { score, isDeepfake, confidence, analysisType } = detectionResult

  // Format the timestamp
  const formattedDate = new Date(timestamp).toLocaleString()

  let scoreMessage = "";
  let confidenceMessage = "";

  if (analysisType === "deepfake") {
    scoreMessage = "Deepfake score is more than 70%";
    confidenceMessage = "Confidence level is below 8%";
  } else {
    scoreMessage = "Deepfake score is below 8%";
    confidenceMessage = "Confidence level is more than 70%";
  }

  return (
    <section id="results" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Detection Results</h2>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Analysis Report</span>
              <span className="text-sm font-normal text-muted-foreground">{formattedDate}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Filename</p>
              <p className="text-muted-foreground truncate">{filename}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDeepfake ? (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <h3 className="font-semibold text-lg">{isDeepfake ? "Likely Deepfake" : "Likely Authentic"}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDeepfake ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-500"
                  }`}
                >
                  {isDeepfake ? "DEEPFAKE" : "AUTHENTIC"}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Deepfake Score</span>
                  <span className="font-medium">{Math.round(score * 100)}%</span>
                </div>
                <Progress value={score * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {scoreMessage}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Confidence Level</span>
                  <span className="font-medium">{Math.round(confidence * 100)}%</span>
                </div>
                <Progress value={confidence * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {confidenceMessage}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-1">Important Note</p>
              <p className="text-muted-foreground">
                This analysis is based on AI detection and should be used as a guide only. No detection system is 100%
                accurate. Always verify content through multiple sources.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
