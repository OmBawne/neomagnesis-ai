import Dock from '@/components/landing/Dock'
import Hero from '@/components/landing/Hero'
import PhilosophySection from '@/components/landing/PhilosophySection'
import WhyLocalFirst from '@/components/landing/WhyLocalFirst'
import { WorkflowVision } from '@/components/landing/WorkflowVision'
import { UseCases } from '@/components/landing/UseCases'
import { PricingSection } from '@/components/landing/PricingSection'
import { RoadmapSection } from '@/components/landing/RoadmapSection'
import { EarlyAccessSection } from '@/components/landing/EarlyAccessSection'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080909] text-[#F1EFE8] selection:bg-[#F1EFE8] selection:text-[#080909] overflow-x-hidden relative">
      {/* Floating macOS-inspired Dock navigation */}
      <Dock />

      {/* 3D Living Core Hero */}
      <Hero />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Why Local-First (Blueprint SVG Diagrams) */}
      <WhyLocalFirst />

      {/* Workflow Vision (Abstract Node Graphs) */}
      <WorkflowVision />

      {/* Applied Use Cases (Zero Fake Metrics) */}
      <UseCases />

      {/* Access & Membership (Honest Early Access Program) */}
      <PricingSection />

      {/* Public Architectural Roadmap (Dateless Milestones) */}
      <RoadmapSection />

      {/* Priority Early Access Registration (Launch Pass) */}
      <EarlyAccessSection />

      {/* Global Footer */}
      <Footer />
    </main>
  )
}
