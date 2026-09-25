import Dock from '@/components/landing/Dock'
import Hero from '@/components/landing/Hero'
import PhilosophySection from '@/components/landing/PhilosophySection'
import WhyLocalFirst from '@/components/landing/WhyLocalFirst'
import { WorkflowVision } from '@/components/landing/WorkflowVision'
import { UseCases } from '@/components/landing/UseCases'
import { RoadmapSection } from '@/components/landing/RoadmapSection'
import { EarlyAccessSection } from '@/components/landing/EarlyAccessSection'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#08090A] text-[#FAF8F5] selection:bg-[#FAF8F5] selection:text-[#08090A] overflow-x-hidden relative">
      {/* Centered Floating Dock Navigation */}
      <Dock />

      {/* 3D Agentic System Core Hero */}
      <Hero />

      {/* Architectural Philosophy */}
      <PhilosophySection />

      {/* Why Local-First & Sovereign Hardware */}
      <WhyLocalFirst />

      {/* Agentic Workflow Vision */}
      <WorkflowVision />

      {/* Applied Technical Use Cases (Zero Speculation) */}
      <UseCases />

      {/* Verified Architectural Milestones */}
      <RoadmapSection />

      {/* Priority Early Access Registration & Launch Pass */}
      <EarlyAccessSection />

      {/* Global Brand Footer */}
      <Footer />
    </main>
  )
}