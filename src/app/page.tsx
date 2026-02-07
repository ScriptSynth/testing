"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  Menu,
  X,
  FileText,
  Send,
  Twitter,
  Linkedin,
  Github,
  Star,
} from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";
import { AnimatedTerminal } from "@/components/animated-terminal";

/* ───────────────────────────── Animations ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────────────────────────── JSON-LD ───────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Syros",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI-powered meeting notes software that automatically detects action items and syncs them to project management tools like Trello, ClickUp, and Asana.",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
        { "@type": "Offer", price: "10", priceCurrency: "USD", name: "Pro" },
        { "@type": "Offer", price: "25", priceCurrency: "USD", name: "Team" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "127",
      },
    },
    {
      "@type": "Organization",
      name: "Syros",
      url: "https://syros.tech",
      logo: "https://syros.tech/logo.svg",
      sameAs: [
        "https://twitter.com/syros",
        "https://linkedin.com/company/syros",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Syros's AI detection work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Syros uses advanced natural language processing to analyze your meeting notes in real-time. It identifies action items, deadlines, and assignees by understanding context, action verbs, and follow-up language patterns.",
          },
        },
        {
          "@type": "Question",
          name: "Which project management tools does Syros support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Syros integrates with Trello, ClickUp, Asana, Monday.com, Jira, Notion, and Linear. We're constantly adding new integrations based on user feedback.",
          },
        },
        {
          "@type": "Question",
          name: "Is my meeting data secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. Your data is processed in SOC 2 Type II compliant infrastructure and never shared with third parties. You can delete your data at any time.",
          },
        },
        {
          "@type": "Question",
          name: "Can I try Syros for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Our Free tier includes 5 meeting syncs per month with one integration. It's a great way to experience the core product before upgrading.",
          },
        },
      ],
    },
  ],
};

/* ───────────────────────────── Page ───────────────────────────── */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen overflow-x-hidden gradient-bg">
        {/* ─────────── NAVBAR ─────────── */}
        <nav className="sticky top-0 z-50 glass border-b border-border/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-2" aria-label="Syros Home">
              <img src="/icon.svg" alt="Syros" width={32} height={32} className="h-8 w-8 rounded-lg" />
              <span className="text-lg font-bold text-foreground">Syros</span>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Pricing
              </a>
              <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                FAQ
              </a>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Join Waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border/50 bg-white px-6 py-4 md:hidden"
            >
              <div className="flex flex-col gap-4">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground">Features</a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground">How It Works</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground">Pricing</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground">FAQ</a>
                <a
                  href="#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Join Waitlist
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </nav>

        {/* ─────────── HERO ─────────── */}
        <section className="relative px-6 pt-20 pb-24 md:pt-32 md:pb-36">
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200/40 via-violet-200/30 to-transparent blur-3xl" />
            <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-purple-200/30 to-transparent blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              {/* Badge */}
              <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Star className="h-3.5 w-3.5 fill-primary" />
                <span>Now accepting early access signups</span>
              </motion.div>

              {/* H1 – Primary keyword in headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-display-xl text-balance"
              >
                Turn Meeting Notes Into{" "}
                <span className="gradient-text">Action Items</span>{" "}
                Automatically
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                The meeting productivity tool that uses AI to detect tasks from
                your notes and syncs them to Trello, ClickUp, Asana &amp; more —
                so nothing slips through the cracks.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Join Waitlist — It&apos;s Free
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-secondary hover:-translate-y-0.5"
                >
                  See How It Works
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.p variants={fadeUp} custom={4} className="mt-8 text-sm text-muted-foreground">
                Join <strong className="text-foreground">500+</strong> teams already on the waitlist
              </motion.p>
            </motion.div>

            {/* Hero visual — Animated Terminal showing the full process */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative mx-auto mt-16 max-w-3xl"
            >
              <AnimatedTerminal />
              {/* Glow effect */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 blur-2xl" />
            </motion.div>
          </div>
        </section>

        {/* ─────────── SOCIAL PROOF BAR ─────────── */}
        <section className="border-y border-border/50 bg-white/50 py-10">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
              Trusted by teams at innovative companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                { name: "Vercel", logo: "/logos/vercel.svg" },
                { name: "Stripe", logo: "/logos/stripe.svg" },
                { name: "Notion", logo: "/logos/notion.svg" },
                { name: "Linear", logo: "/logos/linear.svg" },
                { name: "Figma", logo: "/logos/figma.svg" },
              ].map((company) => (
                <div key={company.name} className="flex items-center gap-2">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-md"
                    loading="lazy"
                  />
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── PROBLEM SECTION ─────────── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-heading text-balance"
              >
                Meetings create action items.{" "}
                <span className="text-muted-foreground">Action items get forgotten.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Sound familiar? You&apos;re not alone. 73% of action items from meetings are never completed.
                Syros fixes that.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-14 grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  icon: FileText,
                  title: "Notes scatter everywhere",
                  description:
                    "Meeting notes end up in docs, sticky notes, and random Slack messages. Tasks vanish into the void.",
                },
                {
                  icon: RefreshCw,
                  title: "Manual copy-paste is broken",
                  description:
                    "Transferring action items to your project management tool takes forever — and most people just skip it.",
                },
                {
                  icon: BarChart3,
                  title: "Teams lose accountability",
                  description:
                    "Without a system, nobody knows who's responsible for what. Deadlines slip. Projects stall.",
                },
              ].map((pain, i) => (
                <motion.div
                  key={pain.title}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-2xl border border-border/80 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <pain.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{pain.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pain.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────── FEATURES ─────────── */}
        <section id="features" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-primary">
                Features
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-heading">
                Your meeting notes, supercharged
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Syros is the action item tracker that turns every meeting into measurable progress.
              </motion.p>
            </motion.div>

            {/* Feature rows — alternating layout */}
            <div className="mt-20 space-y-24">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Action Item Detection",
                  description:
                    "Our AI analyzes your meeting notes in real-time, identifying tasks, deadlines, and assignees with 95%+ accuracy. No more manually extracting action items — just write your notes naturally and let Syros do the rest.",
                  points: [
                    "Natural language understanding",
                    "Deadline & assignee detection",
                    "Works in any note format",
                  ],
                  reverse: false,
                },
                {
                  icon: RefreshCw,
                  title: "One-Click Sync to Your PM Tools",
                  description:
                    "Detected action items are automatically synced to Trello, ClickUp, Asana, and more. Choose your board, list, or project — Syros handles the rest. No more copy-pasting between apps.",
                  points: [
                    "10+ integrations supported",
                    "Custom field mapping",
                    "Two-way sync updates",
                  ],
                  reverse: true,
                },
                {
                  icon: CheckCircle2,
                  title: "Never Forget a Task Again",
                  description:
                    "Every action item is tracked, assigned, and followed up on. Get smart reminders before deadlines, and see a dashboard of all outstanding tasks across every meeting. Total accountability, zero effort.",
                  points: [
                    "Smart deadline reminders",
                    "Progress tracking dashboard",
                    "Team accountability reports",
                  ],
                  reverse: false,
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className={`flex flex-col items-center gap-12 md:flex-row ${feature.reverse ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Text */}
                  <div className="flex-1 space-y-4">
                    <motion.div variants={fadeUp} custom={0}>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                    </motion.div>
                    <motion.h3 variants={fadeUp} custom={1} className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </motion.h3>
                    <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </motion.p>
                    <motion.ul variants={fadeUp} custom={3} className="space-y-2 pt-2">
                      {feature.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {point}
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                  {/* Visual */}
                  <motion.div variants={fadeUp} custom={i + 1} className="flex-1">
                    <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-secondary/80 to-white p-8 shadow-lg">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="h-4 w-32 rounded bg-border/60" />
                        </div>
                        <div className="space-y-2 pt-3">
                          <div className="h-3 w-full rounded bg-border/40" />
                          <div className="h-3 w-4/5 rounded bg-border/40" />
                          <div className="h-3 w-3/5 rounded bg-border/40" />
                          <div className="h-8 w-32 rounded-lg bg-primary/10 mt-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── HOW IT WORKS ─────────── */}
        <section id="how-it-works" className="relative bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-primary">
                How It Works
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-heading">
                Three steps. Zero effort.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                From meeting notes to completed tasks in minutes — not hours.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative mt-16 grid gap-8 md:grid-cols-3"
            >
              {/* Connector line (desktop) */}
              <div className="pointer-events-none absolute top-16 left-[16.67%] right-[16.67%] hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block" aria-hidden="true" />

              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Take Meeting Notes",
                  description:
                    "Write your notes however you like — bullet points, paragraphs, or stream of consciousness. Syros works with any format.",
                },
                {
                  step: "02",
                  icon: Brain,
                  title: "AI Detects Action Items",
                  description:
                    "Our AI instantly identifies tasks, deadlines, and who's responsible. Review and confirm with a single click.",
                },
                {
                  step: "03",
                  icon: Send,
                  title: "Sync to Your PM Tool",
                  description:
                    "Action items flow directly into Trello, ClickUp, Asana, or your tool of choice. Tasks assigned, deadlines set.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  custom={i}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                    Step {step.step}
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────── INTEGRATIONS ─────────── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-primary">
                Integrations
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-heading">
                Works with the tools you already use
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Connect your meeting notes software to your favorite project management tools in one click.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {[
                { name: "Trello", logo: "/logos/trello.svg", color: "#0052CC" },
                { name: "ClickUp", logo: "/logos/clickup.svg", color: "#7B68EE" },
                { name: "Asana", logo: "/logos/asana.svg", color: "#F06A6A" },
                { name: "Monday.com", logo: "/logos/monday.svg", color: "#FF3D57" },
              ].map((integration, i) => (
                <motion.div
                  key={integration.name}
                  variants={fadeUp}
                  custom={i}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border/80 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${integration.color}15` }}
                  >
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{integration.name}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground"
            >
              <span>Coming soon:</span>
              <div className="flex items-center gap-2">
                <img src="/logos/jira.svg" alt="Jira" width={20} height={20} className="h-5 w-5 rounded" loading="lazy" />
                <span>Jira</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <img src="/logos/notion.svg" alt="Notion" width={20} height={20} className="h-5 w-5 rounded" loading="lazy" />
                <span>Notion</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <img src="/logos/linear.svg" alt="Linear" width={20} height={20} className="h-5 w-5 rounded" loading="lazy" />
                <span>Linear</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─────────── PRICING ─────────── */}
        <section id="pricing" className="bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-primary">
                Pricing
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-heading">
                Simple, transparent pricing
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Start free, upgrade as your team grows. No surprises.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-14 grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  name: "Free",
                  price: "$0",
                  period: "forever",
                  description: "Perfect for trying Syros",
                  features: [
                    "5 meeting syncs / month",
                    "1 integration",
                    "Basic AI detection",
                    "Email support",
                  ],
                  cta: "Join Waitlist",
                  popular: false,
                },
                {
                  name: "Pro",
                  price: "$10",
                  period: "/month",
                  description: "For professionals who run lots of meetings",
                  features: [
                    "Unlimited meeting syncs",
                    "All integrations",
                    "Advanced AI detection",
                    "Priority support",
                    "Custom field mapping",
                    "Smart reminders",
                  ],
                  cta: "Join Waitlist",
                  popular: true,
                },
                {
                  name: "Team",
                  price: "$25",
                  period: "/month",
                  description: "For teams that need collaboration",
                  features: [
                    "Everything in Pro",
                    "Up to 20 team members",
                    "Team dashboard",
                    "Accountability reports",
                    "Admin controls",
                    "SSO & SAML",
                    "Dedicated support",
                  ],
                  cta: "Join Waitlist",
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  custom={i}
                  className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-lg ${
                    plan.popular
                      ? "border-primary bg-white shadow-xl shadow-primary/10 scale-[1.02]"
                      : "border-border/80 bg-white hover:border-primary/20 hover:shadow-primary/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.popular ? "text-primary" : "text-green-500"}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      plan.popular
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                        : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────── FAQ ─────────── */}
        <section id="faq" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-primary">
                FAQ
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-heading">
                Frequently asked questions
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-12 space-y-3"
            >
              {[
                {
                  q: "How does the AI detection work?",
                  a: "Syros uses advanced natural language processing to analyze your meeting notes. It identifies action verbs, task-related phrases, deadline mentions, and name references to extract action items with 95%+ accuracy. You can review and confirm before syncing.",
                },
                {
                  q: "Which project management tools do you support?",
                  a: "We support Trello, ClickUp, Asana, Monday.com, and Jira at launch, with Notion, Linear, and Basecamp coming soon. Our API also allows custom integrations with any tool.",
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. Your notes are processed in SOC 2 Type II compliant infrastructure, never stored longer than necessary, and never shared with third parties. You can delete your data at any time.",
                },
                {
                  q: "Can I try it for free?",
                  a: "Yes! Our Free tier includes 5 meeting syncs per month with one integration — no credit card required. It's a great way to experience the core product before upgrading to Pro or Team.",
                },
                {
                  q: "How accurate is the action item detection?",
                  a: "Our AI achieves 95%+ accuracy on structured notes and 90%+ on free-form notes. You always get a chance to review and edit detected items before they're synced, so you're always in control.",
                },
                {
                  q: "Does it work with meeting transcripts?",
                  a: "Yes! Syros works with manual notes, meeting transcripts from Zoom, Google Meet, and Teams, and even audio recordings (coming soon). Paste in any text and our AI will extract the action items.",
                },
                {
                  q: "What happens when I reach my monthly sync limit?",
                  a: "On the Free plan, you'll get a friendly notification when approaching your limit. You can upgrade to Pro for unlimited syncs at any time. Your existing synced items remain active regardless.",
                },
                {
                  q: "Can I use Syros with my whole team?",
                  a: "Absolutely. Our Team plan supports up to 20 members with shared dashboards, accountability reports, and admin controls. For larger teams, contact us for Enterprise pricing.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className="rounded-xl border border-border/80 bg-white transition-all hover:border-primary/20"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-200 ${
                      openFaq === i ? "max-h-96 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────── FINAL CTA / WAITLIST ─────────── */}
        <section
          id="waitlist"
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-20 md:py-28"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight text-white sm:text-heading"
              >
                Ready to never forget an action item again?
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-lg text-lg text-indigo-100">
                Join 500+ teams on the waitlist and be the first to know when we launch.
                Early supporters get lifetime discounts.
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="mt-8 flex justify-center">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                  <WaitlistForm source="cta-bottom" />
                </div>
              </motion.div>
              <motion.p variants={fadeUp} custom={3} className="mt-6 text-xs text-indigo-200">
                No spam. Unsubscribe anytime. We respect your privacy.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─────────── FOOTER ─────────── */}
        <footer className="border-t border-border/50 bg-white px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex items-center gap-2">
                <img src="/icon.svg" alt="Syros" width={32} height={32} className="h-8 w-8 rounded-lg" />
                <span className="text-lg font-bold text-foreground">Syros</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <a href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</a>
                <a href="/terms" className="transition-colors hover:text-foreground">Terms of Service</a>
                <a href="mailto:hello@syros.tech" className="transition-colors hover:text-foreground">Contact</a>
              </div>

              <div className="flex items-center gap-4">
                <a href="https://twitter.com/syros" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground transition-colors hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/company/syros" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/syros" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-foreground">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Syros. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
