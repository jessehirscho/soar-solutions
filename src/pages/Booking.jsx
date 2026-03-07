import React, { useState, useRef, useEffect } from "react";
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

// ── Suburbs within ~20 km of Dover Heights ──────────────────────
const SUBURBS = [
  // Eastern Suburbs
  "Dover Heights","Vaucluse","Watsons Bay","Rose Bay","North Bondi","Bondi","Bondi Beach",
  "Bondi Junction","Tamarama","Bronte","Bellevue Hill","Waverley","Clovelly","Randwick",
  "Coogee","Maroubra","Kingsford","Pagewood","Little Bay","Matraville","Eastgardens","South Coogee",
  // Inner East / Harbour
  "Double Bay","Edgecliff","Point Piper","Darling Point","Rushcutters Bay","Woollahra",
  "Paddington","Potts Point","Elizabeth Bay",
  // CBD & Inner City
  "Sydney","Surry Hills","Darlinghurst","Redfern","Chippendale","Ultimo","Pyrmont","Haymarket",
  // Inner West
  "Annandale","Camperdown","Newtown","Enmore","Marrickville","Dulwich Hill","Petersham",
  "Lewisham","Summer Hill","Ashfield","Leichhardt","Haberfield","Lilyfield","Rozelle",
  "Balmain","Birchgrove",
  // Southern / Airport
  "Mascot","Botany","Banksmeadow","Alexandria","Waterloo","Zetland","Rosebery",
  "Eastlakes","Kensington",
  // Lower North Shore
  "North Sydney","Neutral Bay","Cremorne","Mosman","Kirribilli","McMahons Point",
  "Crows Nest","Wollstonecraft","Waverton",
  // Northern Beaches (south)
  "Manly","Fairlight","Balgowlah","Balgowlah Heights","Seaforth",
  // Other within ~20 km
  "Hunters Hill","Drummoyne","Gladesville","Ryde","Strathfield","Concord",
  "Homebush","Sydney Olympic Park",
].sort().concat(["Other"]);

