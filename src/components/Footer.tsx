"use client";

import { brand, navLinks } from "@/lib/content";
import { ScrollTo } from "./ScrollTo";

const footerLinks = [
  ...navLinks,
  { label: "Enquire", id: "booking" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep-charcoal text-warm-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 12% 0%, rgba(220,203,184,0.1), transparent 45%), radial-gradient(ellipse at 90% 100%, rgba(138,106,74,0.12), transparent 40%)",
        }}
      />

      <div className="container-lux relative py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <ScrollTo
              to="top"
              className="font-serif text-[1.85rem] leading-none tracking-[-0.02em] text-warm-white transition hover:text-sand-beige md:text-[2.1rem]"
            >
              {brand.name}
            </ScrollTo>
            <p className="mt-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-beige/80">
              by T-Villa
            </p>
            <p className="mt-4 max-w-xs font-serif text-[1.05rem] italic leading-snug text-warm-white/55">
              {brand.tagline}
            </p>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.26em] text-sand-beige/85">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <ScrollTo
                    to={link.id}
                    className="text-[0.92rem] font-light text-warm-white/65 transition hover:text-warm-white"
                  >
                    {link.label}
                  </ScrollTo>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.26em] text-sand-beige/85">
              Address
            </p>
            <p className="mt-4 text-[0.92rem] font-light leading-relaxed text-warm-white/65">
              {brand.address.line}
              <span className="text-warm-white/35"> · </span>
              {brand.address.city}, {brand.address.country}
            </p>

            <p className="mt-7 text-[0.64rem] font-medium uppercase tracking-[0.26em] text-sand-beige/85">
              Speak with us
            </p>
            <ul className="mt-3 space-y-2">
              {brand.phones.map((phone) => (
                <li key={phone.number}>
                  <a
                    href={phone.href}
                    className="group flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 transition"
                  >
                    <span className="text-[0.88rem] font-light text-warm-white/45 group-hover:text-warm-white/70">
                      {phone.label}
                    </span>
                    <span className="text-[0.95rem] font-light text-warm-white/80 group-hover:text-warm-white">
                      {phone.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${brand.email}`}
              className="mt-5 inline-block text-[0.95rem] font-light text-warm-white/70 transition hover:text-warm-white"
            >
              {brand.email}
            </a>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.26em] text-sand-beige/85">
              Connect
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={brand.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.92rem] font-light text-warm-white/65 transition hover:text-warm-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.92rem] font-light text-warm-white/65 transition hover:text-warm-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.72rem] font-light text-warm-white/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p suppressHydrationWarning>
            © {year} {brand.legalName}
          </p>
          <p className="sm:text-right">Dambulla, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
