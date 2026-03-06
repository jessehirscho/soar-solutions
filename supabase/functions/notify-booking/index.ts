// Edge Function: notify-booking
// Triggered by a Supabase database webhook on INSERT to the bookings table.
// Sends an email notification to the practice owner via Resend.

import "@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL   = "jesse8477@gmail.com";
const FROM_EMAIL     = "Soar Solutions <onboarding@resend.dev>";

Deno.serve(async (req) => {
  // Supabase database webhooks POST a JSON payload with { type, table, record, old_record }
  const payload = await req.json();
  const booking = payload.record;

  if (!booking) {
    return new Response("No record in payload", { status: 400 });
  }

  const date     = booking.preferred_date || "Flexible";
  const time     = booking.preferred_time
    ? booking.preferred_time.charAt(0).toUpperCase() + booking.preferred_time.slice(1)
    : "Not specified";
  const service  = booking.service  || "Not specified";
  const suburb   = booking.suburb   || "Not specified";
  const phone    = booking.phone    || "Not provided";
  const details  = booking.details  || "None";
  const referral = booking.referral || "Not specified";

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a2e3b;">
      <div style="background: linear-gradient(135deg, #0c8aa4, #38bcd4); padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Booking Request</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">
          Submitted ${new Date(booking.created_at).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}
        </p>
      </div>

      <div style="border: 1px solid #e2eef2; border-top: none; border-radius: 0 0 12px 12px; padding: 28px 32px;">

        <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #0c8aa4; margin: 0 0 12px;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #4a6070; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${booking.name}</td></tr>
          <tr><td style="padding: 6px 0; color: #4a6070;">Email</td><td style="padding: 6px 0;"><a href="mailto:${booking.email}" style="color: #0c8aa4;">${booking.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #4a6070;">Phone</td><td style="padding: 6px 0;">${phone}</td></tr>
          <tr><td style="padding: 6px 0; color: #4a6070;">Suburb</td><td style="padding: 6px 0;">${suburb}</td></tr>
        </table>

        <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #0c8aa4; margin: 0 0 12px;">Appointment Preferences</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #4a6070; width: 140px;">Service</td><td style="padding: 6px 0; font-weight: 600;">${service}</td></tr>
          <tr><td style="padding: 6px 0; color: #4a6070;">Preferred date</td><td style="padding: 6px 0;">${date}</td></tr>
          <tr><td style="padding: 6px 0; color: #4a6070;">Time of day</td><td style="padding: 6px 0;">${time}</td></tr>
        </table>

        <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #0c8aa4; margin: 0 0 12px;">Condition / Notes</h2>
        <p style="font-size: 14px; background: #f0f9fc; border-left: 3px solid #0c8aa4; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 0 0 24px; line-height: 1.6;">${details}</p>

        <p style="font-size: 13px; color: #4a6070; margin: 0 0 20px;">Referral source: ${referral}</p>

        <div style="display: flex; gap: 12px;">
          <a href="mailto:${booking.email}" style="background: #0c8aa4; color: white; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;">
            Reply to ${booking.name.split(" ")[0]}
          </a>
          <a href="tel:${phone.replace(/\s/g, '')}" style="border: 1px solid #0c8aa4; color: #0c8aa4; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;">
            Call ${phone}
          </a>
        </div>
      </div>

      <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 16px;">
        Soar Solutions Physiotherapy · Booking ID: ${booking.id}
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    FROM_EMAIL,
      to:      [NOTIFY_EMAIL],
      subject: `New booking request from ${booking.name} — ${service}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response(`Resend error: ${err}`, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
