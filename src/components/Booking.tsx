"use client";

import { FormEvent, useState } from "react";
import { bookingIntro, brand } from "@/lib/content";
import { Reveal } from "./Reveal";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
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

  if (!form.message.trim()) {
    errors.message = "Tell us a little about the care you need.";
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
      `Care enquiry — ${form.name.trim()}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
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
        <div className="mx-auto max-w-2xl">
          <Reveal variant="clip" y={44}>
            <p className="eyebrow">{bookingIntro.eyebrow}</p>
            <h2 className="display-lg mt-6 text-deep-charcoal">
              <span className="block">{bookingIntro.title[0]}</span>
              <span className="mt-1 block italic text-earth-brown/90">
                {bookingIntro.title[1]}
              </span>
            </h2>
            <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
              {bookingIntro.support}
            </p>
          </Reveal>

          <Reveal delay={0.12} variant="up" y={36} className="mt-12 md:mt-14">
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
                <label className="block sm:col-span-2">
                  <span className="field-label">Message</span>
                  <textarea
                    required
                    rows={6}
                    className={`input-lux min-h-[10rem] ${errors.message ? "input-lux-error" : ""}`}
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
