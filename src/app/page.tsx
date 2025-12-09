import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import AboutGDG from '@/components/AboutGDG/AboutGDG'
import Timeline from '@/components/Timeline/Timeline'
import OtherEvents from '@/components/OtherEvents/OtherEvents'
import PrizePool from '@/components/PrizePool/PrizePool'
import Rules from '@/components/Rules/Rules'
import Tracks from '@/components/Tracks/Tracks'
import Footer from '@/components/Footer/Footer'
import TeamMembers from '@/components/Team/Team'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <AboutGDG />
      <Timeline />
      <OtherEvents />
      <PrizePool />
      <Tracks />
      <Rules />
      <TeamMembers />
      <Footer />
    </main>
  )
}
