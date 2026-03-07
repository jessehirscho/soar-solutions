import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ─────────────────────────────────────────────────────────────
   BLOG PAGE
   To add a post: push an object to the POSTS array below.
   Fields: id, title, date, tag, excerpt, readTime
   ───────────────────────────────────────────────────────────── */

const POSTS = [
  {
    id: "benefits-of-physiotherapy",
    title: "5 Benefits of Physiotherapy for Athletes",
    date: "August 10, 2025",
    tag: "Performance",
    readTime: "4 min read",
    excerpt: "Physiotherapy is more than injury rehabilitation — discover how it improves performance, prevents future injuries, and speeds recovery between training sessions.",
  },
  {
    id: "lower-back-pain-quick-guide",
    title: "Lower Back Pain: A Quick Guide to Relief",
    date: "August 6, 2025",
    tag: "Back & Neck",
    readTime: "5 min read",
    excerpt: "Most back pain settles with the right mix of movement, load management and reassurance. Here's exactly what to do in the first week after onset.",
  },
  {
    id: "acl-rehab-timeline",
    title: "ACL Rehab Timeline: What to Expect Month by Month",
    date: "July 28, 2025",
    tag: "Rehab",
    readTime: "7 min read",
    excerpt: "From swelling control to hop tests and return-to-sport benchmarks — a clear timeline you can follow and discuss with your physiotherapist.",
  },
  {
    id: "shoulder-impingement-exercises",
    title: "3 Exercises for Shoulder Impingement (That Actually Help)",
    date: "July 18, 2025",
    tag: "Shoulder",
    readTime: "4 min read",
    excerpt: "Sore top-of-shoulder? Try this combination of scapular control, rotator cuff loading, and thoracic mobility work for lasting relief.",
  },
  {
    id: "tendinopathy-load-management",
    title: "Tendinopathy: Load Management 101",
    date: "July 8, 2025",
    tag: "Tendons",
    readTime: "5 min read",
    excerpt: "Painful tendon? The sweet spot is neither full rest nor overload. Learn how to dose your activity correctly and progress safely back to full function.",
  },
  {
    id: "desk-posture-reset",
    title: "Desk Posture Reset (5-Minute Routine)",
    date: "June 30, 2025",
    tag: "Prevention",
    readTime: "3 min read",
    excerpt: "Tight neck and upper back from sitting all day? Here's a short, repeatable sequence to break up prolonged sitting and keep you comfortable.",
  },
  {
    id: "ankle-sprain-to-running",
    title: "From Ankle Sprain to Running Again",
    date: "June 20, 2025",
    tag: "Rehab",
    readTime: "6 min read",
    excerpt: "A clear step-by-step progression from weight-bearing to plyometrics — and the functional tests you should pass before your first run back.",
  },
  {
    id: "sciatica-vs-hamstring",
    title: "Is It Sciatica or a Hamstring Strain?",
    date: "June 12, 2025",
    tag: "Diagnosis",
    readTime: "4 min read",
    excerpt: "Both conditions cause back-of-thigh pain, but they behave very differently. Here's how to tell the difference and what helps each.",
  },
  {
    id: "heat-vs-ice",
    title: "Heat vs. Ice: Which Should You Use?",
    date: "June 3, 2025",
    tag: "Recovery",
    readTime: "3 min read",
    excerpt: "Acute swelling? Go cool. Stiff, irritable muscles? Try heat. A practical decision tree you can use today to manage your pain at home.",
  },
];

// Unique tags derived from posts
const ALL_TAGS = ["All", ...Array.from(new Set(POSTS.map(p => p.tag)))];

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? POSTS : POSTS.filter(p => p.tag === activeTag);

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Resources</p>
          <h1>Physio Tips &amp; Insights</h1>
          <p className="mt-2">Evidence-based advice on injury recovery, rehabilitation, and performance.</p>
        </div>
      </section>

      {/* ─── Post grid ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeTag === tag
                    ? "bg-[#0c8aa4] text-white border-[#0c8aa4]"
                    : "bg-white text-[#4a6070] border-gray-200 hover:border-[#0c8aa4] hover:text-[#0c8aa4]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group no-underline flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Colour banner — cycles through teal shades */}
                <div className={`h-1.5 w-full ${
                  i % 3 === 0 ? "bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4]" :
                  i % 3 === 1 ? "bg-gradient-to-r from-[#38bcd4] to-[#0fa3c1]" :
                                "bg-gradient-to-r from-[#0fa3c1] to-[#0c8aa4]"
                }`} />

                <div className="flex flex-col flex-1 p-6">
                  {/* Tag + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0c8aa4] bg-[#0c8aa4]/8 px-2.5 py-1 rounded-full">
                      {post.tag}
                    </span>
                    <span className="text-xs text-[#4a6070] flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[15px] font-bold leading-snug text-[#1a2e3b] mb-3 group-hover:text-[#0c8aa4] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-[#4a6070] leading-relaxed flex-1 mb-5">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-[#4a6070]">{post.date}</span>
                    <span className="text-xs font-semibold text-[#0c8aa4] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#4a6070] py-16">No posts found for this category.</p>
          )}

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-extrabold mb-2">Have a question?</h3>
            <p className="text-white/80 text-sm mb-5">Our physiotherapist is happy to answer any questions about your injury or condition.</p>
            <Link to="/booking" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0c8aa4] font-bold text-sm hover:bg-white/90 hover:shadow-lg transition-all no-underline shadow-md">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
