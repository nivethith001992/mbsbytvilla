"use client";

import { FormEvent, useState } from "react";
import { bookingIntro } from "@/lib/content";
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
    errors.message = "Tell us a little about how we can help.";
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
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.log("Enquiry received (demo):", {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setForm(initialState);
    setErrors({});
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
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal variant="clip" y={44} className="lg:sticky lg:top-28 lg:pt-2">
            <p className="eyebrow">{bookingIntro.eyebrow}</p>
            <h2 className="display-lg mt-6 text-deep-charcoal">
              <span className="block">{bookingIntro.title[0]}</span>
              <span className="mt-1 block italic text-earth-brown/90">
                {bookingIntro.title[1]}
              </span>
            </h2>
            <p className="mt-7 max-w-md text-base font-light leading-relaxed text-soft-grey md:text-lg">
              {bookingIntro.support}
            </p>
          </Reveal>

          <Reveal delay={0.12} variant="up" y={36}>
            {status === "sent" ? (
              <div className="form-shell" role="status" aria-live="polite">
                <p className="eyebrow">Thank you</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-deep-charcoal md:text-4xl">
                  Your enquiry has been received
                </h3>
                <p className="mt-5 max-w-md text-base font-light leading-relaxed text-soft-grey">
                  We appreciate you reaching out. Our team will be in touch
                  shortly — usually within one business day.
                </p>
                <button
                  type="button"
                  className="btn-primary mt-10 w-full sm:w-auto"
                  onClick={() => setStatus("idle")}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                id="booking-form"
                onSubmit={onSubmit}
                className="form-shell"
                noValidate
              >
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
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
                      aria-describedby={
                        errors.message ? "error-message" : undefined
                      }
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                    />
                    {errors.message ? (
                      <span
                        id="error-message"
                        className="field-error"
                        role="alert"
                      >
                        {errors.message}
                      </span>
                    ) : null}
                  </label>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    {bookingIntro.cta}
                  </button>
                  <p className="max-w-xs text-sm font-light text-soft-grey">
                    {bookingIntro.formNote}
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
