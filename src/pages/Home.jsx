import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
   Sections:
     1. Hero
     2. Services / Benefits
     3. About
     4. Testimonials
   ───────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Mobile Home Visits",
    desc: "We come to you — at home, your workplace, or your gym. No need to travel when you're in pain.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: "Sports Injury Rehab",
    desc: "From acute sprains to complex tears — evidence-based rehabilitation to get you back in the game.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Back & Neck Pain",
    desc: "Effective treatment for acute and chronic back and neck pain — at home or post-surgery.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: "Post-Op Rehabilitation",
    desc: "Structured recovery programs following surgery, tailored to your procedure and goals.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Aged Care Rehab",
    desc: "Gentle, effective physiotherapy for older adults — improving mobility, balance, and independence.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Work Injury Management",
    desc: "Workplace injury assessment and rehabilitation with a focus on safe and early return to work.",
  },
];

const TESTIMONIALS = [
  {
    initials: "MD",
    name: "Mark Davy",
    ago: "1 year ago",
    quote: "I was having chronic knee pain and a specialist advised me to get my knees replaced. Seth suggested further treatment and exercises — and it worked! That was 15 years ago and I still have my original knees.",
  },
  {
    initials: "S",
    name: "Sarah",
    ago: "11 months ago",
    quote: "I'm grateful Seth made a home visit for my strained back. He alleviated the pain and inflammation and offered practical advice on exercise, diet, and simple pain relief.",
  },
  {
    initials: "OL",
    name: "Ori Luft",
    ago: "4 years ago",
    quote: "Seth is the best physio. He helped my back so much and fixed it in just a couple of days.",
  },
];

const TRUST_BADGES = [
  "No referral required",
  "We come to you",
  "7am – 7pm, 7 days",
  "Eastern Suburbs coverage",
];

