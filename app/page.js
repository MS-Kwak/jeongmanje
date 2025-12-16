import Marquee from '@/components/Marquee';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Benefits from '@/components/Benefits';
import Success from '@/components/Success';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Marquee />
      <Header />
      <Hero />
      <About />
      <Benefits />
      <Success />
      <Contact />
      <Footer />
    </main>
  );
}
