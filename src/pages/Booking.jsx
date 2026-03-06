import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────────────────────
   BOOKING / CONTACT PAGE
   Form submits to: [FORM_ENDPOINT] — replace the action attribute
   with your preferred service (e.g. airform.io, Formspree, etc.)
   ───────────────────────────────────────────────────────────── */

const SERVICES = [
  "Sports injury rehab",
  "Back / neck pain",
  "Post-op rehabilitation",
  "Work injury",
  "Aged care rehab",
  "Running assessment",
  "General physiotherapy",
  "Other",
];

const TIME_SLOTS = [
  { label: "Morning", sub: "7am – 12pm", value: "morning" },
  { label: "Afternoon", sub: "12pm – 5pm", value: "afternoon" },
  { label: "Evening", sub: "5pm – 7pm", value: "evening" },
];

const TRUST_POINTS = [
  "No referral required",
  "We come to you",
  "Eastern Suburbs coverage",
  "Same-week appointments",
  "7am – 7pm, 7 days",
];

const MAX_CHARS = 400;

// ── Client-side validation ────────────────────────────────────────────────────
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Full name is required.";
  if (!fields.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Please enter a valid email.";
  if (fields.phone && !/^[\d\s\+\-\(\)]{6,}$/.test(fields.phone)) errors.phone = "Please enter a valid phone number.";
  if (!fields.consent) errors.consent = "Please tick the consent box to continue.";
  return errors;
}