export default function Home() {
  return (
    <main>
      {/* ─── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Copy */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Sydney's Eastern Suburbs</span>
                <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Mobile Physiotherapy</span>
              </div>
              <h1 className="text-white text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                Expert physio care,<br />delivered to your door.
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Whether you're recovering from injury, managing pain, or preparing to return to sport — Soar Solutions brings professional physiotherapy to you, 7 days a week.
              </p>

              {/* Trust signals — checklist style */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8 mt-8">
                {TRUST_BADGES.map(b => (
                  <div key={b} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 6 5 9 10 3"/>
                      </svg>
                    </span>
                    <span className="text-sm text-white/90 font-medium">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/booking" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0c8aa4] font-bold text-sm hover:bg-white/90 hover:shadow-lg transition-all no-underline shadow-md">
                  Request an appointment →
                </Link>
                <a href="tel:0410676862" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call us now
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <img
                src="/images/seth-assessment.jpg"
                alt="Seth Hirschowitz — physiotherapy treatment"
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. SERVICES / BENEFITS ───────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-2">What we treat</p>
            <h2 className="text-3xl font-extrabold text-[#1a2e3b] mb-3">Our Services</h2>
            <p className="text-[#4a6070] max-w-xl mx-auto">
              From acute injuries to chronic conditions — expert care delivered in the comfort of your own home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <Card key={s.title} className="hover:shadow-md transition-shadow border-gray-100 bg-[#f8fcfe]">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-[#1a2e3b] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#4a6070] leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] text-white font-bold text-base hover:opacity-90 hover:shadow-lg transition-all no-underline shadow-md"
            >
              Book a session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image — [PRACTITIONER_PHOTO] */}
            <div className="order-2 lg:order-1">
              <img
                src="/images/portrait.png"
                alt="Seth Hirschowitz — Principal Physiotherapist"
                className="w-full rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-2">About us</p>
              <h2 className="text-3xl font-extrabold text-[#1a2e3b] mb-4">
                {/* [PRACTITIONER_NAME] */}
                Meet your physiotherapist
              </h2>

              <Card className="bg-[#f0f9fc] border-[#c8e6ef] mb-5">
                <CardContent className="p-4 flex items-center gap-4">
                  {/* Avatar — [PRACTITIONER_INITIALS] */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    SH
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2e3b]">Seth Hirschowitz</p>
                    <p className="text-sm text-[#4a6070]">Principal Physiotherapist · 26+ years experience</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">Olympic rep. 2000</Badge>
                      <Badge variant="secondary" className="text-[10px]">Postgrad qualified</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-[#4a6070] leading-relaxed mb-4">
                With over 30 years of experience, Soar Solutions provides effective treatment for sports injuries, work injuries, arthritis, and back pain. Our principal practitioner represented the Australian Physiotherapy Association at the <strong className="text-[#1a2e3b]">2000 Olympic Games</strong> and has worked with professional teams across soccer, basketball, and cricket.
              </p>
              <p className="text-[#4a6070] leading-relaxed mb-6">
                Every patient is personally evaluated to receive a treatment plan tailored to their specific condition and goals. No referral required — just book and we'll come to you.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] text-white text-sm font-semibold hover:opacity-90 transition-opacity no-underline shadow-md"
                >
                  Book an appointment →
                </Link>
                <a
                  href="tel:0410676862"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0c8aa4] text-[#0c8aa4] text-sm font-semibold hover:bg-[#0c8aa4]/5 transition-colors no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  0410 676 862
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-2">Patient stories</p>
            <h2 className="text-3xl font-extrabold text-[#1a2e3b] mb-2">What our patients say</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-amber-400">★★★★★</span>
              <span className="font-bold text-[#1a2e3b]">5.0</span>
              <span className="text-[#4a6070] text-sm">· Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="relative flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                {/* Quote mark */}
                <span className="absolute top-5 right-6 text-5xl leading-none text-[#0c8aa4]/10 font-serif select-none">"</span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#1a2e3b] text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e3b]">{t.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-[#4a6070]">
                        <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" fill="#4285F4"/>
                      </svg>
                      <p className="text-xs text-[#4a6070]">Google Review · {t.ago}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 5. SERVICE AREA MAP ──────────────────────────────────────────── */}
      <section className="section bg-[#f0f6f9]">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-2">Where we work</p>
            <h2 className="text-3xl font-extrabold text-[#1a2e3b] mb-3">Our Service Area</h2>
            <p className="text-[#4a6070] max-w-lg mx-auto">
              We provide mobile home visits across Sydney's Eastern Suburbs, and clinic appointments at OptiSports Barangaroo in the CBD.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mobile service map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2e3b] text-sm">Mobile Home Visits</h3>
                    <p className="text-xs text-[#4a6070]">Vaucluse · Bondi · Paddington · CBD · Barangaroo</p>
                  </div>
                </div>
              </div>
              <div className="h-56 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85143.66765828362!2d151.16731213274267!3d-33.912357981621724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b18db5d79889%3A0xa061091923af585a!2sEastern%20Suburbs%2C%20NSW!5e0!3m2!1sen!2sau!4v1758167136079!5m2!1sen!2sau"
                  title="Eastern Suburbs service area"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="px-6 py-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c8aa4] hover:opacity-75 transition-opacity no-underline"
                >
                  Book a home visit →
                </Link>
              </div>
            </div>

            {/* Clinic map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2e3b] text-sm">OptiSports Barangaroo</h3>
                    <p className="text-xs text-[#4a6070]">Level 3, Suite 320 / 5 Lime St, Barangaroo NSW</p>
                  </div>
                </div>
              </div>
              <div className="h-56 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.9095548959167!2d151.1989898760984!3d-33.86622171892602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12afd3bafe0c03%3A0xcd908be399fb4efc!2sOptisports%20Physiotherapy%20Barangaroo!5e0!3m2!1sen!2sau!4v1758547210614!5m2!1sen!2sau"
                  title="OptiSports Barangaroo clinic"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="px-6 py-4">
                <a
                  href="https://book.nookal.com/bookings/book/e4a0299c-661f-4Af1-2671-4C40965c4DEf/location/GCMJF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c8aa4] hover:opacity-75 transition-opacity no-underline"
                >
                  Book at OptiSports →
                </a>
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] p-8 text-center text-white">
            <h3 className="text-2xl font-extrabold mb-2">Ready to feel better?</h3>
            <p className="text-white/80 mb-6">No referral needed. Same-week appointments available across Sydney's Eastern Suburbs.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/booking" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0c8aa4] font-bold text-sm hover:bg-white/90 hover:shadow-lg transition-all no-underline shadow-md">
                Request appointment →
              </Link>
              <a href="tel:0410676862" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call us now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
