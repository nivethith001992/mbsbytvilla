import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Life } from "@/components/Life";
import { Location } from "@/components/Location";
import { Navbar } from "@/components/Navbar";
import { OrganicSeparator } from "@/components/OrganicSeparator";
import { Retreat } from "@/components/Retreat";
import { SiteChrome } from "@/components/SiteChrome";
import { Story } from "@/components/Story";
import { VillaShowcase } from "@/components/VillaShowcase";

export default function Home() {
  return (
    <>
      <SiteChrome />
      <Navbar />
      <main>
        <Hero />
        <OrganicSeparator from="transparent" to="var(--warm-white)" variant="soft" />
        <Story />
        <OrganicSeparator from="var(--warm-white)" to="var(--warm-white)" variant="soft" />
        <VillaShowcase />
        <OrganicSeparator from="var(--warm-white)" to="var(--deep-charcoal)" variant="deep" />
        <Retreat />
        <OrganicSeparator from="var(--deep-charcoal)" to="var(--warm-white)" variant="wave" />
        <Life />
        <Journey />
        <OrganicSeparator from="var(--surface)" to="var(--warm-white)" variant="soft" />
        <Gallery />
        <Location />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