// ── Suburb autocomplete combobox ─────────────────────────────────
function SuburbCombobox({ value, onChange }) {
  const [query, setQuery]       = useState(value || "");
  const [open, setOpen]         = useState(false);
  const [focused, setFocused]   = useState(-1);
  const containerRef            = useRef(null);
  const listRef                 = useRef(null);

  const matches = query.length > 0
    ? SUBURBS.filter(s => s !== "Other" && s.toLowerCase().startsWith(query.toLowerCase())).slice(0, 7)
    : [];
  const filtered = matches.length > 0 ? [...matches, "Other"] : query.length > 0 ? ["Other"] : [];

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function select(suburb) {
    setQuery(suburb);
    onChange(suburb);
    setOpen(false);
    setFocused(-1);
  }

  function handleKeyDown(e) {
    if (!open || filtered.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === "Enter" && focused >= 0) { e.preventDefault(); select(filtered[focused]); }
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); setFocused(-1); }}
          onFocus={() => { if (query.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder="Start typing your suburb…"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); onChange(""); setOpen(false); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-56 overflow-y-auto"
        >
          {filtered.map((suburb, i) => (
            <li
              key={suburb}
              onMouseDown={() => select(suburb)}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                suburb === "Other"
                  ? `border-t border-gray-100 italic ${i === focused ? "bg-[#0c8aa4] text-white" : "text-[#4a6070] hover:bg-[#f0f9fc]"}`
                  : i === focused ? "bg-[#0c8aa4] text-white" : "text-[#1a2e3b] hover:bg-[#f0f9fc]"
              }`}
            >
              {suburb === "Other" ? "Other (not listed)" : suburb}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const SERVICES = [
  {
    id: "initial-assessment",
    name: "Initial Assessment",
    price: "$180",
    duration: "60 mins",
    description: "A full head-to-toe assessment of your injury or condition. Includes movement screening, diagnosis, and a personalised treatment plan.",
  },
  {
    id: "follow-up",
    name: "Follow-up Consultation",
    price: "$140",
    duration: "45 mins",
    description: "Hands-on treatment and exercise progression for existing patients. Includes manual therapy, load management review, and home program update.",
  },
  {
    id: "sports-injury",
    name: "Sports Injury Rehab",
    price: "$140",
    duration: "45 mins",
    description: "Targeted rehab for acute and chronic sports injuries — muscle strains, ligament sprains, stress fractures, and return-to-sport planning.",
  },
  {
    id: "back-neck",
    name: "Back & Neck Pain",
    price: "$140",
    duration: "45 mins",
    description: "Assessment and treatment of spinal pain, disc issues, postural problems, and nerve-related pain such as sciatica or cervicogenic headaches.",
  },
  {
    id: "post-op",
    name: "Post-op Rehabilitation",
    price: "$140",
    duration: "45 mins",
    description: "Structured recovery following surgery — ACL reconstruction, joint replacement, rotator cuff repair, and more. Progressive milestones from week 1.",
  },
  {
    id: "running-assessment",
    name: "Running Assessment",
    price: "$200",
    duration: "60 mins",
    description: "Video gait analysis, strength and mobility screening, and a personalised training plan to improve economy and reduce injury risk.",
  },
  {
    id: "aged-care",
    name: "Aged Care Rehab",
    price: "$140",
    duration: "45 mins",
    description: "Falls prevention, balance training, mobility and strength work for older adults — delivered at home at a comfortable pace.",
  },
  {
    id: "work-injury",
    name: "Work Injury",
    price: "$140",
    duration: "45 mins",
    description: "Assessment and treatment for workplace injuries. We liaise with WorkCover, return-to-work coordinators, and employers as needed.",
  },
  {
    id: "general",
    name: "General Physiotherapy",
    price: "$140",
    duration: "45 mins",
    description: "Not sure which service fits? Book a general appointment and we'll tailor the session to your needs.",
  },
];

// ── Service picker ────────────────────────────────────────────────
function ServicePicker({ value, onChange, error }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={`rounded-xl border overflow-hidden ${error ? "border-red-400" : "border-gray-200"}`}>
      {SERVICES.map((svc, i) => {
        const selected = value === svc.id;
        const open     = expanded === svc.id;
        return (
          <div key={svc.id} className={`${i > 0 ? "border-t border-gray-100" : ""}`}>
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-3.5 transition-colors ${selected ? "bg-[#f0f9fc]" : "bg-white hover:bg-gray-50"}`}>
              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-snug ${selected ? "text-[#0c8aa4]" : "text-[#1a2e3b]"}`}>
                  {svc.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5 sm:hidden">
                  <span className="text-xs font-bold text-[#1a2e3b] tabular-nums">{svc.price}</span>
                  <span className="text-xs text-[#4a6070]">{svc.duration}</span>
                </div>
              </div>

              {/* Meta — hidden on xs, shown sm+ */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-[#1a2e3b] tabular-nums">{svc.price}</span>
                <span className="text-xs text-[#4a6070] bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">{svc.duration}</span>
              </div>

              {/* Info + Select */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {/* More info toggle */}
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : svc.id)}
                  className="text-xs text-[#4a6070] hover:text-[#0c8aa4] flex items-center gap-0.5 transition-colors whitespace-nowrap"
                >
                  Info
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                {/* Select button */}
                <button
                  type="button"
                  onClick={() => onChange("service", selected ? "" : svc.id)}
                  className={`flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selected
                      ? "bg-[#0c8aa4] text-white shadow-sm"
                      : "bg-[#0c8aa4]/10 text-[#0c8aa4] hover:bg-[#0c8aa4] hover:text-white"
                  }`}
                >
                  {selected ? "✓" : "Select"}
                  {!selected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Expandable description */}
            {open && (
              <div className="px-4 pb-3.5 pt-0 bg-[#f8fcfd] border-t border-[#e0f2f7]">
                <p className="text-xs text-[#4a6070] leading-relaxed">{svc.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const TIME_PERIODS = [
  { value: "morning",   label: "Morning",   sub: "7am – 12pm",
    slots: ["7:00am","7:30am","8:00am","8:30am","9:00am","9:30am","10:00am","10:30am","11:00am","11:30am"] },
  { value: "afternoon", label: "Afternoon", sub: "12pm – 5pm",
    slots: ["12:00pm","12:30pm","1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","3:30pm","4:00pm","4:30pm"] },
  { value: "evening",   label: "Evening",   sub: "5pm – 7pm",
    slots: ["5:00pm","5:30pm","6:00pm","6:30pm"] },
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
    if (!data.phone.trim()) errors.phone = "Phone number is required.";
    else if (!/^[\d\s\+\-\(\)]{6,}$/.test(data.phone))
      errors.phone = "Please enter a valid phone number.";
    if (!data.suburb.trim()) errors.suburb = "Suburb is required.";
  }

  if (step === 1) {
    if (!data.service)       errors.service       = "Please select a service.";
    if (!data.timeSlot)      errors.timeSlot      = "Please choose a time of day.";
    else if (!data.preferredTime) errors.preferredTime = "Please choose a specific time slot.";
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
        <Field label="Phone" required error={errors.phone}>
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

      <Field label="Suburb" required error={errors.suburb}>
        <SuburbCombobox value={data.suburb} onChange={v => onChange("suburb", v)} />
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

      <Field label="Select a service" required error={errors.service}>
        <ServicePicker value={data.service} onChange={onChange} error={errors.service} />
      </Field>

      <Field label="Preferred date">
        <Input
          value={data.date}
          onChange={e => onChange("date", e.target.value)}
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
      </Field>

      {/* Step 1 of time: pick period */}
      <Field label="Preferred time of day" required error={errors.timeSlot}>
        <div className="grid grid-cols-3 gap-3">
          {TIME_PERIODS.map(period => (
            <button
              key={period.value}
              type="button"
              onClick={() => { onChange("timeSlot", period.value); onChange("preferredTime", ""); }}
              aria-pressed={data.timeSlot === period.value}
              className={`flex flex-col items-center gap-1 py-4 px-2 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer select-none ${
                data.timeSlot === period.value
                  ? "border-[#0c8aa4] bg-[#0c8aa4]/10 text-[#0c8aa4]"
                  : "border-gray-200 bg-gray-50 text-[#1a2e3b] hover:border-[#0c8aa4]/40"
              }`}
            >
              <span>{period.label}</span>
              <span className={`text-xs font-normal ${data.timeSlot === period.value ? "text-[#0c8aa4]" : "text-gray-400"}`}>
                {period.sub}
              </span>
            </button>
          ))}
        </div>
      </Field>

      {/* Step 2 of time: pick specific 30-min slot */}
      {data.timeSlot && (
        <Field label="Preferred start time" required error={errors.preferredTime}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_PERIODS.find(p => p.value === data.timeSlot)?.slots.map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => onChange("preferredTime", data.preferredTime === slot ? "" : slot)}
                aria-pressed={data.preferredTime === slot}
                className={`py-2.5 px-2 rounded-lg border-2 text-xs font-semibold transition-all cursor-pointer select-none text-center ${
                  data.preferredTime === slot
                    ? "border-[#0c8aa4] bg-[#0c8aa4] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#1a2e3b] hover:border-[#0c8aa4]/50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#4a6070] mt-1">We'll do our best to accommodate your preference.</p>
        </Field>
      )}
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
        <select
          value={data.referral}
          onChange={e => onChange("referral", e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-[#1a2e3b]"
        >
          <option value="" disabled>Select an option…</option>
          {["Google search","Google Maps","Friend or family","Social media","Doctor referral","Other"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
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
    { label: "Service",      value: data.service ? (SERVICES.find(s => s.id === data.service)?.name ?? data.service) : "—", step: 1 },
    { label: "Preferred date", value: data.date || "Flexible", step: 1 },
    { label: "Time of day",    value: data.timeSlot ? TIME_PERIODS.find(p => p.value === data.timeSlot)?.label ?? "—" : "—", step: 1 },
    { label: "Preferred slot", value: data.preferredTime || "—", step: 1 },
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
const EMPTY = { name: "", email: "", phone: "", suburb: "", service: "", date: "", timeSlot: "", preferredTime: "", details: "", referral: "" };

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

  async function handleSubmit() {
    setStatus("submitting");

    const { error } = await supabase.from("bookings").insert({
      name:           data.name,
      email:          data.email,
      phone:          data.phone     || null,
      suburb:         data.suburb    || null,
      service:        data.service ? (SERVICES.find(s => s.id === data.service)?.name ?? data.service) : null,
      preferred_date: data.date      || null,
      preferred_time: data.timeSlot ? `${data.timeSlot}${data.preferredTime ? ` – ${data.preferredTime}` : ""}` : null,
      details:        data.details   || null,
      referral:       data.referral  || null,
    });

    if (error) console.error("Supabase insert error:", error);
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
        <div className="max-w-2xl mx-auto sm:mt-[-48px] relative z-10">

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
            <Card className="border-t-4 border-t-[#0c8aa4] overflow-hidden">
              <CardContent className="pt-6 pb-6">

                {/* Step indicator + progress */}
                <div className="mb-8">
                  <StepIndicator current={step} />
                  <Progress value={progress} className="mt-3" />
                </div>

                {/* Step content */}
                <form noValidate>
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
                      <button type="button" onClick={handleSubmit} disabled={status === "submitting"} className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] text-white font-bold text-sm hover:opacity-90 hover:shadow-md transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
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
