import { Shield, Zap, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Understanding Deepfakes</h2>
          <p className="text-lg text-muted-foreground">
            Deepfakes use artificial intelligence to create convincing fake videos, images, or audio that can be nearly
            indistinguishable from authentic media. Our detection technology helps you identify these sophisticated
            manipulations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>What Are Deepfakes?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial
                intelligence. They can manipulate faces, voices, and actions to create realistic but fabricated content
                that never actually occurred.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>How Our Detection Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our system uses advanced AI algorithms to analyze visual inconsistencies, unnatural facial movements,
                and digital artifacts that are typically present in deepfakes but invisible to the human eye. We examine
                patterns that reveal manipulation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <AlertTriangle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Why It Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                As deepfake technology becomes more accessible and sophisticated, the potential for misuse grows.
                Deepfakes can spread misinformation, damage reputations, and undermine trust in authentic media.
                Detection tools are essential for digital literacy.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-background rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Detection Process</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Media Analysis</h4>
                <p className="text-muted-foreground">
                  Our AI examines the uploaded media frame by frame, analyzing visual patterns, compression artifacts,
                  and facial inconsistencies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Feature Extraction</h4>
                <p className="text-muted-foreground">
                  The system extracts key features that differentiate authentic media from manipulated content, focusing
                  on details humans might miss.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">AI Classification</h4>
                <p className="text-muted-foreground">
                  Our trained neural network classifies the content based on thousands of examples of both authentic and
                  deepfake media it has learned from.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Confidence Scoring</h4>
                <p className="text-muted-foreground">
                  The system provides a confidence score indicating how certain it is about its classification, helping
                  you make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
