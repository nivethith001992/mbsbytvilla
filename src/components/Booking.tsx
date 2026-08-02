"use client";

import { FormEvent, useState } from "react";
import { bookingIntro, brand } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

type FormState = {
  name: string;
  email: string;
  arrival: string;
  departure: string;
  guests: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  arrival: "",
  departure: "",
  guests: "2",
  message: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email.";
  }

  if (form.arrival && form.departure && form.departure <= form.arrival) {
    errors.departure = "Departure should be after arrival.";
  }

  const guests = Number(form.guests);
  if (!form.guests || Number.isNaN(guests) || guests < 1 || guests > 12) {
    errors.guests = "Guests must be between 1 and 12.";
  }

  if (!form.message.trim()) {
    errors.message = "Tell us a little about your stay.";
  } else if (form.message.trim().length < 8) {
    errors.message = "A few more details help us prepare for you.";
  }

  return errors;
}

export function Booking() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (status === "sent") setStatus("idle");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(
      `Care enquiry — ${form.name.trim()} (${form.arrival || "dates TBC"})`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Arrival: ${form.arrival || "TBC"}`,
        `Departure: ${form.departure || "TBC"}`,
        `Guests: ${form.guests}`,
        "",
        "Message:",
        form.message.trim(),
      ].join("\n"),
    );

    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section id="booking" className="section-pad-lg section-atmosphere relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-16 h-96 w-96 rounded-full bg-sand-beige/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-[-6%] h-80 w-80 rounded-full bg-surface-deep/70 blur-3xl"
      />

      <div className="container-lux relative">
        <Reveal variant="clip" y={44}>
          <p className="eyebrow">{bookingIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
            <span className="block">{bookingIntro.title[0]}</span>
            <span className="mt-1 block italic text-earth-brown/90">
              {bookingIntro.title[1]}
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
            {bookingIntro.support}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5" variant="left" y={40}>
            <Stagger className="space-y-9" stagger={0.12}>
              <StaggerItem>
                <div>
                  <p className="eyebrow">Address</p>
                  <p className="mt-4 font-serif text-2xl leading-snug text-deep-charcoal md:text-3xl">
                    {brand.address.line}
                    <span className="text-soft-grey"> · </span>
                    <span className="font-sans text-base font-light tracking-normal text-soft-grey md:text-lg">
                      {brand.address.city}, {brand.address.country}
                    </span>
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="divider-lux" />
              </StaggerItem>

              <StaggerItem>
                <div>
                  <p className="eyebrow">Speak with us</p>
                  <ul className="mt-4 space-y-3">
                    {brand.phones.map((phone) => (
                      <li key={phone.number}>
                        <a
                          href={phone.href}
                          className="group flex flex-wrap items-baseline gap-x-3 gap-y-1"
                        >
                          <span className="text-sm text-soft-grey">{phone.label}</span>
                          <span className="font-serif text-xl text-deep-charcoal transition group-hover:text-earth-brown md:text-2xl">
                            {phone.number}
                          </span>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={`mailto:${brand.email}`}
                        className="inline-block font-serif text-xl text-deep-charcoal transition hover:text-earth-brown"
                      >
                        {brand.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={brand.whatsapp.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary-dark"
                  >
                    Instagram
                  </a>
                </div>
              </StaggerItem>
            </Stagger>
          </Reveal>

          <Reveal delay={0.12} variant="right" y={40} className="lg:col-span-7">
            <form onSubmit={onSubmit} className="form-shell" noValidate>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="field-label">Name</span>
                  <input
                    required
                    className={`input-lux ${errors.name ? "input-lux-error" : ""}`}
                    name="name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "error-name" : undefined}
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                  />
                  {errors.name ? (
                    <span id="error-name" className="field-error" role="alert">
                      {errors.name}
                    </span>
                  ) : null}
                </label>
                <label className="block">
                  <span className="field-label">Email</span>
                  <input
                    required
                    type="email"
                    className={`input-lux ${errors.email ? "input-lux-error" : ""}`}
                    name="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "error-email" : undefined}
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                  {errors.email ? (
                    <span id="error-email" className="field-error" role="alert">
                      {errors.email}
                    </span>
                  ) : null}
                </label>
                <label className="block">
                  <span className="field-label">Arrival</span>
                  <input
                    className="input-lux"
                    name="arrival"
                    type="date"
                    value={form.arrival}
                    onChange={(event) => update("arrival", event.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="field-label">Departure</span>
                  <input
                    className={`input-lux ${errors.departure ? "input-lux-error" : ""}`}
                    name="departure"
                    type="date"
                    min={form.arrival || undefined}
                    aria-invalid={Boolean(errors.departure)}
                    aria-describedby={errors.departure ? "error-departure" : undefined}
                    value={form.departure}
                    onChange={(event) => update("departure", event.target.value)}
                  />
                  {errors.departure ? (
                    <span id="error-departure" className="field-error" role="alert">
                      {errors.departure}
                    </span>
                  ) : null}
                </label>
                <label className="block sm:col-span-2">
                  <span className="field-label">Guests</span>
                  <input
                    className={`input-lux max-w-[12rem] ${errors.guests ? "input-lux-error" : ""}`}
                    name="guests"
                    type="number"
                    min={1}
                    max={12}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? "error-guests" : undefined}
                    value={form.guests}
                    onChange={(event) => update("guests", event.target.value)}
                  />
                  {errors.guests ? (
                    <span id="error-guests" className="field-error" role="alert">
                      {errors.guests}
                    </span>
                  ) : null}
                </label>
                <label className="block sm:col-span-2">
                  <span className="field-label">Message</span>
                  <textarea
                    required
                    className={`input-lux ${errors.message ? "input-lux-error" : ""}`}
                    name="message"
                    placeholder={bookingIntro.placeholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "error-message" : undefined}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                  />
                  {errors.message ? (
                    <span id="error-message" className="field-error" role="alert">
                      {errors.message}
                    </span>
                  ) : null}
                </label>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <button type="submit" className="btn-primary">
                  {bookingIntro.cta}
                </button>
                {status === "sent" ? (
                  <p className="text-sm text-earth-brown" role="status">
                    Opening your email client to send the enquiry…
                  </p>
                ) : (
                  <p className="max-w-xs text-sm font-light text-soft-grey">
                    {bookingIntro.formNote}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
