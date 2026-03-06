import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#1a2e3b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <p className="font-extrabold text-white text-base mb-1">Soar Solutions Physiotherapy</p>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            Expert mobile physiotherapy across Sydney's Eastern Suburbs.<br />No referral required.
          </p>
          <a href="tel:[PHONE_NUMBER]" className="text-[#38bcd4] font-bold text-lg hover:opacity-80 transition-opacity no-underline">
            {/* [PHONE_NUMBER] */}
            0410 000 000
          </a>
          <p className="text-white/50 text-xs mt-1">Available 7am – 7pm, 7 days</p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Navigation</p>
          <ul className="flex flex-col gap-2">
            {[["Home", "/"], ["Blog", "/blog"], ["Booking", "/booking"]].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 hover:text-white transition-colors text-sm no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Hours</p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <React.Fragment key={d}>
                <dt className="text-white/60">{d}</dt>
                <dd className="text-white/90">7am – 7pm</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Soar Solutions Physiotherapy. All rights reserved.</p>
        <p>Eastern Suburbs, Sydney NSW</p>
      </div>
    </footer>
  );
}
