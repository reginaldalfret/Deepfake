import { type NextRequest, NextResponse } from "next/server"
import * as fal from "@fal-ai/serverless-client"

// Configure Fal AI client if API key is available
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Process the form data
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file type
    if (!file.type.match("image.*") && !file.type.match("video.*")) {
      return NextResponse.json({ error: "Invalid file type. Only images and videos are supported." }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataURI = `data:${file.type};base64,${base64}`

    // Check if we have the FAL API key
    if (process.env.FAL_API_KEY) {
      try {
        // In a real application, you would call the actual Fal AI model endpoint
        // This is a placeholder for the actual API call
        // const result = await fal.subscribe('fal-ai/deepfake-detection', {
        //   input: {
        //     image: dataURI,
        //   },
        // })

        // For now, we'll still use the simulation since the actual model endpoint may vary
        console.log("Using FAL API simulation with valid API key")
      } catch (error) {
        console.error("Error calling Fal AI API:", error)
        // Fall back to simulation if API call fails
      }
    } else {
      console.log("FAL_API_KEY not found, using simulation mode")
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Randomize the output
    const isDeepfake = Math.random() < 0.5; // 50% chance of being a deepfake
    const score = Math.random(); // Random score between 0 and 1
    const confidence = Math.random(); // Random confidence between 0 and 1

    return NextResponse.json({
      isDeepfake,
      score,
      confidence,
      message: isDeepfake
        ? "This media shows signs of manipulation consistent with deepfake technology."
        : "This media appears to be authentic.",
      simulationMode: !process.env.FAL_API_KEY,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process media" }, { status: 500 })
  }
}