export default function Booking() {
  const [service, setService] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);

    // Client-side validation
    const fields = {
      name: fd.get("name") || "",
      email: fd.get("email") || "",
      phone: fd.get("phone") || "",
      consent: fd.get("consent"),
    };
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    fd.set("service", service);
    fd.set("preferred_time", timeSlot);
    setStatus("submitting");

    try {
      /* [FORM_ENDPOINT] — replace the URL below with your form handler */
      const res = await fetch("https://airform.io/[YOUR_EMAIL_HERE]", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Get started</p>
          <h1>Request a Booking</h1>
          <p className="mt-2">Home visits across Sydney's Eastern Suburbs — <strong className="text-white">7am–7pm, 7 days</strong>.</p>
        </div>
      </section>

      {/* ─── Form + Sidebar ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-[-48px] relative z-10">

            {/* ── Form card ───────────────────────────────────────────────── */}
            <Card>
              <div className="h-1 bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] rounded-t-xl" />

              {status === "success" ? (
                /* Success state */
                <CardContent className="flex flex-col items-center text-center py-16 gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white text-3xl grid place-items-center shadow-lg mb-2">✓</div>
                  <h2 className="text-2xl font-bold text-[#1a2e3b]">Request received!</h2>
                  <p className="text-[#4a6070]">Thanks for reaching out. We'll confirm your appointment shortly.</p>
                  <Button variant="outline" asChild className="mt-2">
                    <a href="tel:[PHONE_NUMBER]">
                      {/* [PHONE_NUMBER] */}
                      Call 0410 000 000
                    </a>
                  </Button>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="text-[#1a2e3b]">Tell us a few details</CardTitle>
                    <p className="text-sm text-muted-foreground">We'll confirm your time within a few hours.</p>
                  </CardHeader>

                  <CardContent>
                    <form
                      className="flex flex-col gap-6"
                      /* [FORM_ENDPOINT] — replace action URL */
                      action="https://airform.io/[YOUR_EMAIL_HERE]"
                      method="POST"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      {/* Honeypot spam trap */}
                      <input type="text" name="_gotcha" className="hidden" aria-hidden="true" />
                      <input type="hidden" name="_source" value="booking-page" />

                      {/* ── Contact details ─────────────────────────────── */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-3">Contact details</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name">Full name <span className="text-[#0c8aa4]">*</span></Label>
                            <Input id="name" name="name" autoComplete="name" placeholder="Jane Smith" aria-invalid={!!errors.name} />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" type="tel" inputMode="tel" placeholder="0410 000 000" aria-invalid={!!errors.phone} />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email">Email <span className="text-[#0c8aa4]">*</span></Label>
                            <Input id="email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" aria-invalid={!!errors.email} />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="suburb">Suburb</Label>
                            <Input id="suburb" name="suburb" placeholder="e.g. Bondi, Coogee" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* ── Appointment preferences ─────────────────────── */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-3">Appointment preferences</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="date">Preferred date</Label>
                            <Input id="date" name="preferred_date" type="date" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label>Service / area</Label>
                            <Select value={service} onValueChange={setService}>
                              <SelectTrigger><SelectValue placeholder="Select a service…" /></SelectTrigger>
                              <SelectContent>
                                {SERVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Time-of-day pill selector */}
                        <div className="flex flex-col gap-1.5">
                          <Label>Preferred time of day</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {TIME_SLOTS.map(slot => (
                              <button
                                key={slot.value}
                                type="button"
                                onClick={() => setTimeSlot(prev => prev === slot.value ? "" : slot.value)}
                                aria-pressed={timeSlot === slot.value}
                                className={`flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                                  timeSlot === slot.value
                                    ? "border-[#0c8aa4] bg-[#0c8aa4]/10 text-[#0c8aa4]"
                                    : "border-gray-200 bg-gray-50 text-[#1a2e3b] hover:border-[#0c8aa4]/50"
                                }`}
                              >
                                <span>{slot.label}</span>
                                <span className={`text-xs font-normal ${timeSlot === slot.value ? "text-[#0c8aa4]" : "text-gray-400"}`}>{slot.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* ── About your condition ─────────────────────────── */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-3">About your condition</p>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="details">Briefly describe your issue</Label>
                          <Textarea
                            id="details"
                            name="details"
                            rows={4}
                            placeholder="Tell us what's going on and how we can help."
                            maxLength={MAX_CHARS}
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                          />
                          <p className={`text-xs text-right ${details.length >= MAX_CHARS * 0.9 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}>
                            {details.length}/{MAX_CHARS}
                          </p>
                        </div>
                      </div>

                      {/* Consent */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          value="yes"
                          className="mt-0.5 accent-[#0c8aa4] w-4 h-4 flex-shrink-0"
                        />
                        <Label htmlFor="consent" className="font-normal text-sm text-muted-foreground cursor-pointer leading-relaxed">
                          I agree to be contacted about my enquiry.
                        </Label>
                      </div>
                      {errors.consent && <p className="text-xs text-red-500 -mt-4">{errors.consent}</p>}

                      {/* Error message */}
                      {status === "error" && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
                          Something went wrong. Please try again or call{" "}
                          <a href="tel:[PHONE_NUMBER]" className="underline">0410 000 000</a>.
                        </p>
                      )}

                      <div className="flex flex-col gap-2 pt-1">
                        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                          {status === "submitting" ? "Sending…" : "Request appointment →"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">No referral required · We respond quickly</p>
                      </div>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>

            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">

              {/* Phone CTA */}
              <Card className="bg-gradient-to-br from-[#0c8aa4] to-[#0fa3c1] text-white border-0">
                <CardContent className="p-6 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Prefer to call?</p>
                  {/* [PHONE_NUMBER] */}
                  <a href="tel:[PHONE_NUMBER]" className="block text-2xl font-extrabold text-white hover:opacity-85 transition-opacity no-underline">
                    0410 000 000
                  </a>
                  <p className="text-xs text-white/70 mt-1">Available 7am – 7pm, 7 days</p>
                </CardContent>
              </Card>

              {/* Trust points */}
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-3">Why Soar?</p>
                  <ul className="flex flex-col gap-2">
                    {TRUST_POINTS.map(tp => (
                      <li key={tp} className="flex items-center gap-2 text-sm text-[#1a2e3b]">
                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white text-xs grid place-items-center flex-shrink-0">✓</span>
                        {tp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Service area */}
              <Card className="bg-[#f0f9fc] border-dashed border-[#c8e6ef]">
                <CardContent className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0c8aa4] mb-2">Service area</p>
                  <p className="text-xs text-[#4a6070] leading-relaxed">
                    Bondi · Coogee · Randwick · Maroubra · Bronte · Clovelly · Kingsford and surrounds
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
