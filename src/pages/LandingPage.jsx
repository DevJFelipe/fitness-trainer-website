import backgroundImage from '../assets/background-image.png'
import Background from '../components/layout/Background'
import Navbar from '../components/layout/Navbar'
import Hero from './Hero'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <Background image={backgroundImage} />

      <div className="relative z-10">
        <Navbar />
        <Hero /> {/* Ahora Hero navegará a /login */}
      </div>
    </div>
  )
}
