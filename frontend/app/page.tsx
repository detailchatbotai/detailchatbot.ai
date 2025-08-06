import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { HowItWorks } from '../components/HowItWorks'
import { Testimonials } from '../components/Testimonials'
import { Footer } from '../components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section id="features">
        <Features />
      </section>
      <HowItWorks />
      <section id="testimonials">
        <Testimonials />
      </section>
      <Footer />
    </main>
  )
}