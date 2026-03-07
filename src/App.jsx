import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Booking from "@/pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* pt-16 offsets fixed navbar height */}
      <div className="pt-20 min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/booking" element={<Booking />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-32 text-center px-6">
                <p className="text-6xl font-extrabold text-[#0c8aa4] mb-4">404</p>
                <p className="text-xl font-bold text-[#1a2e3b] mb-2">Page not found</p>
                <p className="text-[#4a6070] mb-6">Sorry, we couldn't find what you were looking for.</p>
                <a href="/" className="text-[#0c8aa4] underline">Go home →</a>
              </div>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
