import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ── [LOGO_HERE] Replace the text logo with an <img> tag when assets are ready ── */

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/booking", label: "Booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo / Brand — [LOGO_HERE] */}
        <Link to="/" onClick={close} className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0c8aa4] to-[#38bcd4] flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="font-extrabold text-[#1a2e3b] text-sm leading-tight">
            Soar Solutions<br />
            <span className="font-normal text-[#0c8aa4] text-xs tracking-wide">Physiotherapy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? "bg-[#0c8aa4]/10 text-[#0c8aa4]"
                    : "text-[#1a2e3b] hover:bg-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Button asChild size="sm" className="ml-4">
            <Link to="/booking">Book now</Link>
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span className={`block w-5 h-0.5 bg-[#1a2e3b] transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a2e3b] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a2e3b] transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${open ? "max-h-64" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={close}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors ${
                  isActive ? "bg-[#0c8aa4]/10 text-[#0c8aa4]" : "text-[#1a2e3b] hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Button asChild size="sm" className="mt-2 w-full">
            <Link to="/booking" onClick={close}>Book now</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
