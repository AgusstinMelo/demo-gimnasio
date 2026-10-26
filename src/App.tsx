import { LazyMotion, MotionConfig } from "motion/react";
import { Cursor } from "./components/motion";
import { useLenis } from "./hooks/motion";
import { Contact, Faq, FinalCta, Footer } from "./sections/Closing";
import { Facilities } from "./sections/Facilities";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Services, ServicesMarquee, Stats } from "./sections/Highlights";
import { Plans } from "./sections/Plans";
import { Schedule } from "./sections/Schedule";
import { Testimonials } from "./sections/Testimonials";
import { WhatsAppFloat } from "./sections/WhatsAppFloat";

const loadFeatures = () => import("./lib/motionFeatures").then((r) => r.default);

export default function App() {
  useLenis();
  return (
    // reducedMotion="user": Motion respeta prefers-reduced-motion en todas las animaciones
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
          Saltar al contenido
        </a>
        <Header />
        <main id="main">
          <Hero />
          <ServicesMarquee />
          <Stats />
          <Services />
          <Facilities />
          <Plans />
          <Schedule />
          <Testimonials />
          <Faq />
          <FinalCta />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
        <Cursor />
      </LazyMotion>
    </MotionConfig>
  );
}
