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
              {/* [TAGLINE] — swap or remove */}
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">
                Sydney's Eastern Suburbs · Mobile Physiotherapy
              </p>
              <h1 className="text-white text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                Expert physio care,<br />delivered to your door.
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Whether you're recovering from injury, managing pain, or preparing to return to sport — Soar Solutions brings professional physiotherapy to you, 7 days a week.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {TRUST_BADGES.map(b => (
                  <span key={b} className="text-xs font-semibold text-white/90 bg-white/15 border border-white/25 rounded-full px-3 py-1">
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-[#0c8aa4] hover:bg-white/90 font-bold shadow-lg">
                  <Link to="/booking">Request an appointment →</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent">
                  <a href="tel:[PHONE_NUMBER]">Call us now</a>
                </Button>
              </div>
            </div>

            {/* Hero image — [HERO_IMAGE] */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <div className="aspect-[4/3] rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
                {/* Replace <div> with <img src="[HERO_IMAGE_PATH]" alt="..." className="w-full h-full object-cover" /> */}
                <div className="text-center text-white/50 text-sm px-8">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 opacity-50">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  [HERO_IMAGE]
                </div>
              </div>
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

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/booking">Book a session →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image — [PRACTITIONER_PHOTO] */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#cde9f0] to-[#e8f6fb] flex items-center justify-center overflow-hidden">
                {/* Replace with: <img src="[PRACTITIONER_PHOTO_PATH]" alt="[PRACTITIONER_NAME]" className="w-full h-full object-cover" /> */}
                <div className="text-center text-[#0c8aa4]/40 text-sm px-8">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  [PRACTITIONER_PHOTO]
                </div>
              </div>
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
                <Button asChild>
                  <Link to="/booking">Book an appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="tel:[PHONE_NUMBER]">Call us</a>
                </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <Card key={t.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <p className="text-amber-400 text-sm mb-3">★★★★★</p>
                  <p className="text-[#4a6070] text-sm italic leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1a2e3b]">{t.name}</p>
                      <p className="text-xs text-[#4a6070]">Google Review · {t.ago}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] p-8 text-center text-white">
            <h3 className="text-2xl font-extrabold mb-2">Ready to feel better?</h3>
            <p className="text-white/80 mb-6">No referral needed. Same-week appointments available across Sydney's Eastern Suburbs.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-[#0c8aa4] hover:bg-white/90 font-bold">
                <Link to="/booking">Request appointment →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent">
                <a href="tel:[PHONE_NUMBER]">Call us now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
