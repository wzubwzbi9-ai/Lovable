import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Aarogyam Family Clinic — Concept Demo | Clinic Website Example",
      },
      {
        name: "description",
        content:
          "A concept demo of a modern clinic website for a fictional family clinic in Hyderabad. Explore clear clinic information, services, and an easy appointment request flow. Concept demo by Akshay Chandra.",
      },
      {
        property: "og:title",
        content: "Aarogyam Family Clinic — Concept Demo",
      },
      {
        property: "og:description",
        content:
          "A fictional clinic website concept demo showing how a Hyderabad family clinic can present services and appointment options online. Created by Akshay Chandra.",
      },
    ],
  }),
  component: Index,
});

const PHONE = "91123456779";
const PHONE_DISPLAY = "+91 12345 67790";
const EMAIL = "adad@adf.in";
const WHATSAPP_DEMO = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  "Hi Akshay, I saw the clinic website concept demo",
)}`;

const baseInput =
  "mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/60";

function inputCls(hasError: boolean) {
  return `${baseInput} ${hasError ? "border-red-300" : "border-primary-foreground/25"}`;
}

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why It Works" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    title: "General Consultation",
    desc: "Everyday medical guidance for common health concerns — from fever and seasonal infections to routine advice. Each consultation is explained clearly and never feels rushed.",
  },
  {
    title: "Preventive Health Checkups",
    desc: "Screening and checkup packages designed to catch risks early, with simple explanations of what each test covers and what your results mean in plain language.",
  },
  {
    title: "Follow-up Care",
    desc: "Structured follow-up support to review your progress, adjust guidance as needed, and help you stay on track after your initial visit — without confusion or gaps.",
  },
];

const whyCards = [
  {
    title: "Clear Clinic Information",
    desc: "Essential details — services, timings, and what to expect — presented in one place so families are never left guessing before they visit.",
  },
  {
    title: "Easy Appointment Requests",
    desc: "A simple request flow and direct contact options, so reaching the clinic takes just a few minutes instead of repeated phone calls.",
  },
  {
    title: "Helpful Service Details",
    desc: "Each service is explained in everyday language, so you know what a consultation or checkup involves well before you walk in.",
  },
];

function Index() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name")
      .max(80, "Name is too long"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email")
      .max(120, "Email is too long"),
    message: z
      .string()
      .trim()
      .min(5, "Please enter a short message")
      .max(600, "Message is too long"),
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(
    e: FormEvent,
    channel: "whatsapp" | "email" = "whatsapp",
  ) {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as keyof typeof form;
        if (!fieldErrors[f]) fieldErrors[f] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    const { name, email, message } = parsed.data;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
      "",
      "Hi Akshay, I saw the clinic website concept demo",
    ].join("\n");
    const url =
      channel === "whatsapp"
        ? `https://wa.me/${PHONE}?text=${encodeURIComponent(body)}`
        : `mailto:${EMAIL}?subject=${encodeURIComponent(
            "Clinic website concept demo",
          )}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Concept demo banner */}
      <div className="w-full bg-accent/15 border-b border-accent/30">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs sm:text-sm font-medium text-accent-foreground/90">
          <span className="font-semibold">Concept demo</span> — fictional clinic
          website example.
        </p>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-lg font-bold"
            >
              आ
            </span>
            <span className="min-w-0 truncate">
              <span className="block text-sm font-semibold leading-tight text-foreground sm:text-base">
                Aarogyam Family Clinic
              </span>
              <span className="block text-[11px] leading-tight text-muted-foreground">
                Hyderabad · Concept demo
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Request an Appointment
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero-glow relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-12">
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full border border-accent/40 bg-teal-soft px-3 py-1 text-xs font-semibold text-accent">
                Family healthcare, made clear
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
                Clear clinic information and appointment requests, all in one
                place
              </h1>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                A clear, modern way for families in Hyderabad to explore clinic
                services and request an appointment in a few taps — no phone
                tag, no confusion.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Request an Appointment
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  View Services
                </a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                This is a concept demo of a fictional clinic. No real
                appointment is booked here.
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
                <img
                  src={heroImg}
                  alt="Calm teal and navy healthcare illustration"
                  width={1200}
                  height={1008}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Our Services
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Care that covers everyday family health needs
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three focused services presented clearly, so you always know
                what to expect before you request an appointment.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="card-soft p-7">
                  <div
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-accent font-display text-lg font-bold"
                  >
                    ✚
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 border-y border-border bg-navy-soft/40 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                About
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                A neighbourhood family clinic, reimagined online
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Aarogyam Family Clinic is a concept for a neighbourhood family
                clinic in Hyderabad — one built around clear communication,
                unhurried consultations, and making everyday healthcare easier
                to access online.
              </p>
              <p>
                Instead of searching for phone numbers or wondering what a
                service includes, families get a single calm place to read
                about care, understand what to expect, and request an
                appointment when it suits them.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Aarogyam Family Clinic is fictional. This page exists only to
                show clinic owners a modern website concept by Akshay Chandra.
              </p>
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section id="why" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Why This Works
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Built around clarity, access, and useful detail
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three things a modern clinic website should get right — and how
                this concept does it.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {whyCards.map((c) => (
                <div key={c.title} className="card-soft p-7">
                  <h3 className="text-lg font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 bg-primary py-16 text-primary-foreground sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Request an Appointment
            </h2>
            <p className="mt-4 text-base text-primary-foreground/85 sm:text-lg">
              In this concept demo, the “Request an Appointment” buttons lead
              here — where a real clinic would connect you to its booking flow.
              Because Aarogyam Family Clinic is fictional, no actual
              appointment is booked.
            </p>

            {/* Quick contact actions: phone, email, WhatsApp */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <a
                href={`tel:${PHONE}`}
                className="flex flex-col items-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 text-center transition-colors hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden className="text-xl">📞</span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-primary-foreground/70">
                  Call (demo)
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex flex-col items-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 text-center transition-colors hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden className="text-xl">✉️</span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-primary-foreground/70">
                  Email (demo)
                </span>
                <span className="mt-0.5 block break-all text-sm font-semibold">
                  {EMAIL}
                </span>
              </a>
              <a
                href={WHATSAPP_DEMO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 text-center transition-colors hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden className="text-xl">💬</span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-primary-foreground/70">
                  WhatsApp
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  Ask about this website demo
                </span>
              </a>
            </div>

            {/* Contact form */}
            <form
              onSubmit={(e) => handleSubmit(e, "whatsapp")}
              noValidate
              className="mt-8 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 text-left"
            >
              <h3 className="text-lg font-semibold">
                Send a message about this demo
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                This contact route is for the website demo itself, not the
                fictional clinic. Your message goes to Akshay Chandra via
                WhatsApp or email.
              </p>

              <div className="mt-5 grid gap-4">
                <div>
                  <label
                    htmlFor="cf-name"
                    className="block text-xs font-medium text-primary-foreground/80"
                  >
                    Name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className={inputCls(!!errors.name)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-200">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cf-email"
                    className="block text-xs font-medium text-primary-foreground/80"
                  >
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@adf.in"
                    className={inputCls(!!errors.email)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-200">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cf-message"
                    className="block text-xs font-medium text-primary-foreground/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="What would you like to ask?"
                    className={`${inputCls(!!errors.message)} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-200">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-md transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span aria-hidden>💬</span> Send via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "email")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/15 px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span aria-hidden>✉️</span> Send via Email
                </button>
              </div>
            </form>

            <p className="mt-4 text-xs text-primary-foreground/60">
              Demo placeholder contacts only — replace the number and email
              with real values before publishing. No appointment is booked and
              no message is stored on this site.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold"
                >
                  आ
                </span>
                <span className="font-semibold text-foreground">
                  Aarogyam Family Clinic
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                An honest note: this page is an example of how a clinic can
                present services and appointment options online. It is a
                concept demo and does not represent a real medical practice.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            Concept demo created by Akshay Chandra.
          </div>
        </div>
      </footer>
    </div>
  );
}
