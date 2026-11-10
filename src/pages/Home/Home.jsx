import usePageTitle from '../../hooks/usePageTitle';
import Hero from './sections/Hero';
import ProblemSection from './sections/ProblemSection';
import StreetDemo from './sections/StreetDemo';
import HowItWorks from './sections/HowItWorks';
import OdsSection from './sections/OdsSection';
import FinalCta from './sections/FinalCta';

export default function Home() {
  usePageTitle(null);

  return (
    <>
      <Hero />
      <ProblemSection />
      <StreetDemo />
      <HowItWorks />
      <OdsSection />
      <FinalCta />
    </>
  );
}
