import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";

/* ─────────────────────────────────────────────────────────────────
   BOOKING PAGE — multi-step form
   Steps: 1 Contact  2 Appointment  3 Condition  4 Review
   ───────────────────────────────────────────────────────────────── */

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
  { label: "Morning",   sub: "7am – 12pm",  value: "morning"   },
  { label: "Afternoon", sub: "12pm – 5pm",  value: "afternoon" },
  { label: "Evening",   sub: "5pm – 7pm",   value: "evening"   },
];

const STEPS = ["Contact", "Appointment", "Condition", "Review"];

// ── Validation ──────────────────────────────────────────────────────────────
function validateStep(step, data) {
  const errors = {};

  if (step === 0) {
    if (!data.name.trim())  errors.name  = "Full name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email.";
    if (data.phone && !/^[\d\s\+\-\(\)]{6,}$/.test(data.phone))
      errors.phone = "Please enter a valid phone number.";
  }

  if (step === 1) {
    if (!data.service)  errors.service  = "Please select a service.";
    if (!data.timeSlot) errors.timeSlot = "Please choose a preferred time.";
  }

  return errors;
}

// ── Step indicator ──────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-between mb-2">
      {STEPS.map((label, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                done   ? "bg-[#0c8aa4] text-white" :
                active ? "bg-[#0c8aa4] text-white ring-4 ring-[#0c8aa4]/20" :
                         "bg-gray-100 text-gray-400"
              }`}>
                {done ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] font-semibold hidden sm:block ${active || done ? "text-[#0c8aa4]" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-500 ${done ? "bg-[#0c8aa4]" : "bg-gray-100"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Field wrapper ───────────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-[#1a2e3b]">
        {label} {required && <span className="text-[#0c8aa4]">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Step 1: Contact details ─────────────────────────────────────────────────
function StepContact({ data, onChange, errors }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[#1a2e3b]">Let's start with your details</h2>
        <p className="text-sm text-[#4a6070] mt-1">We'll use this to confirm your booking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" required error={errors.name}>
          <Input
            value={data.name}
            onChange={e => onChange("name", e.target.value)}
            placeholder="Jane Smith"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <Input
            value={data.phone}
            onChange={e => onChange("phone", e.target.value)}
            type="tel"
            inputMode="tel"
            placeholder="0410 676 862"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
        </Field>
      </div>

      <Field label="Email address" required error={errors.email}>
        <Input
          value={data.email}
          onChange={e => onChange("email", e.target.value)}
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
        />
      </Field>

      <Field label="Suburb">
        <Input
          value={data.suburb}
          onChange={e => onChange("suburb", e.target.value)}
          placeholder="e.g. Bondi, Coogee"
        />
      </Field>
    </div>
  );
}

// ── Step 2: Appointment preferences ────────────────────────────────────────
function StepAppointment({ data, onChange, errors }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[#1a2e3b]">When works for you?</h2>
        <p className="text-sm text-[#4a6070] mt-1">Pick your preferred service, date, and time.</p>
      </div>

      <Field label="Service" required error={errors.service}>
        <Select value={data.service} onValueChange={v => onChange("service", v)}>
          <SelectTrigger aria-invalid={!!errors.service}>
            <SelectValue placeholder="Select a service…" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Preferred date">
        <Input
          value={data.date}
          onChange={e => onChange("date", e.target.value)}
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
      </Field>

      <Field label="Preferred time of day" required error={errors.timeSlot}>
        <div className="grid grid-cols-3 gap-3">
          {TIME_SLOTS.map(slot => (
            <button
              key={slot.value}
              type="button"
              onClick={() => onChange("timeSlot", data.timeSlot === slot.value ? "" : slot.value)}
              aria-pressed={data.timeSlot === slot.value}
              className={`flex flex-col items-center gap-1 py-4 px-2 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer select-none ${
                data.timeSlot === slot.value
                  ? "border-[#0c8aa4] bg-[#0c8aa4]/10 text-[#0c8aa4]"
                  : "border-gray-200 bg-gray-50 text-[#1a2e3b] hover:border-[#0c8aa4]/40"
              }`}
            >
              <span>{slot.label}</span>
              <span className={`text-xs font-normal ${data.timeSlot === slot.value ? "text-[#0c8aa4]" : "text-gray-400"}`}>
                {slot.sub}
              </span>
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

// ── Step 3: Condition description ───────────────────────────────────────────
const MAX_CHARS = 500;

function StepCondition({ data, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[#1a2e3b]">Tell us about your condition</h2>
        <p className="text-sm text-[#4a6070] mt-1">The more context you give, the better we can prepare.</p>
      </div>

      <Field label="Describe your issue or goal">
        <Textarea
          value={data.details}
          onChange={e => onChange("details", e.target.value)}
          placeholder="e.g. I've had lower back pain for 3 weeks after lifting at the gym. It's worse in the morning and eases during the day…"
          rows={6}
          maxLength={MAX_CHARS}
        />
        <p className={`text-xs text-right mt-1 ${data.details.length >= MAX_CHARS * 0.9 ? "text-amber-500 font-semibold" : "text-[#4a6070]"}`}>
          {data.details.length}/{MAX_CHARS}
        </p>
      </Field>

      {/* Optional: how did you hear about us */}
      <Field label="How did you hear about us?">
        <Select value={data.referral} onValueChange={v => onChange("referral", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option…" />
          </SelectTrigger>
          <SelectContent>
            {["Google search","Google Maps","Friend or family","Social media","Doctor referral","Other"].map(o => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

// ── Step 4: Review ──────────────────────────────────────────────────────────
function StepReview({ data, onEdit }) {
  const rows = [
    { label: "Name",         value: data.name,     step: 0 },
    { label: "Email",        value: data.email,    step: 0 },
    { label: "Phone",        value: data.phone || "—", step: 0 },
    { label: "Suburb",       value: data.suburb || "—", step: 0 },
    { label: "Service",      value: data.service,  step: 1 },
    { label: "Preferred date", value: data.date || "Flexible", step: 1 },
    { label: "Time of day",  value: data.timeSlot ? TIME_SLOTS.find(t => t.value === data.timeSlot)?.label : "—", step: 1 },
    { label: "Details",      value: data.details || "—", step: 2 },
    { label: "Referral",     value: data.referral || "—", step: 2 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[#1a2e3b]">Review your booking</h2>
        <p className="text-sm text-[#4a6070] mt-1">Everything look right? Hit submit when you're ready.</p>
      </div>

      <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {rows.map(({ label, value, step }) => (
          <div key={label} className="flex items-start justify-between px-4 py-3 hover:bg-gray-50 transition-colors group">
            <div className="flex flex-col gap-0.5 flex-1 min-w-0 pr-4">
              <p className="text-xs font-semibold text-[#4a6070] uppercase tracking-wide">{label}</p>
              <p className="text-sm text-[#1a2e3b] break-words">{value}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(step)}
              className="text-xs text-[#0c8aa4] opacity-0 group-hover:opacity-100 transition-opacity font-medium flex-shrink-0 mt-1 hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" className="mt-0.5 accent-[#0c8aa4] w-4 h-4 flex-shrink-0" required />
        <span className="text-sm text-[#4a6070] leading-relaxed">
          I agree to be contacted about my enquiry and understand that this is a booking request, not a confirmed appointment.
        </span>
      </label>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
const EMPTY = { name: "", email: "", phone: "", suburb: "", service: "", date: "", timeSlot: "", details: "", referral: "" };

export default function Booking() {
  const [step,   setStep]   = useState(0);
  const [data,   setData]   = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(field, value) {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleNext() {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep(s => s - 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const { error } = await supabase.from("bookings").insert({
      name:           data.name,
      email:          data.email,
      phone:          data.phone     || null,
      suburb:         data.suburb    || null,
      service:        data.service   || null,
      preferred_date: data.date      || null,
      preferred_time: data.timeSlot  || null,
      details:        data.details   || null,
      referral:       data.referral  || null,
    });

    setStatus(error ? "error" : "success");
  }

  const progress = ((step) / (STEPS.length - 1)) * 100;

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Get started</p>
          <h1>Request a Booking</h1>
          <p className="mt-2">Home visits across Sydney's Eastern Suburbs — <strong className="text-white">7am–7pm, 7 days</strong>.</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-2xl mx-auto mt-[-48px] relative z-10">

          {status === "success" ? (
            /* ── Success screen ── */
            <Card>
              <CardContent className="flex flex-col items-center text-center py-16 gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] text-white text-3xl grid place-items-center shadow-lg">✓</div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1a2e3b] mb-1">Booking request sent!</h2>
                  <p className="text-[#4a6070]">Thanks, <strong>{data.name.split(" ")[0]}</strong>. We'll confirm your appointment shortly.</p>
                </div>
                <div className="bg-[#f0f9fc] rounded-xl p-4 text-sm text-[#4a6070] max-w-sm">
                  Keep an eye on <strong>{data.email}</strong> — we'll be in touch soon.
                </div>
                <a href="tel:0410676862" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0c8aa4] text-[#0c8aa4] font-semibold text-sm hover:bg-[#0c8aa4]/5 transition-colors no-underline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Or call us on 0410 676 862
                </a>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <div className="h-1 bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] rounded-t-xl" />
              <CardContent className="pt-6 pb-6">

                {/* Step indicator + progress */}
                <div className="mb-8">
                  <StepIndicator current={step} />
                  <Progress value={progress} className="mt-3" />
                </div>

                {/* Step content */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="min-h-[300px]">
                    {step === 0 && <StepContact     data={data} onChange={handleChange} errors={errors} />}
                    {step === 1 && <StepAppointment data={data} onChange={handleChange} errors={errors} />}
                    {step === 2 && <StepCondition   data={data} onChange={handleChange} />}
                    {step === 3 && <StepReview      data={data} onEdit={s => { setStep(s); setErrors({}); }} />}
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
                      Something went wrong. Please try again or call <a href="tel:0410676862" className="underline">0410 676 862</a>.
                    </p>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                    {step > 0 ? (
                      <button type="button" onClick={handleBack} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-gray-200 text-[#4a6070] font-semibold text-sm hover:border-[#0c8aa4] hover:text-[#0c8aa4] transition-colors">
                        ← Back
                      </button>
                    ) : <div />}

                    {step < STEPS.length - 1 ? (
                      <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] text-white font-bold text-sm hover:opacity-90 hover:shadow-md transition-all shadow-sm">
                        Continue →
                      </button>
                    ) : (
                      <button type="submit" disabled={status === "submitting"} className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] text-white font-bold text-sm hover:opacity-90 hover:shadow-md transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
                        {status === "submitting" ? "Submitting…" : "Submit booking →"}
                      </button>
                    )}
                  </div>
                </form>

              </CardContent>
            </Card>
          )}

          {/* Reassurance strip */}
          {status !== "success" && (
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-5 text-xs text-[#4a6070]">
              {["No referral required", "We respond within a few hours", "7am – 7pm, 7 days"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0c8aa4] inline-block" />
                  {t}
                </span>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
