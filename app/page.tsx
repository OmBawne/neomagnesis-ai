import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import WhatWeDo from '@/components/landing/WhatWeDo'
import AgenticAI from '@/components/landing/AgenticAI'
import Automation from '@/components/landing/Automation'
import ProductShowcase from '@/components/landing/ProductShowcase'
import UseCases from '@/components/landing/UseCases'
import WhyNeomagnesis from '@/components/landing/WhyNeomagnesis'
import Community from '@/components/landing/Community'
import Hiring from '@/components/landing/Hiring'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-black text-ink-ivory selection:bg-ink-ivory selection:text-ink-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <AgenticAI />
      <Automation />
      <ProductShowcase />
      <UseCases />
      <WhyNeomagnesis />
      <Community />
      <Hiring />
      <FinalCTA />
      <Footer />
    </main>
  )
}
