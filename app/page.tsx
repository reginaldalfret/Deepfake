import Hero from "@/components/hero"
import UploadSection from "@/components/upload-section"
import ResultsSection from "@/components/results-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <UploadSection className="animate-fade-in" />
      <ResultsSection className="animate-fade-in" />
      <AboutSection className="animate-fade-in" />
      <Footer className="animate-fade-in" />
    </main>
  )
}
