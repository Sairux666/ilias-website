import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Services } from '@/components/sections/Services'
import { TechStack } from '@/components/sections/TechStack'

export default function Home() {
  return (
    <main className="bg-neutral-100">
      <Hero />
      <About />
      <SelectedWork />
      <Services />
      <TechStack />
    </main>
  )
}
