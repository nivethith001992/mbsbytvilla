"use client";

import { motion, useReducedMotion } from "framer-motion";
import { brand, navLinks } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ScrollTo } from "./ScrollTo";

const footerLinks = [
  ...navLinks.filter((link) =>
    ["about", "retreat", "villas", "gallery", "location"].includes(link.id),
  ),
  { label: "Enquire", id: "booking" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-deep-charcoal text-warm-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, rgba(220,203,184,0.14), transparent 42%), radial-gradient(ellipse at 88% 100%, rgba(138,106,74,0.18), transparent 38%)",
        }}
      />
      <div className="grain opacity-[0.035]" />

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-sand-beige/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : null}

      <div className="container-lux relative py-16 md:py-20 lg:py-24">
        <Reveal variant="blur" y={40}>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 md:rounded-[2.25rem] md:p-12 lg:p-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-xl">
                <p className="font-serif text-[clamp(2.4rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.02em] text-warm-white">
                  {brand.name}
                </p>
                <p className="mt-5 font-serif text-xl italic leading-snug text-sand-beige/90 md:text-2xl">
                  “{brand.tagline}”
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ScrollTo
                  to="booking"
                  className="btn-primary !min-h-12 !rounded-[1.05rem] !border-warm-white !bg-warm-white !px-6 !text-deep-charcoal"
                >
                  Enquire About Care
                </ScrollTo>
                <a
                  href={brand.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary !min-h-12 !rounded-[1.05rem] !px-6"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 md:mt-14 md:grid-cols-12 md:gap-8 md:pt-12">
              <nav className="md:col-span-3" aria-label="Footer">
                <p className="text-[0.64rem] uppercase tracking-[0.28em] text-sand-beige/85">
                  Explore
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 md:flex-col md:gap-3">
                  {footerLinks.map((link) => (
                    <li key={link.id}>
                      <ScrollTo
                        to={link.id}
                        className="text-[0.95rem] font-light text-warm-white/68 transition hover:text-warm-white"
                      >
                        {link.label}
                      </ScrollTo>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="md:col-span-5">
                <p className="text-[0.64rem] uppercase tracking-[0.28em] text-sand-beige/85">
                  Contact
                </p>
                <div className="mt-5 space-y-4 text-[0.95rem] font-light leading-relaxed text-warm-white/68">
                  <div className="max-w-sm">
                    <p className="text-warm-white/80">{brand.legalName}</p>
                    <p className="mt-2">
                      {brand.address.line}
                      <br />
                      {brand.address.city}, {brand.address.country}
                    </p>
                  </div>
                  <a
                    href={`mailto:${brand.email}`}
                    className="block transition hover:text-warm-white"
                  >
                    {brand.email}
                  </a>
                  <div className="space-y-2">
                    {brand.phones.map((phone) => (
                      <a
                        key={phone.number}
                        href={phone.href}
                        className="block transition hover:text-warm-white"
                      >
                        <span className="text-warm-white/45">{phone.label}</span>
                        <span className="mt-0.5 block text-warm-white/80">
                          {phone.number}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-4">
                <p className="text-[0.64rem] uppercase tracking-[0.28em] text-sand-beige/85">
                  Connect
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-warm-white/65 transition hover:border-sand-beige/50 hover:bg-white/[0.04] hover:text-warm-white"
                  >
                    Instagram
                  </a>
                  <a
                    href={brand.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-warm-white/65 transition hover:border-sand-beige/50 hover:bg-white/[0.04] hover:text-warm-white"
                  >
                    Facebook
                  </a>
                  <a
                    href={brand.social.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-warm-white/65 transition hover:border-sand-beige/50 hover:bg-white/[0.04] hover:text-warm-white"
                  >
                    Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-8 max-w-2xl px-1 text-[0.72rem] font-light leading-relaxed text-warm-white/32">
          {brand.numerologyNote}
        </p>

        <div className="mt-6 flex flex-col gap-2 px-1 text-[0.7rem] text-warm-white/38 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p suppressHydrationWarning>
            © {year} {brand.legalName}
          </p>
          <p className="sm:text-right">{brand.address.full}</p>
        </div>
      </div>
    </footer>
  );
}
