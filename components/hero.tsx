import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/ai-background.jpg')",
          filter: "brightness(0.4) blur(5px)", // Added blur effect
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 z-1 animate-pulse">
        <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full opacity-20" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/4 right-0 w-3 h-3 bg-white rounded-full opacity-30" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/2 left-1/3 w-1 h-1 bg-white rounded-full opacity-40" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-white rounded-full opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Detect Deepfakes with Confidence</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Our advanced AI technology helps you identify manipulated media with high accuracy. Protect yourself from
          misinformation in the digital age.
        </p>
        <Button size="lg" className="text-lg px-8 py-6" asChild>
          <Link href="#upload">Upload Now</Link>
        </Button>
      </div>
    </section>
  )
}
